using System.Net;
using FluentResults;
using VtuberTwitchFinder.Server.Controllers.DTClasses;
using VtuberTwitchFinder.Server.Controllers.DTClasses.APIResponses;

namespace VtuberTwitchFinder.Server.Services.SevenTvService;

public class SevenTvService : ISevenTvService
{
    private const string _BASE_URL = "https://api.7tv.app/v2";

    private readonly HttpClient _client;
    private readonly ILogger<ISevenTvService> _logger;

    public SevenTvService(IServiceProvider serviceProvider, HttpClient client)
    {
        _client = client;
        _logger = serviceProvider.GetRequiredService<ILogger<SevenTvService>>();
    }

    /// <inheritdoc />
    public async Task<Result<IEnumerable<DTEmote>>> GetChannelEmotes(int broadcasterId)
    {
        try
        {
            //Add a small delay to rate limit requests
            await Task.Delay(100);


            //Generate request and send it
            var message = new HttpRequestMessage(HttpMethod.Get,
                $"{_BASE_URL}/users/{broadcasterId}/emotes");
            HttpResponseMessage messageResponse = await _client.SendAsync(message);

            //If the broadcaster does not have a 7TV account, we want to still return an Ok result
            if (messageResponse.StatusCode != HttpStatusCode.OK) return Result.Ok();

            //Deserialize data
            var responseContent = await messageResponse.Content.ReadFromJsonAsync<DTSevenTvResponse[]>();
            if (responseContent == null) return Result.Fail("Failed to deserialize 7TV Response");

            return Result.Ok(responseContent.Select(emote => new DTEmote
            {
                Id = emote.id,
                Name = emote.name,
                Url = emote.urls.Last().Last()
            }));

            //return Result.Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Exception in {service}.{method}", nameof(SevenTvService), nameof(GetChannelEmotes));
            return Result.Fail(e.Message);
        }
    }
}
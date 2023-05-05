using FluentResults;
using VtuberTwitchFinder.Server.Controllers.DTClasses;

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

            var checkForAccount
                = await _client.GetFromJsonAsync<DTSevenTvResponse[]>(
                    $"{_BASE_URL}/users/{broadcasterId}");

            if (checkForAccount)
            {
                
            }
            var response
                = await _client.GetFromJsonAsync<DTSevenTvResponse[]>(
                    $"{_BASE_URL}/users/{broadcasterId}/emotes");
            if (response == null) return Result.Fail("Failed to deserialize 7Tv Response");

            return Result.Ok(response.Select(emote => new DTEmote
            {
                Id = emote.id,
                Name = emote.name,
                Url = emote.urls.Last().Last()
            }));
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Exception in {service}.{method}", nameof(SevenTvService), nameof(GetChannelEmotes));
            return Result.Fail(e.Message);
        }
    }
}
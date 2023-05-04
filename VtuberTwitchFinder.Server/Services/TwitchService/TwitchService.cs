using System.Net.Http.Headers;
using FluentResults;
using Microsoft.Extensions.Options;
using TwitchLib.Api;
using VtuberTwitchFinder.Server.Configuration;
using VtuberTwitchFinder.Server.Controllers.DTClasses;

namespace VtuberTwitchFinder.Server.Services.TwitchService;

public class TwitchService : ITwitchService
{
    private static TwitchAPI _api;
    private readonly HttpClient _client;
    private readonly TwitchApiSettings _configuration;
    private readonly ILogger<ITwitchService> _logger;

    public TwitchService(IServiceProvider serviceProvider, IOptions<TwitchApiSettings> configuration, HttpClient client)
    {
        _client = client;
        _logger = serviceProvider.GetRequiredService<ILogger<TwitchService>>();
        _configuration = configuration.Value;
        _api = new TwitchAPI();
        _api.Settings.ClientId = _configuration.ClientId;
        _api.Settings.Secret = _configuration.ClientSecret;
    }

    /// <inheritdoc />
    public async Task<Result<IEnumerable<DTVTuber>>> GetLiveVTubersAsync()
    {
        try
        {
            var twitchStreams = new List<DTTwitchStream>();
            var cursor = string.Empty;
            string accessToken = await _api.Auth.GetAccessTokenAsync();
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            _client.DefaultRequestHeaders.Add("Client-Id", _configuration.ClientId);
            for (var i = 0; i < 3; i++)
            {
                await Task.Delay(100);
                var response
                    = await _client.GetFromJsonAsync<DTTwitchResponse<DTTwitchStream[]>>(
                        $"https://api.twitch.tv/helix/streams?type=live&first=100&after={cursor}");
                if (response == null) return Result.Fail("Failed to deserialize TwitchResponse");
                twitchStreams.AddRange(response.Data);
                cursor = response.Pagination.Cursor;
            }

            return Result.Ok(twitchStreams.Where(s => s.tags.Contains("VTuber", StringComparer.OrdinalIgnoreCase)).Select(stream => new DTVTuber
            {
                TwitchId = stream.user_id,
                CurrentGameName = stream.game_name,
                CurrentThumbnailUrl = stream.thumbnail_url.Replace("{width}", "100").Replace("{height}", "100"),
                CurrentViewerCount = stream.viewer_count,
                StreamTitle = stream.title,
                TwitchName = stream.user_name
            }));
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Exception in {service}.{method}", nameof(TwitchService), nameof(GetLiveVTubersAsync));
            return Result.Fail(e.Message);
        }
    }
}
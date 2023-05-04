using FluentResults;
using Microsoft.Extensions.Options;
using TwitchLib.Api;
using TwitchLib.Api.Helix.Models.Streams.GetStreams;
using VtuberTwitchFinder.Server.Configuration;
using VtuberTwitchFinder.Server.Controllers.DTClasses;

namespace VtuberTwitchFinder.Server.Services.TwitchService;

public class TwitchService : ITwitchService
{
    private static TwitchAPI _api;
    private readonly TwitchApiSettings _configuration;
    private readonly ILogger<ITwitchService> _logger;

    public TwitchService(IServiceProvider serviceProvider, IOptions<TwitchApiSettings> configuration)
    {
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
            GetStreamsResponse value = await _api.Helix.Streams.GetStreamsAsync(null, 100);

            return Result.Ok(value.Streams.Select(stream => new DTVTuber
            {
                TwitchId = stream.Id,
                CurrentGameName = stream.GameName,
                CurrentThumbnailUrl = stream.ThumbnailUrl,
                CurrentViewerCount = stream.ViewerCount,
                StreamTitle = stream.Title,
                TwitchName = stream.UserName
            }));
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Exception in {service}.{method}", nameof(TwitchService), nameof(GetLiveVTubersAsync));
            return Result.Fail(e.Message);
        }
    }
}
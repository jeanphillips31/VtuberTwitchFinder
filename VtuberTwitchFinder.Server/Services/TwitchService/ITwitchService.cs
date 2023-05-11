using FluentResults;
using VtuberTwitchFinder.Server.Controllers.DTClasses;

namespace VtuberTwitchFinder.Server.Services.TwitchService;

public interface ITwitchService
{
    /// <summary>
    ///     Gets a list of up to 300 top current live Vtubers
    /// </summary>
    public Task<Result<DTStreamData>> GetLiveVTubersAsync(string? cursor);

    /// <summary>
    ///     Gets a list of emotes for a specific channel
    /// </summary>
    public Task<Result<DTStreamerEmotes>> GetChannelEmotes(int broadcasterId);
    
    /// <summary>
    ///     Gets top 3 clips for a specific channel
    /// </summary>
    public Task<Result<IEnumerable<DTTwitchClip>>> GetChannelClips(int broadcasterId);
}
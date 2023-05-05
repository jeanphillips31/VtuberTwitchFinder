using FluentResults;
using VtuberTwitchFinder.Server.Controllers.DTClasses;

namespace VtuberTwitchFinder.Server.Services.SevenTvService;

public interface ISevenTvService
{
    /// <summary>
    ///     Gets a list of 7TV emotes for a specific channel
    /// </summary>
    public Task<Result<IEnumerable<DTEmote>>> GetChannelEmotes(int broadcasterId);
}
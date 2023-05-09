using FluentResults.Extensions.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using VtuberTwitchFinder.Server.Controllers.DTClasses;
using VtuberTwitchFinder.Server.Services.TwitchService;

namespace VtuberTwitchFinder.Server.Controller;

[Route("api/[controller]")]
[ApiController]
public class TwitchController
{
    [HttpGet("vtubers")]
    public async Task<ActionResult<DTStreamData>> GetLiveVTubersAsync([FromQuery] string? cursor, ITwitchService twitchService)
    {
        var result = await twitchService.GetLiveVTubersAsync(cursor);

        return result.ToActionResult();
    }

    [HttpGet("emotes")]
    public async Task<ActionResult<DTStreamerEmotes>> GetTwitchEmotes([FromQuery] int broadcasterId, ITwitchService twitchService)
    {
        var result = await twitchService.GetChannelEmotes(broadcasterId);

        return result.ToActionResult();
    }
}
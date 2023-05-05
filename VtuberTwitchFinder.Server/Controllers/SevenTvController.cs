using FluentResults.Extensions.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using VtuberTwitchFinder.Server.Controllers.DTClasses;
using VtuberTwitchFinder.Server.Services.SevenTvService;

namespace VtuberTwitchFinder.Server.Controller;

[Route("api/[controller]")]
[ApiController]
public class SevenTvController
{
    [HttpGet("emotes")]
    public async Task<ActionResult<IEnumerable<DTEmote>>> GetSevenTvEmotes([FromQuery] int broadcasterId, ISevenTvService sevenTvService)
    {
        var result = await sevenTvService.GetChannelEmotes(broadcasterId);

        return result.ToActionResult();
    }
}
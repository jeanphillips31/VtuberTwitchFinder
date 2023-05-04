using FluentResults.Extensions.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using VtuberTwitchFinder.Server.Services.TwitchService;

namespace VtuberTwitchFinder.Server.Controller;

[Route("api/[controller]")]
[ApiController]
public class TwitchController
{
    [HttpGet("vtubers")]
    public async Task<IActionResult> GetLiveVTubersAsync(ITwitchService twitchService)
    {
        var result = await twitchService.GetLiveVTubersAsync();

        return result.ToActionResult();
    }
}
namespace VtuberTwitchFinder.Server.Controllers.DTClasses;

public class DTSubscriptionEmotes
{
    public IEnumerable<DTEmote> Tier1Emotes { get; set; }
    public IEnumerable<DTEmote> Tier2Emotes { get; set; }
    public IEnumerable<DTEmote> Tier3Emotes { get; set; }
}
namespace VtuberTwitchFinder.Server.Controllers.DTClasses;

public class DTStreamerEmotes
{
    public IEnumerable<DTEmote> FollowerEmotes { get; set; }
    public DTSubscriptionEmotes SubscriptionEmotes { get; set; }
    public IEnumerable<DTEmote> BitsEmotes { get; set; }
}
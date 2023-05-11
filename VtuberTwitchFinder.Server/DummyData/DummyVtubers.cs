using VtuberTwitchFinder.Server.Controllers.DTClasses;

namespace VtuberTwitchFinder.Server.DummyData;

public static class DummyVtubers
{
    private static int _cursorVal = 0;
    public static DTStreamData GetDummyVtubers(string cursor)
    {
        _cursorVal = int.Parse(cursor);
        var data = new DTStreamData();
        var vtubers = new List<DTVTuber>();
        var rand = new Random();
        for (var i = 0; i < rand.Next(4, 15); i++)
        {
            vtubers.Add(GenerateVTuber());
        }

        data.VTubers = vtubers;
        data.Cursor = _cursorVal.ToString();
        return data;
    }

    private static DTVTuber GenerateVTuber()
    {
        var rand = new Random();
        var data = new DTVTuber()
        {
            CurrentGameName = $"Game{_cursorVal}",
            CurrentViewerCount = rand.Next(20, 80000),
            StreamTitle = $"Title{_cursorVal}",
            TwitchId = rand.Next(20, 80000).ToString(),
            TwitchName = $"Name{_cursorVal}",
            TwitchUsername = $"User{_cursorVal}"
        };

        var randomVal = rand.Next(0, 5);
        if (randomVal > 1)
        {
            data.Language = "日本語";
        }
        else
        {
            data.Language = "English";
        }

        _cursorVal++;

        return data;
    }
}
namespace VtuberTwitchFinder.Server.Controllers.DTClasses;

public class DTTwitchResponse<T> where T : class
{
    public T Data { get; set; }
    public DTTwitchPagination Pagination { get; set; }
}

public class DTTwitchPagination
{
    public string Cursor { get; set; }
}
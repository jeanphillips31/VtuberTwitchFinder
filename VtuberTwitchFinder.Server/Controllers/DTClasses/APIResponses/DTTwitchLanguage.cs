﻿namespace VtuberTwitchFinder.Server.Controllers.DTClasses.APIResponses;

public static class DTTwitchLanguage
{
    public static Dictionary<string, string> Languages = new()
    {
        { "en", "English" },
        { "zh", "中文" },
        { "ja", "日本語" },
        { "ko", "한국어" },
        { "es", "Español" },
        { "fr", "Français" },
        { "de", "Deutsch" },
        { "it", "Italiano" },
        { "pt", "Português" },
        { "sv", "Svenska" },
        { "no", "Norsk" },
        { "da", "Dansk" },
        { "nl", "Nederlands" },
        { "fi", "Suomi" },
        { "pl", "Polski" },
        { "el", "Ελληνικά" },
        { "ru", "Русский" },
        { "tr", "Türkçe" },
        { "cs", "Čeština" },
        { "sk", "Slovenčina" },
        { "hu", "Magyar" },
        { "ar", "العربية" },
        { "bg", "Български" },
        { "th", "ภาษาไทย" },
        { "vi", "Tiếng Việt" },
        { "asl", "American Sign Language" },
        { "other", "Other" }
    };
}
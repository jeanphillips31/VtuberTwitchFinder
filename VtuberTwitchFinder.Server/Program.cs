using Microsoft.OpenApi.Models;
using VtuberTwitchFinder.Server.Configuration;
using VtuberTwitchFinder.Server.Services.SevenTvService;
using VtuberTwitchFinder.Server.Services.TwitchService;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1",
        new OpenApiInfo
        {
            Version = "v1",
            Title = "VTuberTwitchFinder.Server - WebApi"
        });
});

#region Services

//Add Services
builder.Services.AddScoped<ITwitchService, TwitchService>();
builder.Services.AddScoped<ISevenTvService, SevenTvService>();

#endregion

builder.Services.Configure<TwitchApiSettings>(builder.Configuration);
builder.Services.AddHttpClient();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000",
                "https://localhost:3000",
                "http://localhost",
                "https://localhost",
                "https://vtuber-twitch-finder.vercel.app",
                "http://vtuber-twitch-finder.vercel.app")
            .AllowCredentials();
    });
});

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
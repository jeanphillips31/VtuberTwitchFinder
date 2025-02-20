using Microsoft.OpenApi.Models;
using VtuberTwitchFinder.Server.Configuration;
using VtuberTwitchFinder.Server.Services.SevenTvService;
using VtuberTwitchFinder.Server.Services.TwitchService;

var builder = WebApplication.CreateBuilder(args);

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
builder.Services.AddHostedService<TwitchCacheRefresher>();
builder.Services.AddSingleton<ITwitchService, TwitchService>();
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
            .WithOrigins(
                "https://vtubers.app")
            .AllowCredentials();
    });
});
builder.Services.AddMemoryCache();

var app = builder.Build();

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
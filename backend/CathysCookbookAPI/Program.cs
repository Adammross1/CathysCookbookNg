using CathysCookbookAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<CookbookContext>(options =>
    options.UseSqlite(builder.Configuration["ConnectionStrings:CookbookConnection"])
);

builder.Services.AddScoped<ICookbookRepository, EFCookbookRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(p => p.WithOrigins("http://localhost:4200", "https://postman.com"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

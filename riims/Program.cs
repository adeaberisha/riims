using Microsoft.EntityFrameworkCore;
using riims.Data;
using riims.Mappings;
using riims.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy.
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.AddDbContext<RiimsDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("RiimsConnectionString")));

builder.Services.AddScoped<IEksperiencaRepository, SQLEksperiencaRepository>();
builder.Services.AddScoped<IHonorsAndAwardsRepository, SQLHonorsAndAwardsRepository>();
builder.Services.AddScoped<ILicensatRepository, SQLLicensatRepository>();
builder.Services.AddScoped<IProjektiRepository, SQLProjektiRepository>();
builder.Services.AddScoped<IEdukimiRepository, SQLEdukimiRepository>();
builder.Services.AddScoped<IInstitucioniRepository, SQLInstitucioniRepository>();
builder.Services.AddScoped<IPublikimiRepository, SQLPublikimiRepository>();
builder.Services.AddScoped<IPunaVullnetareRepository, SQLPunaVullnetareRepository>();
builder.Services.AddScoped<IAftesiteRepository, SQLAftesiteRepository>();
builder.Services.AddScoped<IGjuhetRepostory, SQLGjuhetRepository>();
builder.Services.AddScoped<ISpecializimetRepository, SQLSpecializimetRepository>();
builder.Services.AddScoped<IDepartamentiRepository, SQLDepartamentiRepository>();
builder.Services.AddScoped<IUserRepository, SQLUserRepository>();


builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();

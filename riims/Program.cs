using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using riims.Data;
using riims.Mappings;
using riims.Models.Domain;
using riims.Repositories;
using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Riims API", Version = "v1" });
    options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = JwtBearerDefaults.AuthenticationScheme
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = JwtBearerDefaults.AuthenticationScheme
                },
                Scheme = "Oauth2",
                Name = JwtBearerDefaults.AuthenticationScheme,
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

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
builder.Services.AddScoped<INiveliGjuhesorRepository, SQLNiveliGjuhesorRepository>();
builder.Services.AddScoped<IUserGjuhetRepository, SQLUserGjuhetRepository>();
builder.Services.AddScoped<INiveliAkademikRepository, SQLNiveliAkademikRepository>();
builder.Services.AddScoped<IMbikqyresRepository, SQLMbikqyresRepository>();
builder.Services.AddScoped<ITokenRepository, TokenRepository>();
builder.Services.AddScoped<IImageRepository, LocalImageRepository>();


builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

builder.Services.AddIdentityCore<User>()
    .AddRoles<IdentityRole>()
    .AddTokenProvider<DataProtectorTokenProvider<User>>("Riims")
    .AddEntityFrameworkStores<RiimsDbContext>()
    .AddDefaultTokenProviders();


builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
});


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Images")),
    RequestPath = "/Images"

});

app.UseAuthorization();

app.MapControllers();

app.Run();

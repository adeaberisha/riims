using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace riims.Migrations
{
    /// <inheritdoc />
    public partial class SeedingDataforNiveliGjuhesor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "NiveliGjuhesor",
                columns: new[] { "Id", "Niveli" },
                values: new object[,]
                {
                    { new Guid("2ea9d919-b3ea-4d0e-9e76-311c6955c4e7"), "C1" },
                    { new Guid("4f965348-1db2-4212-88bf-1bc868338209"), "B1" },
                    { new Guid("81ebd457-1e9a-480b-bde1-d62196c51d75"), "C2" },
                    { new Guid("a5c0e948-be3d-4ebd-beba-8b0a9fc0285b"), "B2" },
                    { new Guid("c7c2b680-c679-4de2-83d0-28464165f115"), "A2" },
                    { new Guid("e52fa674-6854-4539-aeb8-89e716698f21"), "A1" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "NiveliGjuhesor",
                keyColumn: "Id",
                keyValue: new Guid("2ea9d919-b3ea-4d0e-9e76-311c6955c4e7"));

            migrationBuilder.DeleteData(
                table: "NiveliGjuhesor",
                keyColumn: "Id",
                keyValue: new Guid("4f965348-1db2-4212-88bf-1bc868338209"));

            migrationBuilder.DeleteData(
                table: "NiveliGjuhesor",
                keyColumn: "Id",
                keyValue: new Guid("81ebd457-1e9a-480b-bde1-d62196c51d75"));

            migrationBuilder.DeleteData(
                table: "NiveliGjuhesor",
                keyColumn: "Id",
                keyValue: new Guid("a5c0e948-be3d-4ebd-beba-8b0a9fc0285b"));

            migrationBuilder.DeleteData(
                table: "NiveliGjuhesor",
                keyColumn: "Id",
                keyValue: new Guid("c7c2b680-c679-4de2-83d0-28464165f115"));

            migrationBuilder.DeleteData(
                table: "NiveliGjuhesor",
                keyColumn: "Id",
                keyValue: new Guid("e52fa674-6854-4539-aeb8-89e716698f21"));
        }
    }
}

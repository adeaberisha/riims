using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace riims.Migrations
{
    /// <inheritdoc />
    public partial class SeedingdataforInstitucioniandNiveliAkademik : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Institucioni",
                columns: new[] { "Id", "Emri" },
                values: new object[,]
                {
                    { new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48"), "UBT" },
                    { new Guid("94c1f26d-3feb-4b96-91e5-68d077a5b804"), "UP" }
                });

            migrationBuilder.InsertData(
                table: "NiveliAkademik",
                columns: new[] { "Id", "lvl" },
                values: new object[,]
                {
                    { new Guid("6f67cd1a-d096-4dc6-a011-f733be57f74c"), "M.Sc." },
                    { new Guid("f53512ec-7466-4a98-90bd-862ca65e5cfd"), "Ph.D." },
                    { new Guid("fe75fb45-6c06-4324-a2a2-092b6e4a493e"), "B.Sc." }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Institucioni",
                keyColumn: "Id",
                keyValue: new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48"));

            migrationBuilder.DeleteData(
                table: "Institucioni",
                keyColumn: "Id",
                keyValue: new Guid("94c1f26d-3feb-4b96-91e5-68d077a5b804"));

            migrationBuilder.DeleteData(
                table: "NiveliAkademik",
                keyColumn: "Id",
                keyValue: new Guid("6f67cd1a-d096-4dc6-a011-f733be57f74c"));

            migrationBuilder.DeleteData(
                table: "NiveliAkademik",
                keyColumn: "Id",
                keyValue: new Guid("f53512ec-7466-4a98-90bd-862ca65e5cfd"));

            migrationBuilder.DeleteData(
                table: "NiveliAkademik",
                keyColumn: "Id",
                keyValue: new Guid("fe75fb45-6c06-4324-a2a2-092b6e4a493e"));
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace riims.Migrations
{
    /// <inheritdoc />
    public partial class SeedingDataforDepartmenti : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Departamenti",
                columns: new[] { "Id", "Emri", "InstitucioniId" },
                values: new object[,]
                {
                    { new Guid("05251f11-0354-4d11-8dca-4422d284160b"), "Politika Publike dhe Menaxhimi", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("0a2c57ba-17fb-4f79-bcc4-cef9e704bf3d"), "Menaxhment, Biznes dhe Ekonomi", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("1e962ebf-9721-4fab-b489-6f0a1de1f0e8"), "Psikologji", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("1efbe13e-9b02-4860-8715-f80b035f93e2"), "Shkenca Kompjuterike dhe Inxhineri", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("273b38a2-4cd7-47e4-968b-d5d48d364edd"), "Shkenca e Ushqimit dhe bioteknologji", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("2c6b9320-7b40-4234-867c-03e3ae05f7ba"), "Menaxhment i Mekatronikës", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("3f6e8e7a-58dc-4e60-9fad-fa4b2be412cd"), "Juridik", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("4debc353-f2cc-4d75-82c8-0e356999a77a"), "Arti dhe Mediat Digjitale", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("571348c4-aadf-42b2-be6b-c2219e4dd845"), "AgriKulturë dhe Inxhineri e Ambientit", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("5d193df8-ef18-48d8-a722-7d94dbf636c6"), "Farmaci", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("6d76ebfe-ef5b-43e5-8813-bbf98f2e7657"), "Sistemet e Informacionit", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("7300a7d2-a6a0-4ca4-96c6-940e7b0c865e"), "Teknik i Radiologjisë", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("7b6a59f2-d536-45c2-b981-ce54917084c0"), "Dizajn i Integruar", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("7bb0e204-8a1a-4d40-b08f-81015d5c3c4e"), "Infermieri", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("7da76f05-491c-44b4-9377-7e99c3ffd97b"), "Teknik i Anesteziologjisë", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("985167e8-cb59-4e1a-8bc8-268a3caf2911"), "Stomatologji", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("9aa12dbb-746c-41de-88b5-19da7de10516"), "Muzika Moderne, Prodhimi Digjital dhe Menaxhimi", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("9e789309-441e-4f3f-af5f-69ba940902db"), "Shkenca Politike", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("b010567e-5b9c-461a-9d4b-1a9c36148f03"), "Inxhineri e Energjisë", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("b47eb467-7e2c-476c-b50b-25751692b447"), "Aktrim", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("dc1db886-3100-4ce9-99cc-493d88f603d5"), "Media dhe Komunikim", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("dd90af7b-1852-42af-942d-c51fd8c6e854"), "Arkitekturë dhe Planifikimi Hapësinor", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") },
                    { new Guid("f9944afc-5811-4960-96ab-d585f0210707"), "Inxhineri Ndërtimore(Ndërtimtari) dhe Infrastrukturë", new Guid("496cc2c1-cc09-4c64-a53d-9529c2486b48") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("05251f11-0354-4d11-8dca-4422d284160b"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("0a2c57ba-17fb-4f79-bcc4-cef9e704bf3d"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("1e962ebf-9721-4fab-b489-6f0a1de1f0e8"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("1efbe13e-9b02-4860-8715-f80b035f93e2"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("273b38a2-4cd7-47e4-968b-d5d48d364edd"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("2c6b9320-7b40-4234-867c-03e3ae05f7ba"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("3f6e8e7a-58dc-4e60-9fad-fa4b2be412cd"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("4debc353-f2cc-4d75-82c8-0e356999a77a"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("571348c4-aadf-42b2-be6b-c2219e4dd845"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("5d193df8-ef18-48d8-a722-7d94dbf636c6"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("6d76ebfe-ef5b-43e5-8813-bbf98f2e7657"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("7300a7d2-a6a0-4ca4-96c6-940e7b0c865e"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("7b6a59f2-d536-45c2-b981-ce54917084c0"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("7bb0e204-8a1a-4d40-b08f-81015d5c3c4e"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("7da76f05-491c-44b4-9377-7e99c3ffd97b"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("985167e8-cb59-4e1a-8bc8-268a3caf2911"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("9aa12dbb-746c-41de-88b5-19da7de10516"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("9e789309-441e-4f3f-af5f-69ba940902db"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("b010567e-5b9c-461a-9d4b-1a9c36148f03"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("b47eb467-7e2c-476c-b50b-25751692b447"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("dc1db886-3100-4ce9-99cc-493d88f603d5"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("dd90af7b-1852-42af-942d-c51fd8c6e854"));

            migrationBuilder.DeleteData(
                table: "Departamenti",
                keyColumn: "Id",
                keyValue: new Guid("f9944afc-5811-4960-96ab-d585f0210707"));
        }
    }
}

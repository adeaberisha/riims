using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace riims.Migrations
{
    /// <inheritdoc />
    public partial class UserMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    gjinia = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dataELindjes = table.Column<DateTime>(type: "datetime2", nullable: true),
                    numriTelefonit = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "User");
        }
    }
}

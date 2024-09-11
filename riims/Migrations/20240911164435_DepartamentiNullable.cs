using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace riims.Migrations
{
    /// <inheritdoc />
    public partial class DepartamentiNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MbikqyresITemave_Departamenti_DepartamentiId",
                table: "MbikqyresITemave");

            migrationBuilder.AlterColumn<Guid>(
                name: "DepartamentiId",
                table: "MbikqyresITemave",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_MbikqyresITemave_Departamenti_DepartamentiId",
                table: "MbikqyresITemave",
                column: "DepartamentiId",
                principalTable: "Departamenti",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MbikqyresITemave_Departamenti_DepartamentiId",
                table: "MbikqyresITemave");

            migrationBuilder.AlterColumn<Guid>(
                name: "DepartamentiId",
                table: "MbikqyresITemave",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MbikqyresITemave_Departamenti_DepartamentiId",
                table: "MbikqyresITemave",
                column: "DepartamentiId",
                principalTable: "Departamenti",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SupermarketApi.src.Migrations
{
    /// <inheritdoc />
    public partial class AllowNullShelveld : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Shelves_ShelveId",
                table: "Products");

            migrationBuilder.AlterColumn<int>(
                name: "ShelveId",
                table: "Products",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Shelves_ShelveId",
                table: "Products",
                column: "ShelveId",
                principalTable: "Shelves",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Shelves_ShelveId",
                table: "Products");

            migrationBuilder.AlterColumn<int>(
                name: "ShelveId",
                table: "Products",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Shelves_ShelveId",
                table: "Products",
                column: "ShelveId",
                principalTable: "Shelves",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

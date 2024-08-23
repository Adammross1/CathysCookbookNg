using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CathysCookbookAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCompositeKeyToRecipeDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ingredient_class",
                columns: table => new
                {
                    IngredientClassID = table.Column<int>(type: "INTEGER", nullable: false),
                    IngredientClassName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ingredient_class", x => x.IngredientClassID);
                });

            migrationBuilder.CreateTable(
                name: "ingredients",
                columns: table => new
                {
                    IngredientID = table.Column<int>(type: "INTEGER", nullable: false),
                    IngredientName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ingredients", x => x.IngredientID);
                });

            migrationBuilder.CreateTable(
                name: "lists",
                columns: table => new
                {
                    ListId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ListName = table.Column<int>(type: "INTEGER", nullable: false),
                    RecipeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lists", x => x.ListId);
                });

            migrationBuilder.CreateTable(
                name: "measurement_units",
                columns: table => new
                {
                    MeasurementID = table.Column<int>(type: "INTEGER", nullable: false),
                    MeasurementName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_measurement_units", x => x.MeasurementID);
                });

            migrationBuilder.CreateTable(
                name: "recipe_class",
                columns: table => new
                {
                    RecipeClassID = table.Column<int>(type: "INTEGER", nullable: false),
                    RecipeClassName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recipe_class", x => x.RecipeClassID);
                });

            migrationBuilder.CreateTable(
                name: "recipe_details",
                columns: table => new
                {
                    RecipeID = table.Column<int>(type: "INTEGER", nullable: false),
                    RecipeSeqNo = table.Column<int>(type: "INTEGER", nullable: false),
                    IngredientID = table.Column<int>(type: "INTEGER", nullable: false),
                    IngredientClassID = table.Column<int>(type: "INTEGER", nullable: false),
                    MeasurementID = table.Column<int>(type: "INTEGER", nullable: false),
                    Amount = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recipe_details", x => new { x.RecipeID, x.RecipeSeqNo });
                });

            migrationBuilder.CreateTable(
                name: "recipes",
                columns: table => new
                {
                    RecipeID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RecipeTitle = table.Column<string>(type: "TEXT", nullable: false),
                    Instructions = table.Column<string>(type: "TEXT", nullable: false),
                    RecipeClassID = table.Column<int>(type: "INTEGER", nullable: false),
                    Image = table.Column<byte[]>(type: "BLOB", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recipes", x => x.RecipeID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_lists_ListId",
                table: "lists",
                column: "ListId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_recipes_RecipeID",
                table: "recipes",
                column: "RecipeID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ingredient_class");

            migrationBuilder.DropTable(
                name: "ingredients");

            migrationBuilder.DropTable(
                name: "lists");

            migrationBuilder.DropTable(
                name: "measurement_units");

            migrationBuilder.DropTable(
                name: "recipe_class");

            migrationBuilder.DropTable(
                name: "recipe_details");

            migrationBuilder.DropTable(
                name: "recipes");
        }
    }
}

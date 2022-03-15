using Microsoft.EntityFrameworkCore.Migrations;

namespace Project_v1.Migrations
{
    public partial class v01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reziser",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reziser", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Serija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    BrojSezona = table.Column<int>(type: "int", nullable: false),
                    Ocena = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Serija", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Zanr",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zanr", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Sezona",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RedniBrojSezone = table.Column<int>(type: "int", nullable: false),
                    BrojEpizoda = table.Column<int>(type: "int", nullable: false),
                    GodinaEmitovanja = table.Column<int>(type: "int", nullable: false),
                    SezonaSerijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sezona", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Sezona_Serija_SezonaSerijaID",
                        column: x => x.SezonaSerijaID,
                        principalTable: "Serija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Epizoda",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RedniBrojEpizode = table.Column<int>(type: "int", nullable: false),
                    Naziv = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Trajanje = table.Column<int>(type: "int", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(999)", maxLength: 999, nullable: false),
                    EpizodaSezonaID = table.Column<int>(type: "int", nullable: true),
                    EpizodaZanrID = table.Column<int>(type: "int", nullable: true),
                    EpizodaReziserID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Epizoda", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Epizoda_Reziser_EpizodaReziserID",
                        column: x => x.EpizodaReziserID,
                        principalTable: "Reziser",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Epizoda_Sezona_EpizodaSezonaID",
                        column: x => x.EpizodaSezonaID,
                        principalTable: "Sezona",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Epizoda_Zanr_EpizodaZanrID",
                        column: x => x.EpizodaZanrID,
                        principalTable: "Zanr",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Epizoda_EpizodaReziserID",
                table: "Epizoda",
                column: "EpizodaReziserID");

            migrationBuilder.CreateIndex(
                name: "IX_Epizoda_EpizodaSezonaID",
                table: "Epizoda",
                column: "EpizodaSezonaID");

            migrationBuilder.CreateIndex(
                name: "IX_Epizoda_EpizodaZanrID",
                table: "Epizoda",
                column: "EpizodaZanrID");

            migrationBuilder.CreateIndex(
                name: "IX_Sezona_SezonaSerijaID",
                table: "Sezona",
                column: "SezonaSerijaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Epizoda");

            migrationBuilder.DropTable(
                name: "Reziser");

            migrationBuilder.DropTable(
                name: "Sezona");

            migrationBuilder.DropTable(
                name: "Zanr");

            migrationBuilder.DropTable(
                name: "Serija");
        }
    }
}

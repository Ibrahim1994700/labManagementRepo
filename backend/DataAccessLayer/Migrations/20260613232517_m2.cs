using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class m2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Days_LabBranch_LabBranchId",
                table: "Days");

            migrationBuilder.DropIndex(
                name: "IX_Days_LabBranchId",
                table: "Days");

            migrationBuilder.DropColumn(
                name: "LabBranchId",
                table: "Days");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "LabBranchId",
                table: "Days",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Days_LabBranchId",
                table: "Days",
                column: "LabBranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Days_LabBranch_LabBranchId",
                table: "Days",
                column: "LabBranchId",
                principalTable: "LabBranch",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

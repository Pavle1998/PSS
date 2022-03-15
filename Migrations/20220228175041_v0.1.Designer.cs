﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace Project_v1.Migrations
{
    [DbContext(typeof(SerijaContext))]
    [Migration("20220228175041_v0.1")]
    partial class v01
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.Epizoda", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("EpizodaReziserID")
                        .HasColumnType("int");

                    b.Property<int?>("EpizodaSezonaID")
                        .HasColumnType("int");

                    b.Property<int?>("EpizodaZanrID")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasMaxLength(999)
                        .HasColumnType("nvarchar(999)");

                    b.Property<int>("RedniBrojEpizode")
                        .HasColumnType("int");

                    b.Property<int>("Trajanje")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("EpizodaReziserID");

                    b.HasIndex("EpizodaSezonaID");

                    b.HasIndex("EpizodaZanrID");

                    b.ToTable("Epizoda");
                });

            modelBuilder.Entity("Models.Reziser", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("ID");

                    b.ToTable("Reziser");
                });

            modelBuilder.Entity("Models.Serija", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BrojSezona")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<double>("Ocena")
                        .HasColumnType("float");

                    b.HasKey("ID");

                    b.ToTable("Serija");
                });

            modelBuilder.Entity("Models.Sezona", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BrojEpizoda")
                        .HasColumnType("int");

                    b.Property<int>("GodinaEmitovanja")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("RedniBrojSezone")
                        .HasColumnType("int");

                    b.Property<int?>("SezonaSerijaID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("SezonaSerijaID");

                    b.ToTable("Sezona");
                });

            modelBuilder.Entity("Models.Zanr", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("ID");

                    b.ToTable("Zanr");
                });

            modelBuilder.Entity("Models.Epizoda", b =>
                {
                    b.HasOne("Models.Reziser", "EpizodaReziser")
                        .WithMany("ReziserEpizoda")
                        .HasForeignKey("EpizodaReziserID");

                    b.HasOne("Models.Sezona", "EpizodaSezona")
                        .WithMany("SezonaEpizoda")
                        .HasForeignKey("EpizodaSezonaID");

                    b.HasOne("Models.Zanr", "EpizodaZanr")
                        .WithMany("ZanrEpizoda")
                        .HasForeignKey("EpizodaZanrID");

                    b.Navigation("EpizodaReziser");

                    b.Navigation("EpizodaSezona");

                    b.Navigation("EpizodaZanr");
                });

            modelBuilder.Entity("Models.Sezona", b =>
                {
                    b.HasOne("Models.Serija", "SezonaSerija")
                        .WithMany("SerijaSezona")
                        .HasForeignKey("SezonaSerijaID");

                    b.Navigation("SezonaSerija");
                });

            modelBuilder.Entity("Models.Reziser", b =>
                {
                    b.Navigation("ReziserEpizoda");
                });

            modelBuilder.Entity("Models.Serija", b =>
                {
                    b.Navigation("SerijaSezona");
                });

            modelBuilder.Entity("Models.Sezona", b =>
                {
                    b.Navigation("SezonaEpizoda");
                });

            modelBuilder.Entity("Models.Zanr", b =>
                {
                    b.Navigation("ZanrEpizoda");
                });
#pragma warning restore 612, 618
        }
    }
}
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CathysCookbookAPI.Models;

public partial class CookbookContext : DbContext
{
    public CookbookContext()
    {
    }

    public CookbookContext(DbContextOptions<CookbookContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<IngredientClass> IngredientClasses { get; set; }

    public virtual DbSet<List> Lists { get; set; }

    public virtual DbSet<MeasurementUnit> MeasurementUnits { get; set; }

    public virtual DbSet<Recipe> Recipes { get; set; }

    public virtual DbSet<RecipeClass> RecipeClasses { get; set; }

    public virtual DbSet<RecipeDetail> RecipeDetails { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=cookbook.sqlite");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ingredient>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ingredients");

            entity.Property(e => e.IngredientId).HasColumnName("IngredientID");
        });

        modelBuilder.Entity<IngredientClass>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ingredient_class");

            entity.Property(e => e.IngredientClassId).HasColumnName("IngredientClassID");
        });

        modelBuilder.Entity<List>(entity =>
        {
            entity.ToTable("lists");

            entity.HasIndex(e => e.ListId, "IX_lists_ListId").IsUnique();
        });

        modelBuilder.Entity<MeasurementUnit>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("measurement_units");

            entity.Property(e => e.MeasurementId).HasColumnName("MeasurementID");
        });

        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.ToTable("recipes");

            entity.HasIndex(e => e.RecipeId, "IX_recipes_RecipeID").IsUnique();

            entity.Property(e => e.RecipeId).HasColumnName("RecipeID");
            entity.Property(e => e.RecipeClassId).HasColumnName("RecipeClassID");
        });

        modelBuilder.Entity<RecipeClass>(entity =>
        {
            entity.ToTable("recipe_class");

            entity.Property(e => e.RecipeClassId)
                .ValueGeneratedNever()
                .HasColumnName("RecipeClassID");
        });

        modelBuilder.Entity<RecipeDetail>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("recipe_details");

            entity.Property(e => e.IngredientClassId)
                .HasColumnType("INTEGER")
                .HasColumnName("IngredientClassID");
            entity.Property(e => e.IngredientId)
                .HasColumnType("INTEGER")
                .HasColumnName("IngredientID");
            entity.Property(e => e.MeasurementId)
                .HasColumnType("INTEGER")
                .HasColumnName("MeasurementID");
            entity.Property(e => e.RecipeId).HasColumnName("RecipeID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

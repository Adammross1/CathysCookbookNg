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

    public virtual DbSet<MeasurementUnit> MeasurementUnits { get; set; }

    public virtual DbSet<Recipe> Recipes { get; set; }

    public virtual DbSet<RecipeClass> RecipeClasses { get; set; }

    public virtual DbSet<RecipeDetail> RecipeDetails { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
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

        modelBuilder.Entity<MeasurementUnit>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("measurement_units");

            entity.Property(e => e.MeasurementId).HasColumnName("MeasurementID");
        });

        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.HasKey(e => new { e.RecipeId, e.RecipeTitle, e.Instructions });

            entity.ToTable("recipes");

            entity.Property(e => e.RecipeId).HasColumnName("RecipeID");
            // entity.Property(e => e.RecipeClassId).HasColumnName("RecipeClassID");
        });

        modelBuilder.Entity<RecipeClass>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("recipe_class");

            entity.Property(e => e.RecipeClassId).HasColumnName("RecipeClassID");
        });

        modelBuilder.Entity<RecipeDetail>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("recipe_details");

            entity.Property(e => e.IngredientClassId).HasColumnName("IngredientClassID");
            entity.Property(e => e.IngredientId).HasColumnName("IngredientID");
            entity.Property(e => e.MeasurementId).HasColumnName("MeasurementID");
            entity.Property(e => e.RecipeId).HasColumnName("RecipeID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

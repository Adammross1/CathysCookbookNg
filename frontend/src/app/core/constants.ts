export const COOKBOOKS_TABS = ['myRecipes', 'cookbooks', 'newRecipe'] as const;

export type tabOption = keyof typeof TABS_DISPLAY_MAP;

export const TABS_DISPLAY_MAP = {
  myRecipes: 'My Recipes',
  cookbooks: 'Recipe Collections',
  newRecipe: 'New Recipe',
} as const;

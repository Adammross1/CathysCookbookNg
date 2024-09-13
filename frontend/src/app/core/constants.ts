export const COOKBOOKS_TABS = [
  'myRecipes',
  'collections',
  'newRecipe',
] as const;

export type tabOption = keyof typeof TABS_DISPLAY_MAP;

export const TABS_DISPLAY_MAP = {
  myRecipes: 'My Recipes',
  collections: 'Recipe Collections',
  newRecipe: 'New Recipe',
} as const;

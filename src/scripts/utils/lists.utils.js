import recipes from '../../data/recipes.js'

const listOfRecipes = recipes.recipes;

const listOfRecipeTitles = listOfRecipes.map((recipe) => recipe.name);
const listOfRecipeDescriptions = listOfRecipes.map((recipe) => recipe.description);

const listOfRecipeIngredients = [...new Set(listOfRecipes.flatMap((recipe) => recipe.ingredients.map((ingredient) => ingredient.ingredient)))];
const listOfRecipeAppliances = [...new Set(listOfRecipes.map((recipe) => recipe.appliance))];
const listOfRecipeUstensils = [...new Set(listOfRecipes.flatMap((recipe) => recipe.ustensils))];

const listOfOptions = [
  { id: "ingredients", options: listOfRecipeIngredients },
  { id: "appliance", options: listOfRecipeAppliances },
  { id: "ustensils", options: listOfRecipeUstensils },
]

const listOfSelects = [
  { id: "ingredients", text: "Ingredients", contentId: "ingredients_content", inputId: "ingredients_input", inputLabel: "ingredient" },
  { id: "appliance", text: "Appliance", contentId: "appliance_content", inputId: "appliance_input", inputLabel: "appliance" },
  { id: "ustensils", text: "Ustensils", contentId: "ustensils_content", inputId: "ustensils_input", inputLabel: "ustensil" }
]

export {
  listOfRecipes,
  listOfRecipeTitles,
  listOfRecipeDescriptions,
  listOfRecipeIngredients,
  listOfRecipeAppliances,
  listOfRecipeUstensils,
  listOfOptions,
  listOfSelects
};

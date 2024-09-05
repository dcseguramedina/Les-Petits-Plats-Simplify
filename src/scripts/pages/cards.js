export default function displayRecipeCards(recipes) {
    let allRecipes = []

    const recipeCardTemplate = document.querySelector("[data-recipe-card-template]")
    const recipeCardContainer = document.querySelector("[data-recipe-cards-container]")

    allRecipes = recipes.map((recipe) => {
        const card = recipeCardTemplate.content.cloneNode(true).children[0]

        const recipeTime = card.querySelector("[data-recipe-time]")
        recipeTime.textContent = recipe.time + `min`

        const recipeImage = card.querySelector("[data-recipe-image]")
        recipeImage.src = `../src/assets/recipes/${recipe.image}`
        recipeImage.alt = recipe.name

        const recipeName = card.querySelector("[data-recipe-name]")
        recipeName.textContent = recipe.name

        const recipeDescriptionTitle = card.querySelector("[data-recipe-description-title]")
        recipeDescriptionTitle.textContent = `recette`

        const recipeDescriptionText = card.querySelector("[data-recipe-description-text]")
        recipeDescriptionText.textContent = recipe.description

        const recipeIngredientsTitle = card.querySelector("[data-recipe-ingredients-title]")
        recipeIngredientsTitle.textContent = `ingrédients`

        const recipeIngredientsList = card.querySelector("[data-recipe-ingredients-list]")

        let ingredientsList = recipe.ingredients

        for (let i = 0; i < ingredientsList.length; i++) {

            // Create a "ul" tag for recipe's ingredients
            const list = document.createElement('ul')
            list.className = 'mt-5'
            recipeIngredientsList.appendChild(list)

            // Create a "li" tag for each ingredient
            const ingredient = document.createElement('li')
            ingredient.textContent = ingredientsList[i].ingredient
            list.appendChild(ingredient)

            // Create a "li" tag for each quantity
            const quantity = document.createElement('li')
            quantity.className = 'text-stone-500'
            quantity.textContent = (ingredientsList[i].quantity ? ingredientsList[i].quantity : "") + ' ' + (ingredientsList[i].unit ? ingredientsList[i].unit : "")
            list.appendChild(quantity)
        }

        recipeCardContainer.append(card)

        return { name: recipe.name, description: recipe.description, ingredients: recipe.ingredients, appliances: recipe.appliance, ustensils: recipe.ustensils, element: card }
    })
}

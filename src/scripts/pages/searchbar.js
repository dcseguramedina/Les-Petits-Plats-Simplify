import displayRecipeCards from "./cards.js"
import { listOfRecipes } from "../utils/lists.utils.js"

const searchInput = document.querySelector("[data-search]")
const searchBtn = document.querySelector("[data-search-btn]")

//  Initialize the results array with all recipes
let results = [...listOfRecipes]

searchInput.addEventListener("keydown", (e) => {
    clearSearchResults()
    if (e.key === "Enter") {
        handleSearch(e.currentTarget.value)
        e.currentTarget.value = ''
    }
})

searchBtn.addEventListener("click", () => {
    clearSearchResults()
    handleSearch(searchInput.value)
    searchInput.value = ''
})

// // Add an input event listener for real-time search
// searchInput.addEventListener("input", (e) => {
//   const value = e.target.value.trim().toLowerCase()
//   if (value.length >= 3) {
//     handleSearch(value)
//   } else if (value.length === 0) {
//     // Clear results when input is empty
//     clearSearchResults()
//   }
// })

function handleSearch(value) {
    value = value.trim().toLowerCase()

    if (value.length < 3) {
        displaySearchError('Veuillez saisir au moins 3 caractères.')
        return
    }

    launchSearch(value)
    updateHomePage(results)
}

function displaySearchError(message) {
    alert(message)
}

function clearSearchResults() {
    results = [...listOfRecipes]
    updateHomePage(results)
}

function launchSearch(value) {
    let newResults = []
    // Search through all recipes, not just the current results
    listOfRecipes.forEach((recipe) => {
        const isMatch =
            recipe.name.toLowerCase().includes(value) ||
            recipe.description.toLowerCase().includes(value) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.ingredient.toLowerCase().includes(value)
            ) ||
            recipe.appliance.toLowerCase().includes(value) ||
            recipe.ustensils.some((ustensil) =>
                ustensil.toLowerCase().includes(value)
            )

        if (isMatch) {
            // Add matching recipes to newResults array
            newResults.push(recipe)
        }
    })

    // Update the global results array filtering the results
    results = results.filter((recipe) =>
        newResults.some((newRecipe) => newRecipe.name === recipe.name)
    )

    return results
}
console.log(results)

function updateHomePage(results) {
    const recipesSection = document.querySelector(".recipes_section")
    recipesSection.textContent = ""
    displayRecipeCards(results)
    updateSelectOptions(results)

    const recipesNumber = document.getElementById('recipes_number')
    let number = results.length
    recipesNumber.textContent = `${number} recette${number !== 1 ? 's' : ''}`
}

function updateSelectOptions(results) {
    const listOfUpdatedIngredients = [...new Set(results.flatMap((result) => result.ingredients.map((ingredient) => ingredient.ingredient)))]
    const listOfUpdatedAppliances = [...new Set(results.map((result) => result.appliance))]
    const listOfUpdatedUstensils = [...new Set(results.flatMap((result) => result.ustensils))]

    const listOfUpdatedOptions = [
        { id: "ingredients_content", options: listOfUpdatedIngredients },
        { id: "appliance_content", options: listOfUpdatedAppliances },
        { id: "ustensils_content", options: listOfUpdatedUstensils },
    ]

    const dropdownContents = document.querySelectorAll("[data-dropdown-content]")
    console.log(dropdownContents)

    dropdownContents.forEach((dropdown) => {
        // Find the correct options list for each select
        const optionsForThisSelect = listOfUpdatedOptions.find((option) => option.id === dropdown.id)

        if (optionsForThisSelect) {
            // Remove existing options with class 'dropdown_item'
            dropdown.querySelectorAll('.dropdown_item').forEach((item) => item.remove())
            
            // Add new options to the dropdown        
            optionsForThisSelect.options.forEach((option) => {
                const optionElement = document.createElement('div')
                optionElement.className = 'dropdown_item'
                optionElement.textContent = option
                optionElement.setAttribute('data-value', option)
                dropdown.appendChild(optionElement)

                optionElement.addEventListener('click', handleClickOnOptions)
            })
        }
    })
}


export function handleClickOnOptions(e) {
    console.log("hello from click")
    handleSearch(e.currentTarget.textContent)
    e.currentTarget.textContent = ''
}

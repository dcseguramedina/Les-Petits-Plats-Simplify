import displayRecipeCards from "./cards.js"
import displaySelectDropdowns from "./select.js"
import { listOfRecipes, listOfSelects, listOfOptions } from "../utils/lists.utils.js"

function displayHomePage() {
  displaySelectDropdowns(listOfSelects, listOfOptions)
  displayRecipeCards(listOfRecipes)
}
displayHomePage()

import { handleClickOnOptions } from "./searchbar.js"
    
export default function displaySelectDropdowns(selects, listOfOptions) {
    let allSelects = []

    const selectTemplate = document.querySelector("[data-select-template]")
    const selectContainer = document.querySelector("[data-select-container]")

    allSelects = selects.map((select) => {
        const dropdown = selectTemplate.content.cloneNode(true).children[0]

        const dropdownBtn = dropdown.querySelector("[data-dropdown-btn]")
        dropdownBtn.id = select.id
        dropdownBtn.setAttribute('aria-label', `Select by ${select.id}`);
        dropdownBtn.textContent = select.text

        const iconElement = document.createElement('spam')
        iconElement.className = "arrow"
        iconElement.textContent = `>`
        dropdownBtn.appendChild(iconElement)

        dropdownBtn.addEventListener('click', handleDropdownToggle)
        dropdownBtn.addEventListener('keydown', handleDropdownToggle)

        const dropdownContent = dropdown.querySelector("[data-dropdown-content]")
        dropdownContent.id = select.contentId

        const dropdownInput = dropdown.querySelector("[data-dropdown-input]")
        dropdownInput.id = select.inputId
        dropdownInput.setAttribute('aria-label', `Search for an ${select.inputLabel}`)

        dropdownInput.addEventListener('keyup', (e) => {
            e.preventDefault()
            filterOptions(e.currentTarget)
        })

        // Find the correct options list for this select
        const optionsForThisSelect = listOfOptions.find((option) => option.id === select.id)

        if (optionsForThisSelect) {
            // Add options to the dropdown        
            optionsForThisSelect.options.forEach((option) => {
                const optionElement = document.createElement('div')
                optionElement.className = 'dropdown_item'
                optionElement.textContent = option
                optionElement.setAttribute('data-value', option)
                dropdownContent.appendChild(optionElement)

                optionElement.addEventListener('click', handleClickOnOptions)
                optionElement.addEventListener('keydown', handleClickOnOptions)
            });
        }

        selectContainer.append(dropdown)

        return { id: select.id, contentId: select.contentId, inputId: select.inputId, element: dropdown }
    })

    return allSelects
}

function handleDropdownToggle(e) {
    const key = e.key
    if (key === "Enter" || key === " " || e.type === 'click') {
        e.preventDefault()
        dropdowntoggle(e.currentTarget)
    }
}

function dropdowntoggle(currentTarget) {
    let id = currentTarget.id
    const selectDropdown = document.getElementById(id);
    selectDropdown.nextElementSibling.classList.toggle('show')
    selectDropdown.lastElementChild.style.transform = selectDropdown.nextElementSibling.classList.contains('show') ? 'rotate(270deg)' : 'rotate(90deg)'
    selectDropdown.style.borderRadius = selectDropdown.nextElementSibling.classList.contains('show') ? '10px 10px 0 0' : '10px'
}

function filterOptions(currentTarget) {
    let id = currentTarget.id
    const selectInputValue = currentTarget.value.toLowerCase()
    const inputContainer = currentTarget.parentElement
    const options = inputContainer.closest(".dropdown_content").getElementsByClassName("dropdown_item")

    Array.from(options).forEach((option) => {
        const optionInputValue = option.textContent
        const isVisible = optionInputValue.toLowerCase().includes(selectInputValue)
        option.style.display = isVisible ? '' : 'none'
    })
}

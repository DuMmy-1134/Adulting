let quickMeals = [
  {
    id: "meal-01",
    name: "Microwave Mug Omelet",
    mealType: "Breakfast",
    estimatedTimeMinutes: 5,
    difficulty: "Easy",
    ingredients: [
      "2 eggs",
      "1 tbsp milk",
      "2 tbsp diced bell peppers",
      "2 tbsp shredded cheese",
      "Salt & pepper to taste",
    ],
    recipe: [
      "Whisk eggs and milk directly inside a microwave-safe mug.",
      "Stir in the peppers, cheese, salt, and pepper.",
      "Microwave on high for 60 to 90 seconds until fully set.",
    ],
  },
  {
    id: "meal-02",
    name: "5-Minute Peanut Butter Noodles",
    mealType: "Dinner",
    estimatedTimeMinutes: 10,
    difficulty: "Easy",
    ingredients: [
      "1 pack instant ramen (discard or save flavor packet)",
      "1.5 tbsp peanut butter",
      "1 tbsp soy sauce",
      "1 tsp honey or brown sugar",
      "1 tsp hot water",
    ],
    recipe: [
      "Boil ramen noodles according to package instructions and drain.",
      "In a bowl, mix peanut butter, soy sauce, honey, and hot water until smooth.",
      "Toss the hot noodles directly into the sauce until coated.",
    ],
  },
  {
    id: "meal-03",
    name: "Crispy Black Bean Quesadilla",
    mealType: "Lunch",
    estimatedTimeMinutes: 8,
    difficulty: "Easy",
    ingredients: [
      "1 large flour tortilla",
      "1/3 cup canned black beans (drained & rinsed)",
      "1/3 cup shredded cheddar or Mexican blend cheese",
      "1/2 tsp taco seasoning",
      "Salsa for serving",
    ],
    recipe: [
      "Mash black beans lightly in a bowl with taco seasoning.",
      "Spread cheese and seasoned beans onto one half of the tortilla, then fold it over.",
      "Toast in a dry skillet over medium heat for 3–4 minutes per side until golden and melted.",
    ],
  },
  {
    id: "meal-04",
    name: "Avocado & Chickpea Toast",
    mealType: "Lunch",
    estimatedTimeMinutes: 7,
    difficulty: "Easy",
    ingredients: [
      "2 slices whole grain bread",
      "1/2 ripe avocado",
      "1/3 cup canned chickpeas (drained)",
      "Lemon juice, salt, pepper, and red pepper flakes",
    ],
    recipe: [
      "Toast the bread slices.",
      "Mash avocado and chickpeas together in a bowl with a squeeze of lemon juice, salt, and pepper.",
      "Spread generously over the toast and top with red pepper flakes.",
    ],
  },
  {
    id: "meal-05",
    name: "One-Pan Garlic Butter Salmon & Asparagus",
    mealType: "Dinner",
    estimatedTimeMinutes: 15,
    difficulty: "Medium",
    ingredients: [
      "1 salmon filet",
      "1 small bunch asparagus (woody ends trimmed)",
      "1 tbsp butter",
      "1 clove minced garlic",
      "Lemon wedges",
    ],
    recipe: [
      "Melt butter in a skillet over medium-high heat and add minced garlic.",
      "Place salmon (skin-side down) and asparagus side-by-side in the pan.",
      "Cook for 4–5 minutes, flip salmon, and cook for another 3–4 minutes until salmon flakes easily and asparagus is tender.",
    ],
  },
  {
    id: "meal-06",
    name: "Greek Yogurt Berry Parfait",
    mealType: "Snack",
    estimatedTimeMinutes: 3,
    difficulty: "Easy",
    ingredients: [
      "3/4 cup plain or vanilla Greek yogurt",
      "1/3 cup granola",
      "1/2 cup fresh or thawed frozen berries",
      "1 tsp honey",
    ],
    recipe: [
      "Layer half the yogurt into a glass or bowl.",
      "Add a layer of berries and granola, then repeat layers.",
      "Drizzle honey over the top and serve immediately.",
    ],
  },
];
const mealsDiv = document.getElementById("mealDiv");

// Same loop you had, just wrapped in a function so we can call it again
// with a different (filtered/sorted) array instead of only ever using
// the full quickMeals list.
function renderMeals(mealsToRender) {
  let htmlCode = "";

  for (let i = 0; i < mealsToRender.length; i++) {
    let meal = mealsToRender[i];
    htmlCode += `<a
          href="#content"
          data-id="${meal["id"]}"
          class="meal-card block bg-white rounded-2xl shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <span
            class="block text-[11.5px] font-bold tracking-[0.06em] text-[#7c9d96] mb-2"
            >${meal["id"]}</span
          >
          <h3
            class="block font-heading font-bold text-lg text-[#2f3e46] mb-2.5"
            >${meal["name"]}</h3
          >
          <span
            class="block font-body text-base text-[#5b6b70] leading-normal mb-3.5"
            >Difficulty: ${meal["difficulty"]}</span
          >
          <span
            class="block font-body text-base text-[#5b6b70] leading-normal mb-3.5"
            >MealType: ${meal["mealType"]}</span
          >
          <span
            class="block font-body text-base text-[#5b6b70] leading-normal mb-3.5"
            >EstimatedTime: ${meal["estimatedTimeMinutes"]}</span
          >
          
          <span
            class="block font-body text-[13.5px] font-semibold text-[#d97757]"
            >Click to Select &rarr;</span
          >
        </a>
        `;
  }
  mealsDiv.innerHTML = htmlCode;
}

renderMeals(quickMeals);

const mealGrid = document.getElementById("mealDiv");
const recipeDisplay = document.getElementById("recipe-display");

// function make the selected text to white
function setCardActive(card, active) {
  card.classList.toggle("bg-[#df936d]", active);
  card.querySelectorAll("span, h3").forEach((s) => {
    if (active) {
      s.style.color = "#fff";
    } else s.style.color = "";
  });
}

mealGrid.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".meal-card");
  if (clickedCard == undefined) return;

  const isAlreadyActive = clickedCard.classList.contains("bg-[#df936d]");

  // 1. Reset card highlights
  document.querySelectorAll(".meal-card").forEach((card) => {
    setCardActive(card, false);
  });

  // 2. If clicking an unselected card, update the display div
  if (!isAlreadyActive) {
    // Highlight the selected card
    setCardActive(clickedCard, true);

    // Look up the full meal object using the id stored on the card
    const meal = quickMeals.find((m) => m.id === clickedCard.dataset.id);
    const recipeTitle = recipeDisplay.querySelector(".recipe-title");
    const ingredientsList = recipeDisplay.querySelector(".ingredients-list");
    const instructionsList = recipeDisplay.querySelector(".instructions-list");

    if (meal && recipeTitle && ingredientsList && instructionsList) {
      recipeTitle.textContent = meal.name;

      ingredientsList.innerHTML = `
        <h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Ingredients</h3>
        <ul class="list-disc list-inside space-y-1 text-[#5b6b70] text-sm">
          ${meal.ingredients.map((item) => `<li>${item}</li>`).join("")}
        </ul>`;

      instructionsList.innerHTML = `
        <h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Instructions</h3>
        <ol class="list-decimal list-inside space-y-2 text-[#5b6b70] text-sm">
          ${meal.recipe.map((step) => `<li>${step}</li>`).join("")}
        </ol>`;
    }

    // Reveal container with fade-in
    recipeDisplay.classList.remove("hidden");
    // setTimeout ensures browser registers removal of 'hidden' before transitioning opacity
    setTimeout(() => {
      recipeDisplay.classList.remove("opacity-0");
      recipeDisplay.classList.add("opacity-100");
    }, 10);

    // Smoothly scroll down to the recipe display section
    recipeDisplay.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    // 3. If clicking the already-active card again, fade out and hide
    recipeDisplay.classList.remove("opacity-100");
    recipeDisplay.classList.add("opacity-0");

    setTimeout(() => {
      recipeDisplay.classList.add("hidden");
    }, 500); // matches duration-500
  }
});

const searchInput = document.getElementById("search-form");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const filteredMeals = quickMeals.filter((meal) =>
    meal.name.toLowerCase().includes(query),
  );

  renderMeals(filteredMeals);
});

const [timeBtn, difficultyBtn, mealTypeBtn, reset] = document.querySelectorAll(
  ".functions-group button",
);

function setupFilterDropdown(button, key) {
  // Set is used to Remove the duplicates
  const options = [...new Set(quickMeals.map((meal) => meal[key]))];

  const dropdown = document.createElement("div");
  dropdown.className =
    "absolute bg-white rounded-xl shadow-md mt-2 py-2 z-10 hidden w-full";
  dropdown.innerHTML = options
    .map(
      (option) =>
        `<div class="filter-option px-4 py-1 text-[#2f3e46] cursor-pointer hover:bg-[#faf7f2]">${option}</div>`,
    )
    .join("");

  button.parentElement.style.position = "relative";
  button.parentElement.appendChild(dropdown);

  button.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  dropdown.addEventListener("click", (e) => {
    const chosen = e.target.closest(".filter-option");
    if (!chosen) return;

    const filteredMeals = quickMeals.filter(
      (meal) => String(meal[key]) === chosen.textContent,
    );
    renderMeals(filteredMeals);
    dropdown.classList.add("hidden");
  });
}
// Reset the filtered Meals if clicked
reset.addEventListener("click", () => {
  renderMeals(quickMeals);
});

// Filter Buttons
setupFilterDropdown(timeBtn, "estimatedTimeMinutes");
setupFilterDropdown(difficultyBtn, "difficulty");
setupFilterDropdown(mealTypeBtn, "mealType");

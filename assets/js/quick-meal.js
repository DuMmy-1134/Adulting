// Every recipe below is copied word-for-word from the recipe card on the
// same page that hosts its linked video (Downshiftology / Budget Bytes),
// so the written steps and the video are guaranteed to match exactly.
let quickMeals = [
  {
    id: "meal-01",
    name: "Overnight Oats",
    mealType: "Breakfast",
    estimatedTimeMinutes: 5,
    difficulty: "Easy",
    ingredients: [
      "1/2 cup rolled oats",
      "1/2 cup milk (dairy or dairy-free)",
      "1/4 cup Greek yogurt (dairy or dairy-free)",
      "1 tbsp chia seeds",
      "1 tbsp maple syrup",
    ],
    recipe: [
      "Stir together the oats, milk, yogurt, chia seeds, and maple syrup in a jar or bowl until combined.",
      "Refrigerate for at least 2 hours &mdash; leave it overnight (8 hours) for the creamiest texture.",
      "Add your favorite toppings and serve.",
    ],
    source: "https://downshiftology.com/recipes/overnight-oats/",
    youtubeId: "Lkl9_3-jX6c",
  },
  {
    id: "meal-02",
    name: "French Bread Pizza",
    mealType: "Lunch",
    estimatedTimeMinutes: 20,
    difficulty: "Easy",
    ingredients: [
      "1 French loaf (about 12&ndash;16 inches long)",
      "1/2 cup pizza sauce",
      "4 oz. mozzarella cheese, shredded (about 1 cup)",
      "Toppings of your choice (optional)",
    ],
    recipe: [
      "Preheat the oven to 400&deg;F. Cut the French loaf in half lengthwise, then cut each half into two pieces. Place the pieces cut-side up on a baking sheet.",
      "Top each piece with about 2 tbsp pizza sauce and 1 oz. (1/4 cup) shredded mozzarella.",
      "Add any additional toppings as desired.",
      "Bake for 10&ndash;15 minutes until the cheese is melted and bubbly and the bread edges are golden and crisp. Serve hot.",
    ],
    source: "https://www.budgetbytes.com/french-bread-pizza/",
    youtubeId: "7GEkASxZYhY",
  },
  {
    id: "meal-03",
    name: "Ultimate BBQ Chicken Quesadillas",
    mealType: "Lunch",
    estimatedTimeMinutes: 25,
    difficulty: "Easy",
    ingredients: [
      "1.5 cups chopped cooked chicken",
      "1 (15 oz) can black beans, drained",
      "1/4 red onion, finely diced",
      "1 jalape&ntilde;o, seeded and finely diced",
      "1/2 cup fresh cilantro, roughly chopped",
      "2 cups shredded cheddar cheese",
      "1 tsp chili powder",
      "1/2 tsp smoked paprika",
      "1/4 tsp salt",
      "1/2 cup BBQ sauce",
      "10 (7-inch) flour tortillas",
    ],
    recipe: [
      "Add the chopped chicken and drained black beans to a large bowl.",
      "Combine the onion, jalape&ntilde;o, cilantro, cheddar, chili powder, paprika, salt, and BBQ sauce with the chicken and beans; stir until evenly combined.",
      "Distribute about 1/3 cup filling onto each tortilla, spreading it over one half of the surface, then fold each tortilla closed.",
      "Cook the folded tortillas in a dry skillet over medium-low heat until the exterior is browned and crispy, the filling is heated through, and the cheese has melted.",
      "Cut each quesadilla in half and serve.",
    ],
    source: "https://www.budgetbytes.com/ultimate-bbq-chicken-quesadillas/",
    youtubeId: "-HlWuVvn8v0",
  },
  {
    id: "meal-04",
    name: "Easy Chicken Stir Fry",
    mealType: "Dinner",
    estimatedTimeMinutes: 35,
    difficulty: "Medium",
    ingredients: [
      "1/3 cup soy sauce",
      "3 tbsp brown sugar",
      "2 tsp toasted sesame oil",
      "2 garlic cloves, minced",
      "2 tsp fresh ginger, grated",
      "1 1/2 tbsp cornstarch",
      "1/3 cup water",
      "1 tsp sriracha",
      "3/4 lb. broccoli, cut into florets",
      "2 carrots, sliced",
      "1 red bell pepper, sliced",
      "1 small onion, sliced",
      "2 green onions, sliced",
      "2 boneless, skinless chicken breasts, cut into 1/2-inch pieces",
      "3 tbsp cooking oil, divided",
    ],
    recipe: [
      "Whisk together the soy sauce, brown sugar, sesame oil, garlic, ginger, cornstarch, water, and sriracha in a bowl to make the stir fry sauce; set aside.",
      "Chop the broccoli, bell pepper, onion, and carrots; slice the green onions; cut the chicken into 1/2-inch pieces.",
      "Heat 2 tbsp oil in a large skillet or wok over medium-high heat and cook the chicken until browned on all sides, then transfer it to a plate.",
      "Add the remaining 1 tbsp oil with the carrots and broccoli to the skillet; cook and stir for 1 minute until the broccoli brightens.",
      "Add the bell pepper and onion; continue cooking and stirring for 1&ndash;2 minutes.",
      "Stir the sauce, return the chicken to the skillet, pour the sauce over everything, and stir until it simmers and thickens, 1&ndash;2 minutes.",
      "Remove from heat, top with green onions (and sesame seeds if you like), and serve.",
    ],
    source: "https://www.budgetbytes.com/chicken-stir-fry/",
    youtubeId: "XtBTC4XQRvo",
  },
  {
    id: "meal-05",
    name: "Best Baked Salmon",
    mealType: "Dinner",
    estimatedTimeMinutes: 20,
    difficulty: "Medium",
    ingredients: [
      "4 (6 oz) salmon fillets",
      "2 tbsp butter, melted",
      "1/2 tbsp lemon juice, plus lemon slices for garnish",
      "3 garlic cloves, minced",
      "Kosher salt and freshly ground black pepper, to taste",
      "1 tsp finely chopped parsley",
      "1 tsp finely chopped dill",
    ],
    recipe: [
      "Preheat the oven to 375&deg;F. Let the salmon sit at room temperature for 15 minutes. Combine the melted butter and lemon juice in a small bowl.",
      "Place the salmon in a baking dish and brush the butter mixture evenly over the fillets. Top with the minced garlic, salt, and pepper.",
      "Bake for 12&ndash;15 minutes, until the salmon flakes apart easily with a fork.",
      "Sprinkle with fresh parsley and dill before serving.",
    ],
    source: "https://downshiftology.com/recipes/best-baked-salmon/",
    youtubeId: "2uYoqclu6so",
  },
  {
    id: "meal-06",
    name: "3-Minute Hummus",
    mealType: "Snack",
    estimatedTimeMinutes: 3,
    difficulty: "Easy",
    ingredients: [
      "2 (15 oz) cans chickpeas, drained, liquid reserved",
      "1/3 cup reserved chickpea liquid (or more, as needed)",
      "1/2 cup tahini",
      "1/4 cup olive oil",
      "2 lemons, juiced",
      "2 garlic cloves",
      "1 tsp cumin",
      "1/2 tsp kosher salt",
    ],
    recipe: [
      "Add all the ingredients to a high-powered blender.",
      "Blend on high for 30 seconds or more (use a tamper to push everything into the blades); add more chickpea liquid if you want a softer texture.",
      "Transfer to a serving bowl and garnish with olive oil, paprika, and chopped parsley.",
    ],
    source: "https://downshiftology.com/recipes/3-minute-hummus/",
    youtubeId: "GbxnB53IExY",
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
          href="#"
          data-id="${meal["id"]}"
          class="meal-card block bg-white rounded-2xl shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <span
            class="block text-[11.5px] font-bold tracking-[0.06em] text-[#7c9d96] mb-2 uppercase"
            >${meal["mealType"]}</span
          >
          <h3
            class="block font-heading font-bold text-lg text-[#2f3e46] mb-2.5"
            >${meal["name"]}</h3
          >
          <span
            class="block font-body text-base text-[#5b6b70] leading-normal mb-1"
            >Difficulty: ${meal["difficulty"]}</span
          >
          <span
            class="block font-body text-base text-[#5b6b70] leading-normal mb-3.5"
            >Time: ${meal["estimatedTimeMinutes"]} min</span
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
  e.preventDefault();

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
    const recipeVideo = recipeDisplay.querySelector(".recipe-video");

    if (meal && recipeTitle && ingredientsList && instructionsList && recipeVideo) {
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

      recipeVideo.innerHTML = meal.youtubeId
        ? `
        <h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Watch it made</h3>
        <div class="aspect-video w-full rounded-xl overflow-hidden">
          <iframe
            class="w-full h-full"
            src="https://www.youtube.com/embed/${meal.youtubeId}"
            title="${meal.name} recipe video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>`
        : "";
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

function setupFilterDropdown(button, key, formatOption) {
  // Set is used to Remove the duplicates
  const options = [...new Set(quickMeals.map((meal) => meal[key]))];

  // Sort numerically when every option is a number (e.g. time in
  // minutes), otherwise leave them in their existing order.
  if (options.every((option) => typeof option === "number")) {
    options.sort((a, b) => a - b);
  }

  const display = formatOption || ((option) => option);

  const dropdown = document.createElement("div");
  dropdown.className =
    "absolute bg-white rounded-xl shadow-md mt-2 py-2 z-10 hidden w-full";
  dropdown.innerHTML = options
    .map(
      (option) =>
        `<div class="filter-option px-4 py-1 text-[#2f3e46] cursor-pointer hover:bg-[#faf7f2]" data-value="${option}">${display(option)}</div>`,
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
      (meal) => String(meal[key]) === chosen.dataset.value,
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
setupFilterDropdown(timeBtn, "estimatedTimeMinutes", (mins) => `${mins} min`);
setupFilterDropdown(difficultyBtn, "difficulty");
setupFilterDropdown(mealTypeBtn, "mealType");

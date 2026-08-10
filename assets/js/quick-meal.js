// Every recipe below is copied word-for-word from the recipe card on the
// same page that hosts its linked video (Downshiftology / Budget Bytes),
// so the written steps and the video are guaranteed to match exactly.
let quickMeals = [
  {
    id: "meal-01",
    name: "Overnight Oats",
    mealType: "Breakfast",
    estimatedTimeMinutes: 5,
    timeNote: "5 min prep + 2 hr chill",
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
      "Refrigerate for at least 2 hours - leave it overnight (8 hours) for the creamiest texture.",
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
  {
    id: "meal-07",
    name: "Singapore Fried Carrot Cake (Chye Tow Kway)",
    mealType: "Snack",
    estimatedTimeMinutes: 85,
    timeNote: "1 hr 25 min active + overnight chill",
    difficulty: "Hard",
    ingredients: [
      "1 1/2 cups (180g) fine rice flour",
      "1/4 cup (40g) tapioca flour",
      "2 1/2 cups concentrated chicken stock (or vegetable stock)",
      "1 heaped cup (300g) grated white radish/daikon",
      "1 tsp salt, adjusted to taste",
      "2 tsp garlic, minced (for the steamed cake)",
      "1 tbsp garlic, minced (for stir-frying)",
      "1 tbsp spring onion whites, chopped",
      "1/2 tbsp pickled radish (chai poh), rinsed and drained",
      "1 tbsp red chilli sauce",
      "1 1/2 tbsp Thai fish sauce, or more to taste",
      "1 1/2 tbsp light soy sauce",
      "3 eggs",
      "Spring onion or cilantro and red chilli, for garnish",
    ],
    recipe: [
      "The night before: mix the rice flour and tapioca flour into the cooled chicken stock until there are no lumps.",
      "Bring water to a boil in a saucepan, add the grated radish, and cook until translucent (a few minutes), then drain.",
      "Heat 1 tbsp oil in a non-stick wok, add the 2 tsp minced garlic, and once just golden, quickly stir in the rice-flour batter.",
      "Add the drained radish and stir - the batter should be quite thick, so keep cooking and stirring on low heat until it thickens.",
      "Pour into a cake tin, place on a rack in a steamer, and steam covered for 1 hour over medium-low heat until the top is set.",
      "Let the steamed cake cool, then refrigerate overnight.",
      "The next day: cut the steamed cake into medium dice, and beat the eggs with a pinch of salt and pepper.",
      "Heat oil in a wok, fry the diced cake pieces until pale gold, then push them to the side of the pan.",
      "Add the 1 tbsp garlic and spring onion whites to the space and saut&eacute;.",
      "Add the pickled radish and stir briefly, then add the chilli sauce, fish sauce, and soy sauce; stir until well mixed with the cake pieces.",
      "Pour the beaten egg over the diced pieces, then scramble and toss everything together.",
      "Garnish with chopped spring onion or cilantro and serve hot.",
    ],
    source: "https://www.recipesaresimple.com/recipe/singapore-carrot-cake/",
    youtubeId: "GtXWmXsSRsI",
  },
  {
    id: "meal-08",
    name: "Singapore Noodles",
    mealType: "Lunch",
    estimatedTimeMinutes: 25,
    difficulty: "Medium",
    ingredients: [
      "2 tbsp soy sauce",
      "2 tbsp Chinese cooking wine (or dry sherry)",
      "2 1/2 tsp curry powder",
      "1/2 tsp sugar",
      "1/2 tsp white pepper",
      "100g (3 oz) dried rice vermicelli noodles",
      "2 tbsp peanut oil, divided",
      "8&ndash;10 medium raw shrimp/prawns, shelled and deveined",
      "2 eggs, beaten",
      "1/2 medium onion, thinly sliced",
      "4 garlic cloves, minced",
      "1 tsp fresh ginger, grated",
      "1/2 lb (250g) Chinese BBQ pork (char siu), thinly sliced",
      "1 cup red capsicum/bell pepper, sliced",
      "2 tsp thinly sliced hot green pepper, optional",
    ],
    recipe: [
      "Combine the soy sauce, Chinese cooking wine, curry powder, sugar, and white pepper in a small bowl to make the sauce.",
      "Soak the rice vermicelli in a bowl of boiled water per packet instructions, then drain and set aside.",
      "Heat 1 tbsp oil in a wok over medium heat, cook the shrimp until just done (about 2 1/2&ndash;3 minutes), then remove and set aside.",
      "Add the egg to the wok and spread into a thin omelette; once set, roll it up, remove, and slice.",
      "Return the wok to medium heat with the remaining 1 tbsp oil, add the garlic, ginger, and onion, and cook for 2 minutes until the onion softens.",
      "Add the capsicum and cook for 1 minute.",
      "Add the noodles and sauce and toss, then add the egg, pork, shrimp, and chillies (if using); toss until the sauce coats everything and it's heated through, about 1&ndash;2 minutes.",
      "Serve immediately.",
    ],
    source: "https://www.recipetineats.com/singapore-noodles/",
    youtubeId: "bH1RbOGUkKs",
  },
  {
    id: "meal-09",
    name: "Char Kway Teow",
    mealType: "Dinner",
    estimatedTimeMinutes: 20,
    difficulty: "Medium",
    ingredients: [
      "500g (1 lb) fresh wide rice noodles",
      "2 tbsp lard or vegetable oil",
      "2 tbsp vegetable oil, divided",
      "10 small prawns/shrimp, shelled and deveined",
      "2 garlic cloves, finely chopped",
      "1 Chinese sausage (lup cheong), thinly sliced on the diagonal",
      "5cm (2 in) piece of fried fish cake, thinly sliced",
      "20 stems garlic chives, cut into 4cm pieces",
      "2 1/2 cups bean sprouts",
      "2 eggs, whisked",
      "5 tsp dark soy sauce",
      "4 tsp light soy sauce",
      "2 tsp oyster sauce",
      "4 tsp kecap manis (sweet soy sauce)",
    ],
    recipe: [
      "Mix the dark soy, light soy, oyster sauce, and kecap manis together to make the sauce.",
      "Warm the packet of noodles in the microwave for 1 1/2&ndash;2 minutes until pliable, then carefully separate them - don't handle them while cold, they'll break.",
      "Heat 1 tbsp oil in a large non-stick skillet over high heat; cook the shrimp for about 1 1/2 minutes until just done, then remove to a bowl.",
      "Add the Chinese sausage and fish cake and cook for 1 minute until the sausage caramelises, then add to the bowl.",
      "Add another 1 tbsp oil, then the egg; cook into a thick omelette, chop it up roughly, and add to the bowl.",
      "Add the bean sprouts and cook for about 1 minute until just starting to wilt, then add to the bowl.",
      "Add the lard; once it starts to smoke, add the garlic, then immediately the noodles - gently fold 4 times to coat with oil.",
      "Tip the other ingredients back in along with the garlic chives, fold gently twice, then pour over the sauce.",
      "Gently toss 4&ndash;6 times to disperse the sauce, pausing between tosses to let the noodles caramelise a little at the edges.",
      "Remove from the heat and serve immediately.",
    ],
    source: "https://www.recipetineats.com/char-kway-teow/",
    youtubeId: "3iHctwBBeYc",
  },
  {
    id: "meal-10",
    name: "Laksa",
    mealType: "Lunch",
    estimatedTimeMinutes: 60,
    difficulty: "Hard",
    ingredients: [
      "2 cups (500ml) chicken stock/broth",
      "1 cup (250ml) water",
      "3 chicken drumsticks",
      "1 1/2 tbsp oil",
      "2 garlic cloves, minced",
      "2cm piece of ginger, finely grated",
      "1 lemongrass stalk, white part grated",
      "2 bird's eye chillies, finely chopped",
      "1/2 cup (135g) laksa paste",
      "400ml can coconut milk",
      "2 tsp fish sauce",
      "50g (1.5 oz) dried vermicelli noodles",
      "100g (3.5 oz) hokkien noodles, optional",
      "80g (2.5 oz) bean sprouts",
      "80g (2.5 oz) tofu puffs, halved",
      "Fresh coriander, lime wedges, and crispy fried shallots, to garnish",
    ],
    recipe: [
      "Simmer the chicken drumsticks in the stock and water for 25 minutes, until the meat falls off the bone and the liquid reduces by about a third.",
      "Discard the skin and bones, shred the chicken, and set the broth aside.",
      "Heat the oil in a saucepan over medium-low heat; saut&eacute; the garlic and ginger for 20 seconds, then add the lemongrass and chillies and cook for 1 minute.",
      "Add the laksa paste and cook for 2 minutes, stirring constantly, until fragrant.",
      "Add the chicken stock, coconut milk, and fish sauce. Cover and simmer for 10 minutes.",
      "Adjust the taste with lime juice and fish sauce, add the tofu puffs, then leave off the heat with the lid on for 5 minutes.",
      "Prepare the noodles per packet instructions and divide between bowls; top with the shredded chicken.",
      "Pour the broth over, top with bean sprouts and your garnishes of choice, and serve.",
    ],
    source: "https://www.recipetineats.com/laksa-soup/",
    youtubeId: "7XfvuGjaDTc",
  },
];

const mealsDiv = document.getElementById("mealDiv");
const paginationNav = document.getElementById("mealPagination");
const MEALS_PER_PAGE = 6;

let activeMeals = quickMeals;
let currentPage = 1;

function mealCardHtml(meal) {
  return `<a
          href="#"
          data-id="${meal["id"]}"
          class="meal-card flex flex-col h-full bg-white rounded-2xl shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <span
            class="block text-xs font-bold tracking-[0.06em] text-[#7c9d96] mb-2 uppercase"
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
            >Time: ${meal["timeNote"] || `${meal["estimatedTimeMinutes"]} min`}</span
          >
          <span
            class="block font-body text-sm font-semibold text-[#d97757] mt-auto"
            >Click to Select &rarr;</span
          >
        </a>
        `;
}

// Also re-renders the pagination bar, since the visible page count
// depends on the current slice of activeMeals.
function renderPage() {
  const start = (currentPage - 1) * MEALS_PER_PAGE;
  const pageMeals = activeMeals.slice(start, start + MEALS_PER_PAGE);

  mealsDiv.innerHTML = pageMeals.length
    ? pageMeals.map(mealCardHtml).join("")
    : `<p class="col-span-full text-center font-body text-[#5b6b70] py-10">No meals match your search.</p>`;

  renderPagination();
}

// Hides the pagination bar entirely when everything fits on one page.
function renderPagination() {
  if (!paginationNav) return;

  const totalPages = Math.ceil(activeMeals.length / MEALS_PER_PAGE);
  if (totalPages <= 1) {
    paginationNav.innerHTML = "";
    return;
  }

  const pageBtn = (label, page, { disabled = false, active = false } = {}) => `
    <button
      type="button"
      data-page="${page}"
      ${disabled ? "disabled" : ""}
      class="pagination-btn min-w-9 h-9 px-3 rounded-full font-body text-sm font-semibold transition-colors ${
        active
          ? "bg-[#52796f] text-white"
          : "bg-white text-[#2f3e46] border-2 border-[#f0ece3] hover:border-[#7c9d96] hover:text-[#52796f] disabled:opacity-40 disabled:hover:border-[#f0ece3] disabled:hover:text-[#2f3e46]"
      }"
    >${label}</button>`;

  let html = pageBtn("&larr;", currentPage - 1, {
    disabled: currentPage === 1,
  });
  for (let p = 1; p <= totalPages; p++) {
    html += pageBtn(String(p), p, { active: p === currentPage });
  }
  html += pageBtn("&rarr;", currentPage + 1, {
    disabled: currentPage === totalPages,
  });

  paginationNav.innerHTML = html;
}

// Sets a new active dataset (from search/filter/reset) and jumps back
// to page 1, since the old page number may no longer be valid.
function renderMeals(mealsToRender) {
  activeMeals = mealsToRender;
  currentPage = 1;
  renderPage();
}

// Guards against a stale pagination click if activeMeals shrank (e.g.
// from a new search) since the button was rendered.
paginationNav?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-page]");
  if (!btn || btn.disabled) return;

  const page = Number(btn.dataset.page);
  const totalPages = Math.ceil(activeMeals.length / MEALS_PER_PAGE);
  if (page < 1 || page > totalPages) return;

  currentPage = page;
  renderPage();
  mealsDiv.scrollIntoView({ behavior: "smooth", block: "start" });
});

renderMeals(quickMeals);

const mealGrid = document.getElementById("mealDiv");
const recipeDisplay = document.getElementById("recipe-display");

// Child elements carry their own Tailwind text-color utility classes, so
// an inline override is needed to actually turn them white when active.
function setCardActive(card, active) {
  card.classList.toggle("bg-[#df936d]", active);
  card.querySelectorAll("span, h3").forEach((s) => {
    if (active) {
      s.style.color = "#fff";
    } else s.style.color = "";
  });
}

// Clicking the active card again deselects it and hides the recipe;
// clicking any other card selects it and shows that recipe instead.
mealGrid.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".meal-card");
  if (clickedCard == undefined) return;
  e.preventDefault();

  const isAlreadyActive = clickedCard.classList.contains("bg-[#df936d]");

  document.querySelectorAll(".meal-card").forEach((card) => {
    setCardActive(card, false);
  });

  if (!isAlreadyActive) {
    setCardActive(clickedCard, true);

    const meal = quickMeals.find((m) => m.id === clickedCard.dataset.id);
    const recipeTitle = recipeDisplay.querySelector(".recipe-title");
    const ingredientsList = recipeDisplay.querySelector(".ingredients-list");
    const instructionsList = recipeDisplay.querySelector(".instructions-list");
    const recipeVideo = recipeDisplay.querySelector(".recipe-video");

    if (
      meal &&
      recipeTitle &&
      ingredientsList &&
      instructionsList &&
      recipeVideo
    ) {
      recipeTitle.textContent = meal.name;

      ingredientsList.innerHTML = `
        <h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Ingredients</h3>
        <ul class="list-disc list-inside space-y-1 text-[#5b6b70] text-base">
          ${meal.ingredients.map((item) => `<li>${item}</li>`).join("")}
        </ul>`;

      instructionsList.innerHTML = `
        <h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Instructions</h3>
        <ol class="list-decimal list-inside space-y-2 text-[#5b6b70] text-base">
          ${meal.recipe.map((step) => `<li>${step}</li>`).join("")}
        </ol>`;

      recipeVideo.innerHTML = meal.youtubeId
        ? `
        <h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Watch it made</h3>
        <div class="aspect-video w-full rounded-xl overflow-hidden">
          <iframe
            class="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/${meal.youtubeId}"
            title="${meal.name} recipe video"
            frameborder="0"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>`
        : "";
    }

    recipeDisplay.classList.remove("hidden");
    // Deferred a tick so the browser registers the 'hidden' class removal
    // before the opacity transition starts, otherwise it wouldn't animate.
    setTimeout(() => {
      recipeDisplay.classList.remove("opacity-0");
      recipeDisplay.classList.add("opacity-100");
    }, 10);

    recipeDisplay.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    recipeDisplay.classList.remove("opacity-100");
    recipeDisplay.classList.add("opacity-0");

    setTimeout(() => {
      recipeDisplay.classList.add("hidden");
    }, 500); // matches the 'duration-500' transition class above
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

// Relies on filter-btn / reset-btn appearing in this exact order in the
// markup: Time, Difficulty, Meal Type, Reset.
const [timeBtn, difficultyBtn, mealTypeBtn, reset] = document.querySelectorAll(
  ".functions-group .filter-btn, .functions-group .reset-btn",
);

// Tracks every dropdown created by setupFilterDropdown so opening one can
// close the others, and an outside click can close whichever is open.
const allDropdowns = [];

function closeAllDropdowns() {
  allDropdowns.forEach(({ button, dropdown }) => {
    dropdown.classList.add("hidden");
    button.classList.remove("is-open");
  });
}

/**
 * Wires a filter button to a dropdown listing every distinct value of
 * `key` found across quickMeals; picking one re-filters the meal list.
 * @param {HTMLElement} button - the filter trigger button.
 * @param {string} key - property on each meal object to filter by.
 * @param {(value: any) => string} [formatOption] - optional formatter for
 *   how each option is displayed; defaults to the raw value.
 */
function setupFilterDropdown(button, key, formatOption) {
  const defaultLabel = button.querySelector(".filter-btn-label").textContent;

  const options = [...new Set(quickMeals.map((meal) => meal[key]))];

  // Sort numerically when every option is a number (e.g. time in
  // minutes), otherwise leave them in their existing order.
  if (options.every((option) => typeof option === "number")) {
    options.sort((a, b) => a - b);
  }

  const display = formatOption || ((option) => option);

  const dropdown = document.createElement("div");
  dropdown.className =
    "absolute left-0 min-w-full bg-white rounded-xl shadow-md mt-2 py-2 z-10 hidden";
  dropdown.innerHTML = options
    .map(
      (option) =>
        `<div class="filter-option px-4 py-1.5 text-sm text-[#2f3e46] whitespace-nowrap cursor-pointer hover:bg-[#faf7f2]" data-value="${option}">${display(option)}</div>`,
    )
    .join("");

  button.parentElement.style.position = "relative";
  button.parentElement.appendChild(dropdown);
  allDropdowns.push({ button, dropdown });

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !dropdown.classList.contains("hidden");
    closeAllDropdowns();
    if (!isOpen) {
      dropdown.classList.remove("hidden");
      button.classList.add("is-open");
    }
  });

  dropdown.addEventListener("click", (e) => {
    const chosen = e.target.closest(".filter-option");
    if (!chosen) return;

    button.querySelector(".filter-btn-label").textContent =
      `${defaultLabel}: ${chosen.textContent}`;

    const filteredMeals = quickMeals.filter(
      (meal) => String(meal[key]) === chosen.dataset.value,
    );
    renderMeals(filteredMeals);
    closeAllDropdowns();
  });
}

// Button clicks call stopPropagation so opening a dropdown doesn't
// immediately close it here; every other click bubbles up and closes
// whichever dropdown is currently open.
document.addEventListener("click", closeAllDropdowns);

reset.addEventListener("click", () => {
  closeAllDropdowns();
  document.querySelectorAll(".filter-btn-label").forEach((label) => {
    label.textContent = label.textContent.split(":")[0];
  });
  renderMeals(quickMeals);
});

setupFilterDropdown(timeBtn, "estimatedTimeMinutes", (mins) => `${mins} min`);
setupFilterDropdown(difficultyBtn, "difficulty");
setupFilterDropdown(mealTypeBtn, "mealType");

function extractYouTubeId(urlOrId) {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();
  // Regex to extract 11-character YouTube video ID from various URL formats
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
  );
  return match ? match[1] : trimmed.length === 11 ? trimmed : "";
}

const addRecipeForm = document.getElementById("add-recipe-form");

if (addRecipeForm) {
  addRecipeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const rawIngredients = document.getElementById("recipe-ingredients").value;
    const ingredientsArray = rawIngredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    // Split on '.' rather than newlines, matching the textarea's
    // "Separated by periods" placeholder guidance.
    const rawInstructions = document.getElementById(
      "recipe-instructions",
    ).value;
    const recipeArray = rawInstructions
      .split(".")
      .map((step) => step.trim())
      .filter((step) => step.length > 0);

    const rawYoutube = document.getElementById("youtube-link").value;
    const youtubeId = extractYouTubeId(rawYoutube);

    const newMeal = {
      id: `meal-${Date.now()}`,
      name: document.getElementById("recipe-name").value.trim(),
      mealType: document.getElementById("meal-type").value,
      estimatedTimeMinutes: Number(
        document.getElementById("estimated-time").value,
      ),
      timeNote: document.getElementById("time-note").value.trim() || undefined,
      difficulty: document.getElementById("recipe-difficulty").value,
      ingredients: ingredientsArray,
      recipe: recipeArray,
      source: document.getElementById("recipe-source").value.trim() || "",
      youtubeId: youtubeId,
    };

    quickMeals.unshift(newMeal);
    renderMeals(quickMeals);

    addRecipeForm.reset();
  });
}

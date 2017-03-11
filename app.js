
//!state
const URL = 'https://api.edamam.com/search?callback=?';
let state = {
    query: '',
    searchObj: {
        q:'',
        app_id: '6da7e93e',
        app_key: '8e6eaad81cc090bc90cb3479ffff21f6'
    }
}

//load page with cookies
const cookieSearch = () => {
    const searchObj = {
        q:'cookie',
        app_id: '6da7e93e',
        app_key: '8e6eaad81cc090bc90cb3479ffff21f6'
    };
    $.getJSON(URL, searchObj, renderData);
};

//new search
const newSearch = query => {
    state.searchObj.q = state.query;
    $.getJSON(URL, state.searchObj, renderData);
};
//add or deletes property from search obj; vegetarian etc.
const changeHealthState = healthyDiet => {
    state.searchObj.health = healthyDiet;

    if (healthyDiet === "none") {
        delete state.searchObj.health;
    }

    $("#diet-need").text(healthyDiet);
}

//!rendering
//nutrition facts
const generateNutrient = (servings, nutrient) => {
    return (nutrient
        ? Math.round(nutrient.quantity / servings)
        : "NA");
}
const generateNutrition = result => {
    let servings = result.recipe.yield;
    let calories = result.recipe.calories / servings;
    let nutrients = result.recipe.totalNutrients;

    const gen = generateNutrient.bind(null, servings);

    let totalFat = gen(nutrients.FAT);
    let saturatedFat = gen(nutrients.FASAT);
    let cholesterol = gen(nutrients.CHOLE);
    let sodium = gen(nutrients.NA);
    let potassium = gen(nutrients.K);
    let totalCarbs = gen(nutrients.CHOCDF);
    let sugars = gen(nutrients.SUGAR);
    let protein = gen(nutrients.PROCNT);

    let resultsHtml =
        `<div class="nutrition-info hidden">` +
            `<table>` +
                `<tr><th>Nutrition Facts</th></tr>` +
                `<tr><th>Amount per Serving</th></tr>` +
                `<tr><td>Calories.....${Math.round(calories)}</td></tr>` +
                `<tr><td>Total Fat... ${totalFat}</td></tr>` +
                `<tr><td>Saturated Fat...${saturatedFat}</td></tr>` +
                `<tr><td>Cholesterol...${cholesterol}</td></tr>` +
                `<tr><td>Sodium...${sodium}</td></tr>` +
                `<tr><td>Potassium...${potassium}</td></tr>` +
                `<tr><td>Total Carbohydrate...${totalCarbs}</td></tr>` +
                `<tr><td>Sugars... ${sugars}</td></tr>` +
                `<tr><td>Protein... ${protein}</td></tr>` +
            `</table>` +
        `</div>`;

    return resultsHtml;
}
//ingredients
const generateIngredientsList = result => {
    return result.recipe.ingredientLines.map(result => `<dt>${result}</dt>`).join("");
}
//recipe && nutrition buttons
const generateButtons = result => {
    let link = result.recipe.url;

    return (
        `<div class="btn-group">` +
            `<button type="button" id="recipebtn" value="${link}" class="btn btn-primary">Recipe</button>` +
            `<button type="button" id="nutritionbtn" class="btn btn-primary">Nutrition</button>` +
        `</div>`
    );
}
//renders page
const renderData = data => {
    let resultsHtml = data.hits.map(result => {
        let img = result.recipe.image;
        return (`<div class=result><img class="resultImage"src="${img}"></br>` +
        `<div class="list hidden"><h3>${result.recipe.label}</h3>` +
        `<h4>serves ${result.recipe.yield}</h4>` +
        `<dl>${generateIngredientsList(result)}</dl>` +
        `${generateNutrition(result)}` +
        `${generateButtons(result)}</div></div>`);
    });
    $("#results").html(resultsHtml);
};
//on page load
$(function() {
    cookieSearch();

//!event listeners
//footerBtn
$(".footerBtn").on('click', e => {
  e.preventDefault();
  $('#results').animatescroll({scrollSpeed:3000,easing:'easeInOutBack'});
});

//logoText
$(".logoText").on('click', e => {
  e.preventDefault();
  $('.dietaryNeedsH2').animatescroll({scrollSpeed:2000,easing:'easeInOutBack'});
})

//submit query
$("form").submit(e => {
    e.preventDefault();
    state.query = $("#searchRecipes").val();
    newSearch(state.query);
    $('#results').animatescroll({scrollSpeed:2000,easing:'easeInOutBack'});
});
//toggle ingredient view w/recipe && nutrional info button
$("header").on("click", ".result", e => {
    e.stopPropagation();
    $(e.currentTarget).children(".list").toggleClass("hidden").toggleClass("float");
})
//recipe button
$("#results").on("click", "#recipebtn", e => {
    e.stopPropagation();

    let siteURL = $(e.currentTarget).val();
    window.open(siteURL);
});
//nutritional data toggle
$("#results").on("click", "#nutritionbtn", e => {
    e.stopPropagation();
    $(e.currentTarget).closest(".list").children(".nutrition-info").toggleClass("hidden");
    $(e.currentTarget).closest(".list").children("dl").toggleClass("hidden");
    let currentValue = $(e.currentTarget).text();
    let newText = currentValue === "Nutrition" ? "Ingredients" : "Nutrition";
    $(e.currentTarget).text(newText);
})
//v, vg, gf ect
$("#health-diet").submit(e => {
    e.preventDefault();
    e.stopPropagation();
    let healthyDiet = ($("#health-diet input:checked").val());
    changeHealthState(healthyDiet);
    newSearch(state.query);
})
});

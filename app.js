$(function() {

//!state
var URL = 'http://crossorigin.me/https://api.edamam.com/search';

var state = {
	query: '',
	searchObj: {
		q:'',
		app_id: '6da7e93e',
		app_key: '8e6eaad81cc090bc90cb3479ffff21f6'
	}
}


//new search	
function newSearch(query) {
	state.searchObj.q = state.query; 
	$.getJSON(URL, state.searchObj, renderData);
};

//add or deletes property from search obj vg v gf ect.
function changeHealthState(healthyDiet) {
    if (healthyDiet === "none" && state.searchObj.hasOwnProperty("health")) {
        delete state.searchObj["health"];
    } else if (healthyDiet !== "none") {
        state.searchObj["health"] = healthyDiet;
    };
    $("#diet-need").text(healthyDiet);
}


//!rendering

//nutrition facts
function generateNutrition(result) {
	console.log(result.recipe.totalNutrients.CHOLE.quantity);
	var servings = result.recipe.yield;
	var calories = result.recipe.calories / servings;
	var totalFat = result.recipe.totalNutrients.FAT.quantity / servings;
	var saturatedFat = result.recipe.totalNutrients.FASAT.quantity / servings;
	var cholesterol = result.recipe.totalNutrients.CHOLE.quantity / servings;
	console.log(cholesterol);
	var sodium = result.recipe.totalNutrients.NA.quantity / servings;
	var potassium = result.recipe.totalNutrients.K.quantity / servings;
	var totalCarbs = result.recipe.totalNutrients.CHOCDF.quantity / servings;
	var sugars = result.recipe.totalNutrients.SUGAR.quantity / servings;
	var protein = result.recipe.totalNutrients.PROCNT.quantity / servings;
	


	var resultsHtml = '';
		resultsHtml += '' +
		'<div class="nutrition-info hidden">' +
			'<table>' +
				'<tr><th>Nutrition Facts</th></tr>' +
				'<tr><th>Amount per Serving</th></tr>' +
				'<tr><td>Calories.....' + Math.round(calories) + '</td></tr>' +
				'<tr><td>% Daily Value*</td></tr>' + 
				'<tr><td>Total Fat... ' + Math.round(totalFat) + '</td><td>...%</td></tr>' + 
				'<tr><td>Saturated Fat...' + Math.round(saturatedFat) + '</td><td>...%</td></tr>' + 
				'<tr><td>Cholesterol...' + Math.round(cholesterol) +'</td><td>...%</td></tr>' + 
				'<tr><td>Sodium...' + Math.round(sodium) + ' </td><td>...%</td></tr>' + 
				'<tr><td>Potassium...' + Math.round(potassium) + '</td><td>...%</td></tr>' +
				'<tr><td>Total Carbohydrate...' + Math.round(totalCarbs) + '</td><td>...%</td></tr>' +
				'<tr><td>Sugars... ' + Math.round(sugars) + '</td><td>...%</td></tr>' +
				'<tr><td>Protein... ' + Math.round(protein) + ' </td><td>...</td></tr>' +
				'<tr><td>*Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.</td></tr>' +
			'</table>' +
		'</div>';
	console.log(resultsHtml);
	return resultsHtml;
	
}

//ingredients 
function generateIngredientsList(result) {
	var resultsHtml = '';
	result.recipe.ingredientLines.forEach(function(result) {
		resultsHtml += '<dt>' + result + '</dt>';
	})
	return resultsHtml;
}

//recipe && nutrition buttons
function generateButtons(result) {
	var link = result.recipe.url;
	var resultsHtml = '';
	resultsHtml += '<div class="btn-group">' + 
	'<button type="button" id="recipebtn" value="' + link + '" class="btn btn-primary">' + "Recipe" + '</button>' +
	'<button type="button" id="nutritionbtn" class="btn btn-primary">' + "Nutrition" + '</button>' +
	'</div>';
	return resultsHtml;
}

//renders page
function renderData(data) {
	var resultsHtml = ''; 
	data.hits.forEach(function(result) {
		var img = result.recipe.image;
		var recipeHtml = '<div class=result><img src="' + img + 
		'">' + '</br>' + '<div class="list hidden"><h3>' + 
		result.recipe.label + '</h3>' + '<h4>' + 'serves ' + result.recipe.yield + '</h4><dl>' + 
		generateIngredientsList(result) + '</dl>' + generateNutrition(result) +
		generateButtons(result) + '</div></div>';
		resultsHtml += recipeHtml;
	})
	$("#results").html(resultsHtml);
};


//!event listeners 

//submit query 
$("form").submit(function(e) {
	e.preventDefault();
	state.query = $("#searchRecipes").val();
	newSearch(state.query);
})

//toggle ingredient view w/recipe && nutrional info button
$("#results").on("click", ".result", function(e) {
	e.stopPropagation();
	$(this).children(".list").toggleClass("hidden").toggleClass("float");
})

//recipe button
$("#results").on("click", "#recipebtn", function(e) {
	e.stopPropagation();
	var siteURL = $(this).val();
	window.open(siteURL);
})

//nutritional data toggle
$("#results").on("click", "#nutritionbtn", function(e) {
	e.stopPropagation();
	alert('works');

})

//v, vg, gf ect
$("#health-diet").submit(function(e) {
    e.preventDefault();
    e.stopPropagation();
    var healthyDiet = ($("#health-diet input:checked").val());
    changeHealthState(healthyDiet);
    newSearch(state.query);
})



});

$(function() {

//state
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

function generateIngredientsList(result) {
	var resultsHtml = '';
	result.recipe.ingredientLines.forEach(function(result) {
		resultsHtml += '<dt>' + result + '</dt>';
	})
	return resultsHtml;
}

function generateButtons(result) {
	var link = result.recipe.url;
	var resultsHtml = '';
	resultsHtml += '<div class="btn-group">' + 
	'<button type="button" id="recipebtn" value="' + link + '" class="btn btn-primary">' + "Recipe" + '</button>' +
	'<button type="button" id="nutritionbtn" class="btn btn-primary">' + "Nutrition" + '</button>' +
	'</div>';
	return resultsHtml;
};

//html render
function renderData(data) {
	var resultsHtml = ''; 
	data.hits.forEach(function(result) {
		var img = result.recipe.image;
		var recipeHtml = '<div class=result><img src="' + img + 
		'">' + '</br>' + '<div class="list hidden"><dl>' + 
		generateIngredientsList(result) + '</dl>' + 
		generateButtons(result) + '</div></div>';
		resultsHtml += recipeHtml;
	})
	$("#results").html(resultsHtml);
};


//event listeners 
$("form").submit(function(e) {
	e.preventDefault();
	state.query = $("#searchRecipes").val();
	newSearch(state.query);
})


$("#results").on("click", ".result", function(e) {
	e.stopPropagation();
	$(this).children(".list").toggleClass("hidden").toggleClass("float");
})

$("#results").on("click", "#recipebtn", function(event) {
	event.stopPropagation();
	var siteURL = $(this).val();
	window.open(siteURL);
})

});


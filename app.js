$(function() {

//state
var state = {
	url: 'http://crossorigin.me/https://api.edamam.com/search',
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
		$.getJSON(state.url, state.searchObj, renderData);
	};

	
//html render
	function renderData(data) {
		var resultsHtml = ''; 
		data.hits.forEach(function(result) {
			var img = result.recipe.image;
			var recipeHtml = '<div class=result><img src="' + img + 
			'">' + '</br>' + '<div class="list hidden"><dl>' + renderIngredientsList(result) + '</dl>' + renderButtons(result) + '</div></div>';
			resultsHtml += recipeHtml;
		})
		$("#results").html(resultsHtml);
	};

	function renderIngredientsList(result) {
		var resultsHtml = '';
		result.recipe.ingredientLines.forEach(function(result) {
			resultsHtml += '<dt>' + result + '</dt>';

		})
		return resultsHtml;
	}

	function renderButtons(result) {
		var link = result.recipe.url;
		var resultsHtml = '';
			resultsHtml += '<div class="btn-group">' + 
							'<button type="button" id="recipebtn" value="' + link + '" class="btn btn-primary">' + "Recipe" + '</button>' +
							'<button type="button" id="nutritionbtn" class="btn btn-primary">' + "Nutrition" + '</button>' +
						  '</div>';
		return resultsHtml;

	};

//event listeners 
$("form").submit(function(e) {
	e.preventDefault();
	state.query = $("#searchRecipes").val();
	newSearch(state.query);
})


$("#results").on("click", ".result", function(e) {
	e.stopPropagation();
	$(this).children(".list").toggleClass("hidden");
	$(this).children(".list").toggleClass("float");
})

$("#results").on("click", "#recipebtn", function(event) {
	event.stopPropagation();
	var siteURL = $(this).val();
	window.open(siteURL);
})

});


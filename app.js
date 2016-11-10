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

$(function() {
	function newSearch(query) {
		state.searchObj.q = state.query; 
		$.getJSON(state.url, state.searchObj, renderData);
	};

	function renderData(data) {
		var resultsHtml = ''; 
		data.hits.forEach(function(result) {
			var img = result.recipe.image;
			var link = result.recipe.url;
			var recipeHtml = '<div class=result><img src="' + img + 
			'"><a href="' + link + '"></a>' +'</br>' + '<dl class="list hidden">' + renderIngredientsList(result) + '</dl></div>';
			resultsHtml += recipeHtml;
		})
		$("#results").html(resultsHtml);
	};

	function renderIngredientsList(result) {
		var resultsHtml = '';
		console.log(result.recipe);
		result.recipe.ingredientLines.forEach(function(result) {
			resultsHtml += '<dt>' + result + '</dt>';

		})
		console.log(resultsHtml);
		return resultsHtml;
	}


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

});


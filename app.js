//state
var state = {
	url: 'http://crossorigin.me/https://api.edamam.com/search',
	query: '',
	results: {},
	searchObj: {
		q:'',
		app_id: '6da7e93e',
		app_key: '8e6eaad81cc090bc90cb3479ffff21f6'
	}
}

function getHits() {
	return state.results;
};

function storeResults(data) {
	state.results = data.hits;
}

$(function() {
	function newSearch(query) {
		state.searchObj.q = state.query; 
		$.getJSON(state.url, state.searchObj, storeResults);
	};

	function renderData() {
		console.log(state.results);
		var resultsHtml = ''; 
		state.results.forEach(function(result) {
			var img = result.recipe.image;
			var link = result.recipe.url;
			var recipeHtml = '<a href="' + link + '"><img src="' + img + 
			'"></a>'+'</br>' + '<dl>' + renderIngredientsList(result) + '</dl>';
			resultsHtml += recipeHtml;
		})
		$("#results").html(resultsHtml);
	};

	function renderIngredientsList(result) {
		console.log(result);
		var resultsHtml = '';
		result.recipe.ingredientsLines.forEach(function(result) {
			resultsHTML += '<dt>' + result.recipe.ingredientsLines + '</dt>';

		})
		return resultsHtml;
	}


$("form").submit(function(e) {
	e.preventDefault();
	state.query = $("#searchRecipes").val();
	newSearch(state.query);
	renderData();
})


});


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

function storeResults(data) {
	state.results = data;
}

$(function() {
	function newSearch(query) {
		state.searchObj.q = state.query; 
		$.getJSON(state.url, state.searchObj, storeResults);
	};

	function renderData() {
		var resultsHtml = ''; 
		state.results.hits.forEach(function(result) {
			var img = result.recipe.image;
			var link = result.recipe.url;
			var recipeHtml = '<a href="' + link + '"><img src="' + img + 
			'"></a>';
			resultsHtml += recipeHtml;
		})
		$("#results").html(resultsHtml);
	};

$("form").submit(function(e) {
	e.preventDefault();
	state.query = $("#searchRecipes").val();
	newSearch(state.query);
})


});


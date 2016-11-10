var url = 'http://crossorigin.me/https://api.edamam.com/search';

var searchObj = {
	q:'',
	app_id: '6da7e93e',
	app_key: '8e6eaad81cc090bc90cb3479ffff21f6'

}

$(function() {
	function newSearch(query) {
		searchObj.q = query; 
		return $.getJSON(url, searchObj, function(data) {
			console.log('works');
		})
	};
	newSearch('cookies');
});


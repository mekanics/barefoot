
$(function() {
	return $('a').on('click', function(e) {
		console.log('hit the backbone.client listener');
		e.preventDefault();
		return Backbone.history.navigate($(e.target).attr('href'), true);
	});
});

module.exports = function(){};
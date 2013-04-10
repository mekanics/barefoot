var Backbone = require('backbone')
	, fs = require('fs')
	, _ = require('underscore')
	, cheerio = require('cheerio');

function preInitialize(options) {
	this.app = options.app;
}

function route(route, name) {
	var self = this;
	
	return this.app.get(route, function(req, res) {
		var callback = self[self.routes[route]];
		self.res = res;

		return callback.apply(self, _.values(req.query));
	});
};

function render(view) {
	var layout = fs.readFileSync('./layout.html');
	$ = cheerio.load(layout);
	
	$(view.el).html(view.toHTML());
	return this.res.send($.html());
};

function listen(app) {
	this.app.listen(3030, function() {
		console.log('Express server listening on port 3030');
	});
};


module.exports = {
	preInitialize: preInitialize
	, route: route
	, render: render
	, listen: listen
};
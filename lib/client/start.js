/** Mixin: Barefoot.Start.Client
 * This start mixin supplies a client specific start function to get the
 * application up and running in the browser.
 */
var Backbone = require('backbone')
	, _ = require('underscore');

/** Function: start
 * Ensures that Backbone is available globally on the client. It further starts
 * up the Backbone.history.
 *
 * If the backend serialized a <Barefoot.DataStore> into the DOM, the particular
 * global function is called and the result injected into the clients own
 * <DataStore>. For the serialization code see <Barefoot.Router.Server.render>.
 *
 * Finally an instance of the passed Router object is created. The startOptions
 * object is used to create the Router.
 *
 * Parameters:
 *     (Barefoot.Router) Router - A <Barefoot.Router> object. Important: This is
 *                                is not an instance of the router, it is the 
 *                                "plain" object which can be used for running
 *                                "new Router(...)".
 *     (Object) startOptions - This object literal is passed to the router when
 *                             initalizing it.
 */
function start(Router, APIAdapter, startOptions) {
	/* global $,window */
	$(function() {
		// Ensure that Backbone is globally available when running on the
		// client. Otherwise, the history singleton would no be available.
		global.Backbone = Backbone;

		Backbone.history.start({
			pushState: true
			, silent: true
		});

		if(!_.isUndefined(window.deserializeDataStore) &&
			_.has(startOptions, 'dataStore')) {
			var deserializedDataStore = window.deserializeDataStore();
			startOptions.dataStore.parse(deserializedDataStore);
		}

		var concreteClientRouter = new Router(startOptions);
		concreteClientRouter.start();
	});

}

module.exports = start;
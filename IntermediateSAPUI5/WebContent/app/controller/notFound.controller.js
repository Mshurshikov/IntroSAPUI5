sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	return Controller.extend("my.app.controller.notFound", {
		onLinkPressed: function() {
			sap.ui.core.UIComponent.getRouterFor(this).navTo("firstView");
		}
	});
});
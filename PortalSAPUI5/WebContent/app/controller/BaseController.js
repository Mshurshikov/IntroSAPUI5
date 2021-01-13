sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	
	return Controller.extend("my.app.controller.BaseController", {
		getRouter:function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}
	});
});
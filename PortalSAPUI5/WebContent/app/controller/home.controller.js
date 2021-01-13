sap.ui.define([
	"my/app/controller/BaseController"
], function(Controller) {
	"use strict";
	return Controller.extend("my.app.controller.home", {
		onInit: function() {
			
		},
		
		onTilePressed: function(oEvent) {
			this.getRouter().navTo(oEvent.getSource().data("target"));
		}
	});
});
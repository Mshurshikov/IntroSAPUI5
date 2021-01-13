sap.ui.define([
	"my/app/controller/BaseController"
], function(Controller) {
	"use strict";
	return Controller.extend("my.app.controller.leave", {
		onInit: function() {
			
		},
		
		onBackPressed: function() {
			this.getRouter().navTo("home");
		}
	});
});
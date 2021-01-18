sap.ui.define([
	"my/app/controller/BaseController",
	"sap/m/MessageBox"
], function(Controller, MessageBox) {
	"use strict";
	return Controller.extend("my.app.controller.root", {
		onInit: function() {
			/* 
			 * Username is not known, read first entry from Model	
			 */
			this.getModel("portal").read("/UserSet", {
				success: function(oEvent) {
					if(!oEvent.results.length) {return;}
					
					var sUsername = oEvent.results[0].Username;
					var oUserHeadItem = this.getView().byId("UserHeadItem");
					
					oUserHeadItem.bindProperty("username", {
						parts: [
							"portal>/UserSet('" + sUsername + "')/Firstname",
							"portal>/UserSet('" + sUsername + "')/Lastname"
						],
						formatter: function(sFirst, sLast) {
							sFirst = sFirst || "";
							sLast = sLast || "";
							return sFirst + " " + sLast;
						}
					});
				}.bind(this),
				error: function() {
					MessageBox.error(
						this.getText("message.read.user.error"),
						{ title: this.getText("message.error")}
					);
				}.bind(this)
			});
		}
	});
});
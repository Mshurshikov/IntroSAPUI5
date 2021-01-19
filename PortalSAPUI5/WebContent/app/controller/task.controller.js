sap.ui.define([
	"my/app/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
	"use strict";
	return Controller.extend("my.app.controller.task", {
		onInit: function() {
			
		},
		
		onBackPressed: function() {
			this.getRouter().navTo("home");
		},
		
		onDoneChanged: function(oEvent) {
			var sTaskId = oEvent.getSource().data().TaskID,
			sUsername = oEvent.getSource().data().Username;
			
			this.getModel("portal").update("/TaskSet(TaskID=guid'" + sTaskId + "',Username='" + sUsername + "')",
					{Done: true},
					{
						success: function() {
							MessageToast.show(this.getText("message.update.success"))
						}.bind(this),
						
						error: function() {
							oControl.setEnabled(true);
							oControl.setSelected(false);
							MessageBox.error(this.getText("message.update.error"), {
								title: this.getText("message.error")
							});
						}.bind(this)
					});
			oEvent.getSource().setEnabled(false);
		},
		
		onNewPressed: function() {
			
		}
	});
});
sap.ui.define([
	"my/app/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, MessageBox, JSONModel) {
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
							this.getModel("portal").refresh();
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
			if(!this._oNewDialog) {
				this._oNewDialog = sap.ui.xmlfragment("my.app.view.newDialog", this);
				this._oNewModel = new JSONModel();
				this._oNewDialog.setModel(this._oNewModel, "task");
				
				this._oNewDialog.attachBeforeOpen(function() {
					this._oNewModel.setData({});
				}, this);
			}
			this.getView().addDependent(this._oNewDialog);
			this._oNewDialog.open();
		},
		
		onNewCancelled: function() {
			this._oNewDialog.close();
		},
		
		onNewSaved: function(oEvent) {
			var oModel = this.getModel("portal"),
			oData = this._oNewModel.getData();
			
			oModel.create("/TaskSet", oData, {
				success: function() {
					MessageToast.show(this.getText("message.create.success"))
					this.getModel("portal").refresh();
				}.bind(this),
				error: function() {
					MessageBox.error(this.getText("message.create.error"), {
						title: this.getText("message.error")
					})
				}.bind(this)
			});
			this._oNewDialog.close();
		}
	});
});
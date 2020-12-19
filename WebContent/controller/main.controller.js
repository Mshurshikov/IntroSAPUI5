sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("controller.main", {
		onInit: function() {
			//JSON Model from File
			/*			
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("model/week.json", null, false); //URL, Parameters, Asynchron
			this.getView().setModel(oModel);
			*/
			//Json Model on-the-fly
			var oData = {
				value: ""
			};
			
			var oDataModel = new sap.ui.model.json.JSONModel(oData);
			
			oDataModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay); //Binding Mode One way --> Change will not be saved in the model
			this.getView().setModel(oDataModel);
			
			var mode = this.getView().getModel().getDefaultBindingMode();
			if (mode === sap.ui.model.BindingMode.OneWay) {
				this.getView().byId("BindMode").setText("One-Way");
			} else {
				this.getView().byId("BindMode").setText("Two-Way");
			}
		},
		
		onButtonPressed: function(oEvent) {
			MessageToast.show("Button pressed");

			//Button Instance
			oEvent.getSource().setText("Enough");
			oEvent.getSource().setEnabled(false);
			
			//Text-Control from View
			var oText = this.getView().byId("output");
			oText.setText("Thank you");
			
			//Access by Absolute ID -->  undefined
			/*
			oText = sap.ui.getCore().byId("output");
			alert(oText); */
			
			//Access by Absolute ID --> works
			/*
			oText = sap.ui.getCore().byId(this.getView().createId("output"));
			alert(oText.getId()); */
		}
	});
});
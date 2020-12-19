sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("controller.main", {
		onInit: function() {
			debugger;
			
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("model/week.json", null, false); //URL, Parameters, Asynchron
			
			this.getView().setModel(oModel);
			
			var oData = {
				value: ""
			};
			
			var oDataModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(oDataModel);
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
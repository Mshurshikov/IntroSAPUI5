sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";
	return Controller.extend("app.controller.main", {
		onInit: function() {
			// Input type validation
			this.getView().setModel(
				new JSONModel({
					price: ""
				})
			);
			
			var oController = this;
			
			this.getView().attachValidationError(function(oEvent) {
				oController._setToErrorState(oEvent);
			});
			this.getView().attachParseError(function(oEvent) {
				oController._setToErrorState(oEvent);
			});
			this.getView().attachValidationSuccess(function(oEvent) {
				oController._setToNoneState(oEvent);
			}); 
		},
		
		_setToErrorState: function(oEvent) {
			var oControl = oEvent.getParameter("element");
			if (oControl && oControl.setValueState) {
				oControl.setValueState(sap.ui.core.ValueState.Error);
				oControl.setValueStateText(oEvent.getParameter("message"));
			}
		},
		
		_setToNoneState: function(oEvent) {
			var oControl = oEvent.getParameter("element");
			if (oControl && oControl.setValueState) {
				oControl.setValueState(sap.ui.core.ValueState.None);
				//oControl.setValueStateText("");
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("Right input");
			}
		},
		
		myPasswordType: sap.ui.model.SimpleType.extend("Password", {
			formatValue: function(oValue) {
				return oValue;
			},
			
			parseValue: function(oValue) {
				return oValue;
			},
			
			validateValue: function(oValue) {
				console.log(oValue);
				if(!/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/.test(oValue)) {
					throw new sap.ui.model.ValidateException("Password: 8-16 characters and numbers");
				} else {	
					return oValue;
				}
			}
		})
	});	
});
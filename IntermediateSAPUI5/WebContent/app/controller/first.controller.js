sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function(Controller, UIComponent, JSONModel) {
	"use strict";
	return Controller.extend("my.app.controller.first", {
		onInit: function() {
			// Input type validation
			this.getView().byId("sapTypes").setModel(
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
			
			this.getView().byId("fragmentGrid").setModel( 
				new JSONModel("model/personalData.json")
			);
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
				oControl.setValueStateText("");
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("Right input");
			}
		},
		
		onSlide: function(oEvent) {
			if(oEvent.getParameter("value") == "100") {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("secondView"); 						//route name
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
		}),
		
		onSelectWeekDay: function(oEvent) {
			var sPath = oEvent.getSource().getBindingContext().getPath();
			
			var aContext = sPath.split("/");
			UIComponent.getRouterFor(this).navTo("mealsView", { 		//pattern "{day}/{context}/{id}"
				day: oEvent.getSource().getBindingContext().getProperty("day"),
				context: aContext[1],
				id: aContext[2]
			});
		}
	});
});
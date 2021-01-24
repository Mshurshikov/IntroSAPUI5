sap.ui.define([
	"my/app/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";
	return Controller.extend("my.app.controller.timesheet", {
		onInit: function() {
			this.getModel("portal").attachRequestCompleted(this.onRequestCompleted, this);
			this._createChartModel();
			this._configureChart();
		},
		
		onExit: function() {
			this.getModel("portal").detachRequestCompleted(this.onRequestCompleted, this);
		},
		
		//Event section
		onBackPressed: function() {
			this.getRouter().navTo("home");
		},
		
		onNewPressed: function() {
			
		},
		
		onNewCancelled: function() {
			this._oNewDialog.close();
		},
		
		onNewSaved: function(oEvent) {
			
		},
		
		onTimeTypeChanged: function(oEvent) {
			
		},
		
		onProjectChanged: function(oEvent) {
			
		},
		
		onRequestCompleted: function(oEvent) {
			
		},
		
		//Private section
		_createChartModel: function() {
			this._oChartModel = new JSONModel();
			this.getView().setModel(this._oChartModel, "chart");
		},
		
		_configureChart: function() {
			
		}
	});
});
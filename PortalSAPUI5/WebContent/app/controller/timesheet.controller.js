sap.ui.define([
	"my/app/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/ui/core/format/DateFormat"
], function(Controller, JSONModel, FlattenedDataset, DateFormat) {
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
			if(	oEvent.getParameter("url").indexOf("TimesheetSet") === -1 || 
				oEvent.getParameter("url").indexOf("$count") !== -1 ||
				oEvent.getParameter("method") !== "GET") {
					return;
			}
			
			var aTimesheetData = JSON.parse(oEvent.getParameter("response").responseText).d.results;
			var oTimeParser = DateFormat.getTimeInstance({pattern: "'PT' HH 'H' mm 'M' ss 'S'"});
			var rDateRegExp = new RegExp(/\/Date\(([0-9]*)\)\//);
			var aAggregatedData = [];
			
			jQuery.each(aTimesheetData,
				function(i, oTime){
					var iDuration = (oTimeParser.parse(oTime.TimeTo) - oTimeParser.parse(oTime.TimeFrom) ) / (1000 * 60 * 60),
					iDateInMs = parseInt(oTime.ActivityDate.match(rDateRegExp)[1], 10);
					
					aAggregatedData.push({
						"Date": new Date(iDateInMs),
						"Duration": iDuration,
						"Internal": oTime.Internal ? this.getText("timesheet.internal") : this.getText("timesheet.customer")
					});
				}.bind(this)
			);
			this._oChartModel.setData(aAggregatedData);
		},

		//Private section
		_createChartModel: function() {
			this._oChartModel = new JSONModel();
			this.getView().setModel(this._oChartModel, "chart");
		},

		_configureChart: function() {
			var oChart = this.getView().byId("Chart");
			var oDataset = new FlattenedDataset({
				dimensions: [{
					axis: 1,
					name: this.getText("timesheet.date"),
					value: "{ path: 'chart>Date', type: 'sap.ui.model.type.Date', formatOptions: { style: 'short' } }"
				}, {
					axis: 2,
					name: this.getText("timesheet.type"),
					value: "{chart>Internal}"
				}],
				measures: [{
					name: this.getText("timesheet.duration"),
					value: "{chart>Duration}"
				}],
				data: {
					path: "chart>/"
				}
			});
			oChart.setDataset(oDataset);
		}
	});
});
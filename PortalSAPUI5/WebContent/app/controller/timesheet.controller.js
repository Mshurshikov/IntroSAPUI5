sap.ui.define([
	"my/app/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/ui/core/format/DateFormat",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/type/Date",
	"sap/ui/model/Filter"
], function(Controller, JSONModel, FlattenedDataset, DateFormat, MessageToast, MessageBox, TypeDate, Filter) {
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
			if(!this._oNewDialog) {
				this._createNewDialog();
				
				this._oNewDialog.attachBeforeOpen(function() {
					this._oNewModel.setData({"Internal": false});
				}, this);
				
				this._oNewDialog.attachAfterClose(function() {
					sap.ui.getCore().byId("time-internal").setSelectedIndex(1);
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
			
			if(oData.Internal) {
				delete oData.CustomerID;
				delete oData.ProjectID;
			}
			
			oModel.create("/TimesheetSet", oData, {
				success: function() {
					MessageToast.show(this.getText("message.create.success"))
				}.bind(this),
				error: function() {
					MessageBox.error(this.getText("message.create.error"), {
						title: this.getText("message.error")
					})
				}.bind(this)
			});
			this._oNewDialog.close();
		},

		onTimeTypeChanged: function(oEvent) {
			this._oNewModel.setProperty("/Internal", !oEvent.getParameter("selectedIndex"));
			sap.ui.getCore().byId("time-customer").setEnabled(!!oEvent.getParameter("selectedIndex"));
			sap.ui.getCore().byId("time-project").setEnabled(!!oEvent.getParameter("selectedIndex"));
		},

		onProjectChanged: function(oEvent) {
			var sSelectedCustomerId = oEvent.getParameter ? oEvent.getParameter("selectedItem").getKey() : oEvent;
			var oBinding = sap.ui.getCore().byId("time-project").getBinding("items");
			
			oBinding.filter(new Filter({
				path: "CustomerID",
				operator: "EQ",
				value1: sSelectedCustomerId
			}));
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
		},
		
		_createNewDialog: function() {
			this._oNewDialog = sap.ui.xmlfragment("my.app.view.newTime", this);
			this._oNewModel = new JSONModel();
			this._oNewDialog.setModel(this._oNewModel, "time");
		}
	});
});
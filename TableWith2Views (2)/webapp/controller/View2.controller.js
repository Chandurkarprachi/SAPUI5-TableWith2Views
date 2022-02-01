sap.ui.define([
	"TableTask/controller/BaseController",
	'sap/m/MessageToast'
], function(BaseController,MessageToast) {
	"use strict";

	return BaseController.extend("TableTask.controller.View2", {
		onInit: function() {
            this.oModel;

            this.oRouter = this.getOwnerComponent().getRouter();
            //We need a method which is triggered EVERYTIME route changes
            this.oRouter.getRoute("View2").attachMatched(this.herculis, this);
		},
        herculis:function(){
            
             this.getView().getModel();
         
            MessageToast.show("herculis is called");
        },
        
		onBack: function(){
           	history.go(-1);
        },
		onRowSelect: function(oEvent) {
			this.index = oEvent.getParameter("rowIndex");
			this.indices = oEvent.getParameter("rowIndices");
		},
		ReDelete: function() {
			//code for deleting records from 2nd Table
            if(!this.oModel){
                this.oModel = this.getView().getModel();
            }
			
			//var oModel = this.getView().getModel();
			var aData =this.oModel.getProperty("/RemovedProducts");
			if (aData.length > 0) {
				var removed_product = aData.splice(this.index, 1);
				this.oModel.setProperty("/RemoveProducts", aData);

				//  <!-- code of Getting  deleted Eelement-->

				var aData1 = this.oModel.getProperty("/products");
				aData1.push(removed_product[0]);
				this.oModel.setProperty("/products", aData1);
			}
		},
		MultipleDelete: function() { //function for deleting multiple items on press of single delete button click.
			 //function for deleting multiple items on press of single delete button click.
			//code for deleting records
            if(!this.oModel){
                this.oModel = this.getView().getModel();
            }
			//var oModel = this.getView().getModel();
			var AllData = this.oModel.getProperty("/RemovedProducts");
            var j = this.indices.length - 1;
            var removed_product=[];
            for (var i = AllData.length - 1; i >= 0; i--) {
                if(this.indices[j] === i ){
                    removed_product.push(AllData.splice(this.indices[j], 1));
                    this.oModel.setProperty("/RemovedProducts", AllData);
                    j--;
                }
			}
            
			//code for retriving multiple deleted Records
			var aData1 = this.oModel.getProperty("/products");
			for (var i = removed_product.length - 1; i >= 0; i--) {
				aData1.push(removed_product[i][0]);
				this.oModel.setProperty("/products", aData1);
			}
        
		}

	});
});

// In This code i included MultiDelete fuction which is used to delete multiple records on one single click
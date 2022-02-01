sap.ui.define([
	"TableTask/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("TableTask.controller.View1", {
		onInit: function() {
			 this.oModel;
		},
        onRowSelect: function(oEvent) {
			this.index = oEvent.getParameter("rowIndex");
			this.indices = oEvent.getSource().getSelectedIndices();
		},
        onDelete: function() {
			//1. get object of model
            if(!this.oModel){
                this.oModel = this.getView().getModel();
            }
			//var oModel = this.getView().getModel();
            
			//2. get array of data products so that we can apply splice method
			var aData = this.oModel.getProperty("/products");
			this.allData=aData;
			if (aData.length > 0) 
			{
				//3. remove record of which index is selected. and store it in remove_product variable.
				var removed_product = aData.splice(this.index, 1);
				//4. set remaining values again to the object of model i. e. OModel
				this.oModel.setProperty("/products", aData);

				//  <!-- code of getting deleted Eelement-->

				//1. create array for deleted elements
				var aData1 = this.oModel.getProperty("/RemovedProducts");
				//2. push removed value into the array
				aData1.push(removed_product[0]);
				//3. set array which is of removed elements to the model object.
				this.oModel.setProperty("/RemovedProducts", aData1);
				//this.onNext(removed_product);
			}
	    },
        onNext:function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("View2");
        },
        MultipleDelete: function() { //function for deleting multiple items on press of single delete button click.
			//code for deleting records
            if(!this.oModel){
                this.oModel = this.getView().getModel();
            }
			//var oModel = this.getView().getModel();
			var AllData = this.oModel.getProperty("/products");
            var j = this.indices.length - 1;
            var removed_product=[];
            for (var i = AllData.length - 1; i >= 0; i--) {
                if(this.indices[j] === i ){
                    removed_product.push(AllData.splice(this.indices[j], 1));
                    this.oModel.setProperty("/products", AllData);
                    j--;
                }
			}
            
			//code for retriving multiple deleted Records
			var aData1 = this.oModel.getProperty("/RemovedProducts");
			for (var i = removed_product.length - 1; i >= 0; i--) {
				aData1.push(removed_product[i][0]);
				this.oModel.setProperty("/RemovedProducts", aData1);
			}
        
		}

	});
});

// In This code i included MultiDelete fuction which is used to delete multiple records on one single click
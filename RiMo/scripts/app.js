(function (global) {
    var mobileSkin = "",
        app = global.app = global.app || {};

    
    document.addEventListener('deviceready', function () {
        if (navigator.splashscreen && navigator.splashscreen.hide) navigator.splashscreen.hide();
        $(document.body).height(window.innerHeight);

		app.run();        
    }, false);

    app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout"});
    
    app._setMerchantAccount = function(message) {
        var lastMerchant=localStorage.getItem("com.codzart.rimo.merchant");
        var newMerchant = message || lastMerchant || "rfKbo1ot2JTHKtZCx6VoD1CjQAN1wK19hv";
        console.log("last: "+lastMerchant);
        console.log("new: "+newMerchant);
        
        if (newMerchant) {   
            $('#merch').val =  newMerchant; 
            $("#showMerchant").html("Merchant: "+newMerchant);
            if (localStorage) localStorage.setItem("com.codzart.rimo.merchant", newMerchant);
            makeCode();
        }
            
    };
        
    app._scan = function() {
            var that = this;
            if (window.navigator.simulator === true) {
                alert("Not Supported in Simulator.");
            }
            else {
                cordova.plugins.barcodeScanner.scan(
                    function(result) {
                        if (!result.cancelled) {
                            var regex = /(r[0-9a-zA-Z]{33,33}$)/i;
                            var matches = result.text.match(regex);
                            if (matches.length > 0) {
                                console.log("set merchant: "+matches[0]);
                                that._setMerchantAccount(matches[0]); 
                            }
                        }
                    }, 
                    function(error) {
                        console.log("Scanning failed: " + error);
                    });
            }
    };
        
    app.run = function() {
        var that = this,
        scanButton = document.getElementById("setMerchant");
    
        
        scanButton.addEventListener("click",function() { 
                                        that._scan.call(that); 
                                    });
        app._setMerchantAccount();
    }
    app.changeSkin = function (e) {
        if (e.sender.element.text() === "Flat") {
            e.sender.element.text("Native");
            mobileSkin = "flat";
        }
        else {
            e.sender.element.text("Flat");
            mobileSkin = "";
        }

        app.application.skin(mobileSkin);
    };
})(window);
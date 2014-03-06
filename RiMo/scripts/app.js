(function (global) {
    var mobileSkin = "",
        app = global.app = global.app || {};

    
    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();
        $(document.body).height(window.innerHeight);

		app.run();        
    }, false);

    app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout"});
    
    app._setMerchantAccount = function(message) {
            var that = this;
            //currentMessage = that.merchAccount.innerHTML;
            $('#merch').val =  message; 
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
                            var regex = /contact\?to=(r.*$)/i;
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
            scanButton.addEventListener("click",
                                        function() { 
                                            that._scan.call(that); 
                                        });
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
(function (global) {
    var PaymentViewModel,
        app = global.app = global.app || {};

    PaymentViewModel = kendo.data.ObservableObject.extend({
        /*isMerchantSet: false,
        merchantAccount: null,
        payAmount: 0,
        payUnit: "USD",
        units: ["USD","XRP","BTC","EUR","LTC","DOGE"], */
        paymentDataSource: null,

        init: function () {
            var that = this,
                dataSource;

            kendo.data.ObservableObject.fn.init.apply(that, []);

            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "https://ripple-rest.herokuapp.com/api/v1/addresses/rMyFEkYYTjzN23Qznon6yPtw297AV124ER/next_notification",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
            			type: "GET"
                    },
                    parameterMap: function (data, type) {
                        if(type = "read"){  
                            var re = data.notification;
                            console.log(re);
                            alert(re);
                            return Array(data.notification);                            
                        }
                        else if (type === "create") {
                            return JSON.stringify(data);
                        }
					}
                    
               
                }
            });

            that.set("paymentDataSource", dataSource);
        }
    });

    app.paymentService = {
        viewModel: new PaymentViewModel()
    };
})(window);
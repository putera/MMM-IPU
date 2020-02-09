/*

    Indeks Pencemaran Udara (IPU)
    ====================================

    Developer : Zulkifli Mohamed (putera)
    E-mail : mr.putera@gmail.com

*/

var NodeHelper = require('node_helper');
var request = require('request');
var async = require('async');

module.exports = NodeHelper.create(
{
    start: function() {
        console.log('[MMM-IPU] IPU module started...');
    },

    getIPU: function(config) {
        var self = this;
        var _ipu = 0.00;
	var state = config.state.toLowerCase();
	var location = config.location.toLowerCase();

	var dt = new Date();
	var url = "http://apims.doe.gov.my/data/public_v2/CAQM/hours24/" + dt.getFullYear() + "/" + ('0' + (dt.getMonth())).slice(-2)  + "/" + ('0' + (dt.getDate())).slice(-2)  + "/" + ('0' + (dt.getHours())).slice(-2)  + "00.json";

        async.parallel({
            ipu: function(callback) {
                request({ url: url, method: 'GET' }, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        callback(error, body);
                    }
                });
                console.log('[MMM-IPU] Retrieve : ' + url);
            }
    	},
        function(error, result) {
            if (error) {
                console.log('[MMM-IPU] Error : ' + error);
            }

            var r = JSON.parse(result.ipu);
            if (r) {
		for (var i = 0; i < r['24hour_api_apims'].length; i++)
		{
			if (r['24hour_api_apims'][i][0].toLowerCase() == state && r['24hour_api_apims'][i][1].toLowerCase() == location)
			{
				_ipu = r['24hour_api_apims'][i][24];
				//_ipu = r['24hour_api_apims'][i][25];
			}
		}
            }

	    var ipudata = {ipu: _ipu};
            self.sendSocketNotification('IPU_RESULT', ipudata);
        });
    },

    socketNotificationReceived: function(notification, payload)
    {
        if (notification === 'GET_IPU') {
            this.getIPU(payload);
        }
    }
});

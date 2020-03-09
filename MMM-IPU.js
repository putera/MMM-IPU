/*

    Indeks Pencemaran Udara (IPU)
    ====================================

    Developer : Zulkifli Mohamed (putera)
    E-mail : mr.putera@gmail.com

*/

Module.register("MMM-IPU",
{
    result: {},
    defaults:
    {
        state: 'Perak',
        location: 'Seri Manjung',
        refreshTime: 5, // in minutes
        animationSpeed: 2500,
	hideOnStart: false
    },

    start: function() {
        this.getIPU();
        this.scheduleUpdate();
    },

    getIPU: function() {
        this.sendSocketNotification('GET_IPU', this.config);
    },

    scheduleUpdate: function(delay) {
        var nextLoad = this.config.refreshTime * 60 * 1000;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }

        var self = this;
        setInterval(function() {
            self.getIPU();
        }, nextLoad);
    },

    getDom: function() {
	var self = this;
        var data = this.result;
        var location = this.config.location;
        var w = document.createElement("div");

        if (data)
        {
	    var ipu = data.ipu.match(/\d/g);
	    ipu = ipu.join("");
	    var color = '';

	    if (ipu > 50 && ipu <= 100) {
		    color = 'green';
	    } else if (ipu > 100 && ipu <= 200) {
		    color = 'yellow';
	    } else if (ipu > 200 && ipu <= 300) {
		    color = 'orange';
	    } else if (ipu > 300) {
		    color = 'red';
	    } else {
		    color = 'blue';
	    }
	
	    var div = '<div style="width: 100%;">';
	    div += '<div style="float:left; width:10%; background-color:'+color+';">&nbsp;</div>';
            div += '<div style="float:right; width:90%" class="small bright">' + this.config.location + ', ' + this.config.state + '</div>';
	    div += '</div>';
	    div += '<div class="large light bright">' + ipu + '</div>';
	    div += '<div style="width:100%; height: 15px !important;">';
	    div += '<div style="float:left; width:20%; height: 15px !important; background-color:blue;"></div>';
	    div += '<div style="float:left; width:20%; height: 15px !important; background-color:green;"></div>';
	    div += '<div style="float:left; width:20%; height: 15px !important; background-color:yellow;"></div>';
    	    div += '<div style="float:left; width:20%; height: 15px !important; background-color:orange;"></div>';
	    div += '<div style="float:left; width:20%; height: 15px !important; background-color:red;"></div>';
	    div += '</div>';

	    w.innerHTML = div;
	}
        else
        {
            w.className = 'small dimmed';
            w.innerHTML = this.translate("LOADING");
        }

        return w;
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "IPU_RESULT") {
            var self = this;
            this.result = payload;
            this.updateDom(self.config.animationSpeed);
        }
    },
    
    notificationReceived: function(notification, payload, sender) {
	if (notification === "MODULE_DOM_CREATED")
	{
	    // Hide when module started
	    if (this.config.hideOnStart)
		this.hide();
	}
	else if (notification === "SHOW_IPU")
	{
	    this.show();
	}
	else if (notification === "HIDE_IPU")
	{
	    this.hide();
	}
    }
});

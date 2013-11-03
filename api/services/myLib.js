

exports.getIPAddresses = function () {

    var ipAddresses = [];

    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                ipAddresses.push(alias.address);
            }
        }
    }

    console.log('my ipAddresses:', ipAddresses);

    return ipAddresses;
}



var gpio = require("gpio");

var pi = {init: false};

pi.initGpio = function() {

    if(!pi.init){

        pi.ledPin = gpio.export(4, {
            direction: 'out',
            ready: function() {
                console.log('gpio 4 ready');
            }
        });

        pi.init = true;

        pi.forwardPin = gpio.export(17, {
            direction: 'out',
            ready: function() {
                console.log('gpio 17 ready');
            }
        });

        pi.init = true;

        pi.backwardPin = gpio.export(27, {
            direction: 'out',
            ready: function() {
                console.log('gpio 27 ready');
            }
        });

        pi.init = true;
    }
}


pi.led = function() {

    if (pi.ledOn){
        pi.ledOn = false;
        console.log('turning led off')
        pi.ledPin.set(0);
    } else {
        console.log('turning led on')
        pi.ledOn = true;
        pi.ledPin.set();
    }

}


pi.forward = function(on) {

    if(on){
        pi.backwardPin.set(0); // turn off other direction
        console.log('turning forward on')
        pi.forwardOn = true;
        pi.forwardPin.set();

    }
    else if (!on){
        pi.forwardOn = false;
        console.log('turning forward off')
        pi.forwardPin.set(0);
    }
}

pi.backward = function(on) {

    if (on){
        pi.forwardPin.set(0); // turn of other direction
        pi.backwardOn = true;
        console.log('turning backward on')
        pi.backwardPin.set();
    } 
    else if (!on){
        console.log('turning backward off')
        pi.backwardOn = false;
        pi.backwardPin.set(0);
    }

}

pi.allOff = function() {
    console.log('turning All off')
    pi.forward(false);
    pi.backward(false);

}

exports.pi = pi;
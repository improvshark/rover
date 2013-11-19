

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


function Motor (pin1, pin2) {
    this.pin1 = pin1;
    this.pin2 = pin2;

    gpio.open(this.pin1, "output");
    gpio.open(this.pin2, "output");
    return this;
}

Motor.prototype.forward = function(bool) {
    if(bool){
        gpio.write(this.pin1, 0);
        gpio.write(this.pin2, 1);
    } else if(!bool){
        gpio.write(this.pin1, 0);
        gpio.write(this.pin2, 0);
    }
};

Motor.prototype.backward = function(bool) {
    if(bool){
        gpio.write(this.pin1, 1);
        gpio.write(this.pin2, 0);
    } else if(!bool){
        gpio.write(this.pin1, 0);
        gpio.write(this.pin2, 0);
    }
};


var gpio = require("pi-gpio");

var pi = {init: false};

pi.initGpio = function() {

    if(!pi.init){



        // init led
        pi.ledPin = 7; 
        gpio.open(pi.ledPin, "output", function(err) { 
            console.log(err); 
        });
        pi.ledOn = false;

        pi.motor1 = new Motor(11,12);
        pi.motor2 = new Motor(15,16);

        

        pi.init = true;
    }
}


pi.led = function() {

    if (pi.ledOn){
        pi.ledOn = false;
        console.log('turning led off')
        gpio.write(pi.ledPin, 0);
    } else {
        console.log('turning led on')
        pi.ledOn = true;
        gpio.write(pi.ledPin, 1);
    }

}

pi.forward  = function(on) {
   
}

exports.pi = pi;




/**
 * Created by Leonardo on 02/08/2016.
 */
FCM = require('fcm-node');


var SERVER_API_KEY='AAAAE1Lp-kk:APA91bE1yRSOwGq7C1PzUYntBsD0I3EoZCo0pGSyn_-UALTeRZMg7kDpowL2JNJNEPnrdR7GR2PrghVSop9AkCR1BtJmI5DFtgGgQQmIhYlCwt4NpidboRmugQyaRMrqWCcjH7fxdPyZ';//put your api key here

var validDeviceRegistrationToken = ''; //put a valid device token here




var fcmCli= new FCM(SERVER_API_KEY);

module.exports = function(app, db) {

 //CREATE
  app.post('/subscribe', (req, res) => {
    // You'll create your note here.
    console.log(req.body)

    validDeviceRegistrationToken = req.body.ntoken;

    console.log(validDeviceRegistrationToken);

    fcmCli.send(payloadOK,function(err,resFcm){
      if (!err) {
          res.status(200).json({status:"ok"});
      }else {
          res.status(200).json({status:"error"});
      }
    });

  });


};

var payloadOK = {
    to: validDeviceRegistrationToken,
    data: { //some data object (optional)
        url: 'news',
        foo:'fooooooooooooo',
        bar:'bar bar bar'
    },
    priority: 'high',
    content_available: true,
    notification: { //notification object
        title: 'Please send Speed value', body: 'Tap to send speed value', sound : "default", badge: "1"
    }
};

var payloadError = {
    to: "4564654654654654", //invalid registration token
    data: {
        url: "news"
    },
    priority: 'high',
    content_available: true,
    notification: { title: 'TEST HELLO', body: '123', sound : "default", badge: "1" }
};

var payloadMulticast = {
    registration_ids:["4564654654654654",
        '123123123',
        validDeviceRegistrationToken, //valid token among invalid tokens to see the error and ok response
        '123133213123123'],
    data: {
        url: "news"
    },
    priority: 'high',
    content_available: true,
    notification: { title: 'Please send Speed value', body: 'Tap to send speed value', sound : "default", badge: "1" }
};

var callbackLog = function (sender, err, res) {


    console.log("\n__________________________________")
    console.log("\t"+sender);
    console.log("----------------------------------")
    console.log("err="+err);
    console.log("res="+res);
    console.log("----------------------------------\n>>>");
};

function sendOK()
{
    fcmCli.send(payloadOK,function(err,res){
        callbackLog('sendOK',err,res);
    });
}

function sendError() {
    fcmCli.send(payloadError,function(err,res){
        callbackLog('sendError',err,res);
    });
}

function sendMulticast(){
    fcmCli.send(payloadMulticast,function(err,res){
        callbackLog('sendMulticast',err,res);
    });
}

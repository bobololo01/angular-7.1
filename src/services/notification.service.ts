import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { environment } from '../environments/environment';
import { FirebaseMessaging } from '@firebase/messaging-types';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAction } from 'angularfire2/database';



@Injectable()
export class NotificationService {

    constructor(private http: Http,private af: FirebaseApp) { }
    sendMessage() {
        // This registration token comes from the client FCM SDKs.
        var registrationToken = 'AAAA9Ik4tF4:APA91bH6zhmlY6SJkbbSnAw_ARrHktWAHMwClOWKRT1hykeVfksdJS_-a3pBprVSi4MnhYe75eOdym6ZvYkWkW2DwEV-vp4NZMMLCDQSML-1X_jmzQ_L9iFC12lKC2-nyTqirWXwiDsb';

        // See documentation on defining a message payload.
        var message = {
            data: {
                score: '850',
                time: '2:45'
            },
            token: registrationToken
        };

        // Send a message to the device corresponding to the provided
        // registration token.
        this.af.messaging().usePublicVapidKey("BAez8HQR7-LCTibVon8k41jreUq5jV3AuubyTLAlKFhgzhDfHfuj47OIChLauCG35MuEtt_O3bA2B-AYj05go1U")
    }
}
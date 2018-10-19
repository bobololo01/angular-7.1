import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  baseUrl: 'http://178.128.223.143/aping build --prod',
  httpOptions: {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json', 
      })
  },
  firebaseConfig : {
    apiKey: "AIzaSyDrk8NJEU3kz8C_38CzvUtoG7CDn1IuRxQ",
    authDomain: "van-tai-hoa-phat.firebaseapp.com",
    databaseURL: "https://van-tai-hoa-phat.firebaseio.com",
    projectId: "van-tai-hoa-phat",
    storageBucket: "van-tai-hoa-phat.appspot.com",
    messagingSenderId: "1050274215006"
  },
  firebaseadminConfig: {
    "type": "service_account",
    "project_id": "van-tai-hoa-phat",
    "private_key_id": "f5c7c04e41b6001a06c1b2af7da9a8342c0707a3",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDuA0pKcceWTEYe\nZVnZsY3Qyav7jIcMLnzs5vnUQ6O4T0eauxL1v4Iz18KenxdHoi1jXS8s/63XIcWO\ni4UDPYf/F0szBrw+cpU3PauLOX5T13z4eqvft26gJeJBrXW4GoXz0ZjvcZPWy/+O\ne1nk2gpKloCTNUmECL6uQPMJmMX85DGEbu2CU+SdPGYZpvFxPt6UFNyt7MPwYGEB\n/wYe/C9hkSkTGLEqGgJlLhweXNTVoBCJBzAbj4wDq8zLhmPLs6DJe/jwiusJfTeE\nYmNRfEeyGYdBpxk23OT+V3/pnpDMUszBnFqY4Vmrvc7uk/P14iuXDjmgXvJ4yH75\n8ObjB9k7AgMBAAECggEAQfaReU5NRT9AU549J5MIvauWyXFp4BtmLfXZmVVho2v9\naUmdeJQpzppmarWmqwisUZR6xZran/vRF69dHsfH0A+xnKOqOhhheFzUFRLLCwt2\nrBq7VZYtx56YNSGQtYRMSYV2QC4XDfmdiuxuvnkbTw6k9adYB4qw5fREJw27GVnP\n68VNAdTrskMBN/J9+AqZhfoJuCc6k/QvnGti7gYI2fxR3TAU4Lj2W0QrkCEhHgEe\noyEPTlTprbZqtm0wThu0/Uvur7expRCDxWaf3n9xPRgNCpPLR0z0uI3yuVb6ZSix\n4YfKUXif9wDp+uhJ5s6IygAPieqq0m8NzvD002gm2QKBgQD9rCyM6WbEyL8qjqfT\nNEbtUZx7E7mrtqSELq6kJDrLxh6XLqrw2f1P1p/7WozwVuhl6yFcjAzopgRcmdNh\n303J/0u7wWvq6kiIO9mbZecjIZHNITRSvJ16FRhwX4r1PpZLJ+xKaRj78kr0lfjB\npGyygUmuDWLUdgimD+BcvUknjQKBgQDwMlWtC2dNiUVFMsv0uNoYob3izgMUAjf1\nHbDwmMxtSjfPyeASTc2G7k5v3AfqQf6fqWrUtfiqhF7b9qwpTK2CNUe8I5KAIeGr\nfjqmnO4um0CIjBdNr4IDpaAKqJh3ikDz2Q/IHgnUTrKsZni1tOPaeJnjLB6f3N1q\nExVK9M8N5wKBgCRJn+ncbY4S5X3SAGHvJYJHXWohzTqqGuipwOPMJvkFc1TPITbp\nCBqGqkYLkwPCeuYxd4lEo4gYT6Frg9iJWBhgQ9Ys+iIVt6B9Z0iakDDvWWsNp+15\n+9D9+YwBruAcPuWrZVrTo/ZOl7hbR8VznvT+F6slURDxfZU7yi2aCj/1AoGBAOK2\nf8ufcdfrcyiHc57/Q0vwjiwfSyR9m5eOeM3/SyT04o0L/KUKLq3nDL3kLsxbkhvd\naupu/9DitC5mO8WXjEXUSGs6IDM0x654rJ9KjD4NZ/H6WJyIxezvTYoB7DcYlYoU\nHSNDxv9PcLHs3o6TuGUjZAzaPeWiMJLIhFaFj1GNAoGBAKZtHWoTZIiyV85/r4UV\nUE9/8siDmCUK56SHjN47p4/kl4J1dvi9amMXUDGYNaKDJfGS/PJcZuUIoym9KDnh\nNYVQh/G4BqtrmjRf+RQVI3BwEaF6/5JARLf5uMhIU3Uw2GRZF9EORRR5y6wapyJz\npuqfE1YC70vLJokVtwwy1+3S\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-oje0k@van-tai-hoa-phat.iam.gserviceaccount.com",
    "client_id": "102532837820250140998",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-oje0k%40van-tai-hoa-phat.iam.gserviceaccount.com"
  }
};

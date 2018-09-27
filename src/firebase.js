var firebase = require("firebase");
const key = require('./secret')

var config = key;

firebase.initializeApp(config);

export default firebase

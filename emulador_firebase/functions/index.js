const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.json({
    message: "Hola Mundo desde Firebase Emulators!",
    environment: "local"
  });
});
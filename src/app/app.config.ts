import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAcaQEFqSYvBEb6FOK8N2yPx7uC-3yy7BY",
//   authDomain: "travel-location-tracker.firebaseapp.com",
//   projectId: "travel-location-tracker",
//   storageBucket: "travel-location-tracker.firebasestorage.app",
//   messagingSenderId: "479986358977",
//   appId: "1:479986358977:web:f6107116219fd5d4319240"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
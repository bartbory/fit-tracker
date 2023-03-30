import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import { initializeApp } from "firebase/app";
import BaseCard from "./components/ui/BaseCard.vue";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_DBURL,
  projectId: import.meta.env.VITE_PID,
  storageBucket: import.meta.env.VITE_STORAGE,
  messagingSenderId: import.meta.env.VITE_MSGSID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MID,
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.component("base-card", BaseCard);

app.use(router);

app.mount("#app");

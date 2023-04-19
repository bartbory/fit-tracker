import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import { initializeApp } from "firebase/app";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseInfo from "./components/ui/BaseInfo.vue";
import BaseLoading from "./components/ui/BaseLoading.vue";
import NavButton from "./components/ui/NavButton.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import Icon from "./components/ui/Icon.vue";

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
app.component("base-info", BaseInfo);
app.component("nav-button", NavButton);
app.component("base-button", BaseButton);
app.component("base-loading", BaseLoading);
app.component("icon", Icon);

app.use(router);

app.mount("#app");

<template>
  <section>
    <form @submit.prevent="submitForm">
      <div class="form--row" v-if="mode === 'register'">
        <label>Imię</label>
        <input type="text" id="name" v-model.trim="name" />
      </div>
      <div class="form--row">
        <label>E-mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form--row">
        <label>Password</label>
        <input type="password" id="password" v-model.trim="pass" />
      </div>
      <p v-if="!formIsValid">Error</p>
      <div class="actions">
        <button type="submit">{{ switchCaption }}</button>
        <button @click="switchAuthMode" type="button">
          {{ switchButtonCaption }}
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import createUser from "../helpers/createUser";
// import getUserData from "@/helpers/getUserData";

export default defineComponent({
  name: "UserLogin",
  async setup() {
    const router = useRouter();
    const email = ref("");
    const pass = ref("");
    const name = ref("");

    const formIsValid = ref(true);
    const mode = ref("login");

    const switchButtonCaption = computed(() => {
      if (mode.value === "login") {
        return "Switch to signup mode";
      } else {
        return "Switch to login mode";
      }
    });
    const switchCaption = computed(() => {
      if (mode.value === "login") {
        return "Login";
      } else {
        return "Register";
      }
    });

    function switchAuthMode() {
      if (mode.value === "login") {
        mode.value = "register";
        console.log("zmieniam na register");
      } else {
        mode.value = "login";
        console.log("zmieniam na login");
      }
    }
    function submitForm() {
      formIsValid.value = true;
      if (
        email.value === "" ||
        !email.value.includes("@") ||
        pass.value.length < 6
      ) {
        formIsValid.value = false;
        return;
      } else if (mode.value === "register") {
        createUserWithEmailAndPassword(getAuth(), email.value, pass.value)
          .then((data) => {
            if (name.value.trim() !== "")
              console.log("Successfully registred!", data);
            const userData = {
              id: data.user.uid,
              name: name.value.trim(),
              email: email.value.trim(),
              lastMeasure: null,
            };
            localStorage.setItem("uid", `${data.user.uid}`);
            localStorage.setItem("name", `${name.value.trim()}`);
            createUser(userData);
            router.push("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      } else if (mode.value === "login") {
        signInWithEmailAndPassword(getAuth(), email.value, pass.value)
          .then((data) => {
            console.log("Successfully Logged!", data);
            localStorage.setItem("uid", `${data.user.uid}`);
            router.push(`/user`);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      }
    }

    function signInWithGoogle() {
      return;
    }

    return {
      email,
      pass,
      name,
      formIsValid,
      mode,
      submitForm,
      switchAuthMode,
      switchButtonCaption,
      signInWithGoogle,
      switchCaption,
    };
  },
});
</script>

<style scoped>
form {
  margin: 0 auto;
}
.actions {
  margin: 0 auto;
  display: flex;
  column-gap: 24px;
  justify-content: center;
}
</style>

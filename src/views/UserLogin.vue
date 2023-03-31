<template>
  <section>
    <form @submit.prevent="submitForm">
      <div class="form--row" v-if="mode === 'register'">
        <div class="form--input">
          <label>Imię</label>
          <input type="text" id="name" v-model.trim="name" />
        </div>
      </div>
      <div class="form--row">
        <div class="form--input">
          <label>E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
      </div>
      <div class="form--row">
        <div class="form--input">
          <label>Hasło</label>
          <input type="password" id="password" v-model.trim="pass" />
          <p v-if="!formIsValid">{{ error }}</p>
        </div>
      </div>
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
import { defineComponent, ref, computed, Ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import createUser from "../helpers/createUser";

export default defineComponent({
  name: "UserLogin",
  async setup() {
    const router = useRouter();
    const email: Ref<string> = ref("");
    const pass: Ref<string> = ref("");
    const name: Ref<string> = ref("");

    const formIsValid: Ref<boolean> = ref(true);
    const error: Ref<string> = ref("");
    const mode: Ref<"login" | "register"> = ref("login");

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
      } else {
        mode.value = "login";
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
        error.value =
          "Sprawdź poprawność danych, hasło musi posiadać przynajmniej 6 znaków";
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
            error.value = error.message;
          });
      } else if (mode.value === "login") {
        signInWithEmailAndPassword(getAuth(), email.value, pass.value)
          .then((data) => {
            localStorage.setItem("uid", `${data.user.uid}`);
            router.push(`/user`);
          })
          .catch((error) => {
            const errorCode = error.code;
            error.value = error.message;
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
      error,
    };
  },
});
</script>

<style scoped>
form {
  margin: 0 auto;
}

.form--row {
  margin: 0 auto;
  position: relative;
  width: 100%;
  max-width: 840px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
}
.form--input {
  position: relative;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
label {
  position: absolute;
  top: -4px;
  left: 16px;
  font-size: 12px;
  text-align: right;
  flex: 0 0 40%;
}
input,
select {
  flex: 0 0 100%;
}
.actions {
  margin: 0 auto;
  display: flex;
  column-gap: 24px;
  justify-content: center;
}
</style>

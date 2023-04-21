<template>
  <section>
    <base-loading v-if="showProgress"></base-loading>
    <form @submit.prevent="submitForm" v-if="!showProgress">
      <div class="form--row">
        <label>Name</label>
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
      <p class="error" v-if="!formIsValid">{{ error }}</p>
      <base-button
        text="Create account"
        mode="secondary"
        type="submit"
      ></base-button>
    </form>
    <div class="container--switch">
      <hr />
      <p>In case you already have an account</p>
      <nav-button name="login" mode="primary-alt" text="Login"></nav-button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import createUser from "../helpers/createUser";

export default defineComponent({
  name: "UserRegister",
  async setup() {
    const router = useRouter();
    const email: Ref<string> = ref("");
    const pass: Ref<string> = ref("");
    const name: Ref<string> = ref("");

    const formIsValid: Ref<boolean> = ref(true);
    const showProgress: Ref<boolean> = ref(false);
    const error: Ref<string> = ref("");

    function submitForm() {
      formIsValid.value = true;
      if (
        email.value === "" ||
        !email.value.includes("@") ||
        pass.value.length < 6 ||
        name.value.trim() === ""
      ) {
        console.log("checking");
        formIsValid.value = false;
        error.value =
          "Check your data. All fields is required. Password must contain at least 6 characters";
        return;
      }

      showProgress.value = true;

      createUserWithEmailAndPassword(getAuth(), email.value, pass.value)
        .then((data) => {
          const userData = {
            id: data.user.uid,
            name: name.value.trim(),
            email: email.value.trim(),
            lastMeasure: null,
          };
          localStorage.setItem("uid", `${data.user.uid}`);
          localStorage.setItem("name", `${name.value.trim()}`);
          createUser(userData);
          router.push({ name: "setup" });
          showProgress.value = false;
        })
        .catch((err) => {
          showProgress.value = false;
          console.log(showProgress.value);
          if (err.code === "auth/email-already-in-use") {
            formIsValid.value = false;
            error.value = "This e-mail is already in use";
          }
        });
    }

    return {
      email,
      pass,
      name,
      formIsValid,
      submitForm,
      error,
      showProgress,
    };
  },
});
</script>

<style scoped>
.container--switch {
  position: relative;
  margin: 80px auto;
  width: 80%;
}

.container--switch hr {
  border: 1px solid var(--font-15);
  width: 50%;
  margin: 0 auto;
}

.container--switch p {
  text-align: center;
  margin: 24px 0;
}
</style>

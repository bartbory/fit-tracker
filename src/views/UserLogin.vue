<template>
  <section>
    <form @submit.prevent="submitForm">
      <div class="form--row">
        <label>E-mail</label>
        <input
          type="email"
          id="email"
          v-model.trim="email"
          autocomplete="email"
        />
      </div>
      <div class="form--row">
        <label>Hasło</label>
        <input type="password" id="password" v-model.trim="pass" />
      </div>
      <p class="error" v-if="!formIsValid">{{ error }}</p>
      <base-button text="Login" type="submit" mode="primary"></base-button>
    </form>
    <div class="container--switch">
      <hr />
      <p>In case you don’t have an account</p>
      <nav-button
        name="register"
        mode="secondary-alt"
        text="Create account"
      ></nav-button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default defineComponent({
  name: "UserLogin",
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
        pass.value.length < 6
      ) {
        formIsValid.value = false;
        error.value = "This data is wrong, try again";
        return;
      }
      showProgress.value = true;
      signInWithEmailAndPassword(getAuth(), email.value, pass.value)
        .then((data) => {
          localStorage.setItem("uid", `${data.user.uid}`);
          router.push({ name: `profile` });
        })
        .catch((err) => {
          showProgress.value = false;
          formIsValid.value = false;
          console.log(err.code);
          const errCode = err.code;
          if (err.code === "auth/wrong-password") {
            error.value = "Password is incorrect";
          }
          if (err.code === "auth/too-many-requests") {
            error.value =
              "You reach the limit of login attempts... Need to wait.";
          }
          if (err.code === "auth/user-not-found") {
            error.value = "This e-mail is not registred";
          }
        });
    }

    function signInWithGoogle() {
      return;
    }

    return {
      email,
      pass,
      name,
      formIsValid,
      submitForm,
      signInWithGoogle,
      showProgress,
      error,
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

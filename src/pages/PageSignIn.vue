<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Sign In</h1>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="signIn" class="card card-form">
        <div class="form-group">
          <v-text-field
            label="Email"
            prepend-icon="mdi-account-circle"
            v-model="form.email"
            @blur="$v.form.email.$touch()"
            id="email"
            type="text"
          ></v-text-field>
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error"
              >This field is required</span
            >
            <span v-else-if="!$v.form.email.email" class="form-error"
              >This in not a valid email address</span
            >
          </template>
        </div>
        <div class="form-group">
          <v-text-field
            label="Password"
            prepend-icon="mdi-lock"
            v-model="form.password"
            @blur="$v.form.password.$touch()"
            id="password"
            type="password"
            class="form-input"
          ></v-text-field>
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error"
              >This field is required</span
            >
            <span v-if="!$v.form.password.minLength" class="form-error"
              >The password must be at least 6 characters long</span
            >
          </template>
        </div>

        <v-divider></v-divider>

        <div>
          <router-link :to="{ name: 'Register' }"
            >Create an account?</router-link
          >
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" color="primary">Sign In</v-btn>
    </v-card-actions>

    <div class="push-top text-center">
      <v-btn @click="signInWithGoogle">
        Sign in with Google
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      form: {
        email: null,
        password: null
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    signIn() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$store
          .dispatch("auth/signInWithEmailAndPassword", {
            email: this.form.email,
            password: this.form.password
          })
          .then(() => this.successRedirect())
          .catch(error => alert("🤷‍️" + error.message));
      }
    },
    signInWithGoogle() {
      this.$store
        .dispatch("auth/signInWithGoogle")
        .then(() => this.successRedirect())
        .catch(error => alert("🤷‍️" + error.message));
    },
    successRedirect() {
      const redirectTo = this.$route.query.redirectTo || { name: "Home" };
      this.$router.push(redirectTo);
    }
  },
  created() {
    this.$emit("ready");
  }
};
</script>

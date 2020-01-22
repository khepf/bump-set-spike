<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-form @submit.prevent="signIn">
      <v-card-text>
        <div class="form-group">
          <v-text-field
            label="Email"
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
            v-model="form.password"
            @blur="$v.form.password.$touch()"
            id="password"
            type="password"
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

        <div class="push-top"></div>

        <div class="form-actions text-right">
          <router-link :to="{ name: 'Register' }"
            >Create an account?</router-link
          >
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn type="submit" color="primary">Sign in</v-btn>
      </v-card-actions>
    </v-form>
    <div class="push-top text-center">
      <v-btn @click="signInWithGoogle" class="btn-red btn-xsmall">
        <v-icon color="grey darken-4">mdi-google</v-icon>Sign in via Google
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

<style scoped></style>

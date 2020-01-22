<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Register</h1>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="register">
        <div class="form-group">
          <v-text-field
            label="Full Name"
            v-model="form.name"
            @blur="$v.form.name.$touch()"
            id="name"
            type="text"
          ></v-text-field>
          <template v-if="$v.form.name.$error">
            <span v-if="!$v.form.name.required" class="form-error"
              >This field is required</span
            >
          </template>
        </div>

        <div class="form-group">
          <v-text-field
            label="UserName"
            v-model.lazy="form.username"
            @blur="$v.form.username.$touch()"
            id="username"
            type="text"
          ></v-text-field>
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error"
              >This field is required</span
            >
            <span v-if="!$v.form.username.unique" class="form-error"
              >Sorry! This username is taken</span
            >
          </template>
        </div>

        <div class="form-group">
          <v-text-field
            label="Email"
            v-model.lazy="form.email"
            @blur="$v.form.email.$touch()"
            id="email"
            class="form-input"
          ></v-text-field>
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error"
              >This field is required</span
            >
            <span v-else-if="!$v.form.email.email" class="form-error"
              >This in not a valid email address</span
            >
            <span v-else-if="!$v.form.email.unique" class="form-error"
              >Sorry! This email is taken</span
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

        <div class="form-group">
          <v-file-input
            label="Avatar"
            v-model.lazy="form.avatar"
            @blur="$v.form.avatar.$touch()"
            id="avatar"
          ></v-file-input>
          <template v-if="$v.form.avatar.$error">
            <span v-if="!$v.form.avatar.url" class="form-error"
              >The supplied URL is invalid</span
            >
            <span
              v-else-if="!$v.form.avatar.supportedImageFile"
              class="form-error"
              >This file type is not supported by our system. Supported file
              types: .jpg, .png, .gif, .jpeg, .svg</span
            >
            <span v-else-if="!$v.form.avatar.responseOk" class="form-error"
              >The supplied image cannot be found</span
            >
          </template>
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" color="primary">Register</v-btn>
    </v-card-actions>
    <div class="push-top text-center">
      <v-btn @click="registerWithGoogle">
        Register via Google
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { required, email, minLength, url } from "vuelidate/lib/validators";
import {
  uniqueEmail,
  uniqueUsername,
  responseOk,
  supportedImageFile
} from "@/utils/validators";
export default {
  data() {
    return {
      form: {
        name: null,
        username: null,
        email: null,
        password: null,
        avatar: null
      }
    };
  },
  validations: {
    form: {
      name: {
        required
      },
      username: {
        required,
        unique: uniqueUsername
      },
      email: {
        required,
        email,
        unique: uniqueEmail
      },
      password: {
        required,
        minLength: minLength(6)
      },
      avatar: {
        url,
        supportedImageFile,
        responseOk
      }
    }
  },
  methods: {
    register() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      this.$store
        .dispatch("auth/registerUserWithEmailAndPassword", this.form)
        .then(() => this.successRedirect());
    },
    registerWithGoogle() {
      this.$store
        .dispatch("auth/signInWithGoogle")
        .then(() => this.successRedirect());
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

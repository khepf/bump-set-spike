<template>
  <v-container class="notfound" fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <h1>Page Not Found</h1>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <p>
          Ooops, we couldn't find what you are looking for. Why don't you
          <router-link :to="{ name: 'Home' }">
            go home instead?
          </router-link>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "landing"
};
</script>

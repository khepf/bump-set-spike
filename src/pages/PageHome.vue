<template>
  <v-container class="landing" fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <h1>HOME PAGE</h1>
        <router-link :to="{ name: 'Forums' }">
          Forums
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "home"
};
</script>

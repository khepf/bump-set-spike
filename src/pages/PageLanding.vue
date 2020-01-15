<template>
  <v-container class="landing" fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <v-img
          src="@/assets/bump-set-spike.png"
          contain
          max-width="800px"
        ></v-img>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="1">
        <v-btn to="/home">Enter</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "home"
};
</script>
<style scoped lang="scss">
.landing {
}
</style>

<template>
  <v-app>
    <v-navigation-drawer
      app
      v-click-outside="closeMobileNavbar"
      v-handle-scroll="closeMobileNavbar"
      class="indigo"
    >
      <ul v-if="user">
        <li>
          <router-link :to="{ name: 'Profile' }">View Profile</router-link>
        </li>
        <li>
          <a @click.prevent="$store.dispatch('auth/signOut')">Sign Out</a>
        </li>
      </ul>
      <ul else>
        <li>
          <router-link :to="{ name: 'SignIn' }">Sign In</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Register' }">Register</router-link>
        </li>
      </ul>
    </v-navigation-drawer>

    <v-app-bar flat app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="mobileNavOpen = !mobileNavOpen"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import clickOutside from "@/directives/click-outside";
import handleScroll from "@/directives/handle-scroll";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "App",
  computed: {
    ...mapGetters({
      user: "auth/authUser"
    })
  },
  components: {},
  directives: {
    clickOutside,
    handleScroll
  },
  data() {
    return {
      userDropdownOpen: false,
      mobileNavOpen: false
    };
  },
  methods: {
    closeMobileNavbar() {
      this.mobileNavOpen = false;
    }
  }
});
</script>

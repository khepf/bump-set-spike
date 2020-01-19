<template>
  <v-container v-if="asyncDataStatus_ready" class="col-full push-top">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8">
        <h1>Welcome to the Forum</h1>
        <CategoryList :categories="categories" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import CategoryList from "@/components/CategoryList";
import asyncDataStatus from "@/mixins/asyncDataStatus";
export default {
  name: "forums",
  components: {
    CategoryList
  },
  mixins: [asyncDataStatus],
  computed: {
    categories() {
      return Object.values(this.$store.state.categories.items);
    }
  },
  methods: {
    ...mapActions("categories", ["fetchAllCategories"]),
    ...mapActions("forums", ["fetchForums"])
  },
  created() {
    this.fetchAllCategories()
      .then(categories =>
        Promise.all(
          categories.map(category =>
            this.fetchForums({ ids: Object.keys(category.forums) })
          )
        )
      )
      .then(() => {
        this.asyncDataStatus_fetched();
      });
  }
};
</script>
<style lang="scss"></style>

<template>
  <v-container>
    <CategoryListItem
      v-for="category in categories"
      :category="category"
      :key="category['.key']"
    />
  </v-container>
</template>

<script>
import CategoryListItem from "./CategoryListItem";
export default {
  components: {
    CategoryListItem
  },
  props: {
    categories: {
      required: true,
      type: Array
    }
  }
};
</script>

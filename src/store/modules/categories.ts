import firebase from "firebase";

export default {
  namespaced: true,

  state: {
    items: {}
  },

  actions: {
    fetchAllCategories({ state, commit }: any) {
      console.log("🔥", "🏷", "all");
      return new Promise((resolve, reject) => {
        firebase
          .database()
          .ref("categories")
          .once("value", snapshot => {
            const categoriesObject = snapshot.val();
            Object.keys(categoriesObject).forEach(categoryId => {
              const category = categoriesObject[categoryId];
              commit(
                "setItem",
                { resource: "categories", id: categoryId, item: category },
                { root: true }
              );
            });
            resolve(Object.values(state.items));
          });
      });
    },

    fetchCategory: ({ dispatch }: any, { id }: any) =>
      dispatch(
        "fetchItem",
        { resource: "categories", id, emoji: "🏷" },
        { root: true }
      ),
    fetchCategories: ({ dispatch }: any, { ids }: any) =>
      dispatch(
        "fetchItems",
        { resource: "categories", ids, emoji: "🏷" },
        { root: true }
      )
  }
};

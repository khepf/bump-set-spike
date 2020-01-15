import firebase from "firebase";

export default {
  fetchItem({ state, commit }: any, { id, emoji, resource }: any) {
    console.log("🔥‍", emoji, id);
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(resource)
        .child(id)
        .once("value", snapshot => {
          commit("setItem", {
            resource,
            id: snapshot.key,
            item: snapshot.val()
          });
          resolve(state[resource].items[id]);
        });
    });
  },

  fetchItems({ dispatch }: any, { ids, resource, emoji }: any) {
    ids = Array.isArray(ids) ? ids : Object.keys(ids);
    return Promise.all(
      ids.map((id: any) => dispatch("fetchItem", { id, resource, emoji }))
    );
  }
};

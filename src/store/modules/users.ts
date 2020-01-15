import { countObjectProperties, removeEmptyProperties } from "@/utils";
import firebase from "firebase";
import Vue from "vue";
import { makeAppendChildToParentMutation } from "@/store/assetHelpers";

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {
    userPosts: (state: any, getters: any, rootState: any) => (id: any) => {
      const user = state.items[id];
      if (user.posts) {
        return Object.values(rootState.posts.items).filter(
          (post: any) => post.userId === id
        );
      }
      return [];
    },

    userThreadsCount: (state: any) => (id: any) =>
      countObjectProperties(state.items[id].threads),
    userPostsCount: (state: any) => (id: any) =>
      countObjectProperties(state.items[id].posts)
  },

  actions: {
    createUser(
      { state, commit }: any,
      { id, email, name, username, avatar = null }: any
    ) {
      return new Promise((resolve, reject) => {
        const registeredAt = Math.floor(Date.now() / 1000);
        const usernameLower = username.toLowerCase();
        email = email.toLowerCase();
        const user = {
          avatar,
          email,
          name,
          username,
          usernameLower,
          registeredAt
        };
        firebase
          .database()
          .ref("users")
          .child(id)
          .set(user)
          .then(() => {
            commit(
              "setItem",
              { resource: "users", id: id, item: user },
              { root: true }
            );
            resolve(state.items[id]);
          });
      });
    },

    updateUser({ commit }: any, user: any) {
      const updates = {
        avatar: user.avatar,
        username: user.username,
        name: user.name,
        bio: user.bio,
        website: user.website,
        email: user.email,
        location: user.location
      };
      return new Promise((resolve, reject) => {
        firebase
          .database()
          .ref("users")
          .child(user[".key"])
          .update(removeEmptyProperties(updates))
          .then(() => {
            commit("setUser", { userId: user[".key"], user });
            resolve(user);
          });
      });
    },

    fetchUser: ({ dispatch }: any, { id }: any) =>
      dispatch(
        "fetchItem",
        { resource: "users", id, emoji: "🙋" },
        { root: true }
      ),
    fetchUsers: ({ dispatch }: any, { ids }: any) =>
      dispatch(
        "fetchItems",
        { resource: "users", ids, emoji: "🙋" },
        { root: true }
      )
  },

  mutations: {
    setUser(state: any, { user, userId }: any) {
      Vue.set(state.items, userId, user);
    },

    appendPostToUser: makeAppendChildToParentMutation({
      parent: "users",
      child: "posts"
    }),
    appendThreadToUser: makeAppendChildToParentMutation({
      parent: "users",
      child: "threads"
    })
  }
};

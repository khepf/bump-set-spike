import { makeAppendChildToParentMutation } from "@/store/assetHelpers";

export default {
  namespaced: true,

  state: {
    items: {}
  },

  actions: {
    fetchForum: ({ dispatch }: any, { id }: any) =>
      dispatch(
        "fetchItem",
        { resource: "forums", id, emoji: "🌧" },
        { root: true }
      ),
    fetchForums: ({ dispatch }: any, { ids }: any) =>
      dispatch(
        "fetchItems",
        { resource: "forums", ids, emoji: "🌧" },
        { root: true }
      )
  },

  mutations: {
    appendThreadToForum: makeAppendChildToParentMutation({
      parent: "forums",
      child: "threads"
    })
  }
};

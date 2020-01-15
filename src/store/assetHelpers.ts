import Vue from "vue";

export const makeAppendChildToParentMutation = ({ parent, child }: any) => (
  state: any,
  { childId, parentId }: any
) => {
  const resource = state.items[parentId];
  if (!resource[child]) {
    Vue.set(resource, child, {});
  }
  Vue.set(resource[child], childId, childId);
};

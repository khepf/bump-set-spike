import Vue from "vue";

export default {
  setItem(state: any, { item, id, resource }: any) {
    item[".key"] = id;
    Vue.set(state[resource].items, id, item);
  }
};

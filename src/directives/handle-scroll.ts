export default {
  bind(el: any, binding: any) {
    el.__HandleScrollHandler__ = (event: any) => binding.value(event);
    document.body.addEventListener("mousewheel", el.__HandleScrollHandler__);
    document.body.addEventListener("touchmove", el.__HandleScrollHandler__);
  },

  unbind(el: any) {
    document.body.removeEventListener("mousewheel", el.__HandleScrollHandler__);
    document.body.removeEventListener("touchmove", el.__HandleScrollHandler__);
  }
};

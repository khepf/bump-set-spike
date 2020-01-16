export default {
  bind(el: any, binding: any) {
    el.__ClickOutsideHandler__ = (event: any) => {
      // check if event's target is the el or contained by el
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener("click", el.__ClickOutsideHandler__);
  },
  unbind(el: any) {
    document.body.removeEventListener("click", el.__ClickOutsideHandler__);
  }
};

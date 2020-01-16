export default {
  data() {
    return {
      asyncDataStatus_ready: false
    };
  },

  methods: {
    asyncDataStatus_fetched(): any {
      this.asyncDataStatus_ready = true;
      this.$emit("ready");
    }
  }
};

export const appAlert = {
  state: {
    isClicked: false,
    defAlert: {
      text: "Hello from store",
      type: "info",
    },
    height: false,
  },

  actions: {
    successSave(context) {
      context.commit("clickAlert", true);
      context.commit("setMessage", {
        text: "Данные успешно сохранены",
        type: "warning",
      });
    },
    callAlert(context, data) {
      context.commit("setMessage", data);
      context.commit("setHeight", true);
      context.commit("clickAlert", true);
    },
  },

  mutations: {
    setHeight(state, height) {
      state.height = height;
    },
    clickAlertWide(state, flag) {
      state.height = true;
      state.isClicked = flag;
    },
    clickAlert(state, flag) {
      state.height = false;
      state.isClicked = flag;
    },
    setMessage(state, message) {
      state.defAlert.text = message.text;
      state.defAlert.type = message.type;
    },
  },

  getters: {
    isClicked: (state) => state.isClicked,
    defAlert: (state) => state.defAlert,
    height: (state) => state.height,
  },
};

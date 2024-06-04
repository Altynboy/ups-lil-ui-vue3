export const appAlert = {
  state: () => ({
    isClicked: false,
    height: false,
    text: 'Hello from store',
    type: 'info'
  }),

  // getters: {
  //   isClicked: (state) => state.isClicked,
  //   defAlert: (state) => state.defAlert,
  //   height: (state) => state.height
  // },

  actions: {
    callWarn(msg) {
      this.callAlert({
        text: msg,
        type: 'warning'
      })
    },
    callInfo(msg) {
      this.callAlert({
        text: msg,
        type: 'info'
      })
    },
    callErr(msg) {
      this.callAlert({
        text: msg,
        type: 'error'
      })
    },
    callSuccess(msg) {
      this.callAlert({
        text: msg,
        type: 'success'
      })
    },
    callAlert(data) {
      this.setDefAlert(data)
      this.setHeight(true)
      this.clickAlert(true)
    },
    setHeight(height) {
      this.height = height
    },
    clickAlertWide(flag) {
      this.height = true
      this.isClicked = flag
    },
    clickAlert(flag) {
      this.height = false
      this.isClicked = flag
    },
    setDefAlert(data) {
      this.text = data.text
      this.type = data.type
    }
  }
}

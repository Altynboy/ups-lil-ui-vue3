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
    successSave() {
      this.clickAlert(true)
      this.setMessage({
        text: 'Данные успешно сохранены',
        type: 'warning'
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

# ups-lil-ui-vue3

> Lil UI library with customizable inputs, icon loader and modal notification

- 💡 Intuitive
- 🔧 Customizable
- 🪶 Lightweight
- ✨ Beautiful design

## Installation

### npm

```bash
npm install --save ups-lil-ui-vue3
```

### yarn

```bash
yarn add ups-lil-ui-vue3
```

## Usage

### Example of importing a component and its CSS:

```js
import { InputIIN } from 'ups-lil-ui-vue3'
import 'ups-lil-ui-vue3/style.css'
```

## Components

List of all components:

| Component       | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| FormInput       | Customizable base input component                                 |
| VueTooltip      | Tooltip component                                                 |
| IconBase        | Base component to load SVG icons                                  |
| CodeInput       | Verification code input component                                 |
| BaseTransition  | Transition using CSS `opacity`                                    |
| SlideTransition | Transition using CSS `opacity` and `translateY`                   |
| UserDevider     | User divider component                                            |
| DefaultAlert    | Modal alert window component                                      |
| CustomSelect    | Customizable select dropdown component                            |
| TableLite       | Lightweight table component                                       |
| CustomTable     | Full-featured table component                                     |
| ModalWindow     | General-purpose modal window component                            |
| SpinnerLoader   | Loading spinner component                                         |
| appAlertVue     | Vuex store module for `DefaultAlert` (Vue 3 + Vuex 4)             |
| appAlertPinia   | Pinia store definition for `DefaultAlert` (recommended for Vue 3) |

### Inputs

List of all input components:

| Component       | Description                                            |
| --------------- | ------------------------------------------------------ |
| InputAcc        | Account input component                                |
| InputBik        | Bank Identification Code (BIK) input component         |
| InputBin        | Business Identification Number (BIN) input component   |
| InputEmail      | Email input component                                  |
| InputFIO        | Full name input component                              |
| InputIIN        | Individual Identification Number (IIN) input component |
| InputKbe        | Bank Entity Code (KBE) input component                 |
| InputPassword   | Password input with show/hide toggle                   |
| InputPhone      | Phone number input component                           |
| InputPhoneLogin | Phone number login input component                     |
| InputTariff     | Tariff input component                                 |

<br>

Usage:

```html
<InputIIN v-model="iin" />
```

### Custom Input (FormInput)

```html
<template>
  <FormInput
    v-model="inputValue"
    title="Input Title"
    :max="30"
    :min="1"
    warningMsg="Warning Message"
    tooltipMsg="Tooltip Message"
    rule="^[0-9А-Яа-я\-\s]+$"
    warningFlag="true"
    syntax="^[0-9А-Яа-я\-\s]$"
    :capitalize="true"
    :column="false"
    :decimal="false"
    placeholder="Placeholder Text"
    :mobile="false"
  />
</template>

<script>
  import { FormInput } from 'ups-lil-ui-vue3'

  export default {
    components: { FormInput },
    data() {
      return { inputValue: '' }
    }
  }
</script>
```

| Prop        | Type    | Default Value        | Description                                 |
| ----------- | ------- | -------------------- | ------------------------------------------- |
| v-model     | String  |                      | The value of the input field                |
| title       | String  |                      | Label for the input field                   |
| max         | Number  | 30                   | Maximum character limit                     |
| min         | Number  | 1                    | Minimum character limit                     |
| warningMsg  | String  |                      | Warning message shown when input is invalid |
| tooltipMsg  | String  |                      | Tooltip message                             |
| rule        | String  | `^[0-9А-Яа-я\-\s]+$` | Regex rule for full input validation        |
| warningFlag | Boolean | false                | Enable warning message display              |
| syntax      | String  | `^[0-9А-Яа-я\-\s]$`  | Regex for per-character validation          |
| capitalize  | Boolean | false                | Capitalize input text                       |
| column      | Boolean | false                | Enable column layout                        |
| decimal     | Boolean | false                | Allow decimal input                         |
| placeholder | String  |                      | Placeholder text                            |
| mobile      | Boolean | false                | Enable mobile-specific input features       |

<br>

| Event Name | Data Type | Description                                                  |
| ---------- | --------- | ------------------------------------------------------------ |
| input      | String    | Emits the updated input value whenever the input changes     |
| valid      | Boolean   | Emits a boolean indicating whether the input is valid or not |

### Modal Alert Window (DefaultAlert)

Usage without store (`useStore: false`):

```html
<DefaultAlert
  alert-text="This is an alert"
  alert-type="warning"
  :use-store="false"
  :is-clicked="isClicked"
  @update:is-clicked="isClicked = false"
/>
```

| Prop          | Type    | Default Value        | Description                                              |
| ------------- | ------- | -------------------- | -------------------------------------------------------- |
| alert-type    | String  | `"info"`             | Type of the alert: `info`, `warning`, `error`, `success` |
| use-store     | Boolean | `true`               | Whether to use an injected store for state               |
| alert-text    | String  | `"This is an alert"` | Text content of the alert                                |
| is-clicked    | Boolean | `false`              | Controls alert visibility when `use-store` is false      |
| wide          | Boolean | `false`              | Makes the alert taller                                   |
| color-info    | String  | `"#2585EE"`          | Border color for info alerts                             |
| color-warning | String  | `"#FFCF40"`          | Border color for warning alerts                          |
| color-error   | String  | `"#F2363B"`          | Border color for error alerts                            |
| color-success | String  | `"#22C993"`          | Border color for success alerts                          |

<br>

| Event Name        | Data Type | Description                                                             |
| ----------------- | --------- | ----------------------------------------------------------------------- |
| update:is-clicked | Boolean   | Emitted to close the alert (use with `v-model` or `@update:is-clicked`) |

### Using DefaultAlert with Pinia store (recommended for Vue 3)

```js
// stores/alertStore.js
import { defineStore } from 'pinia'
import { appAlertPinia } from 'ups-lil-ui-vue3'

export const useAlertStore = defineStore('alert', appAlertPinia)
```

Then provide it to `DefaultAlert` via `provide/inject` in your root component:

```js
// App.vue
import { useAlertStore } from './stores/alertStore'

const alertStore = useAlertStore()
provide('alertStore', alertStore)
```

Call the alert from anywhere:

```js
alertStore.callInfo('Data saved successfully')
alertStore.callWarn('Something looks off')
alertStore.callErr('An error occurred')
alertStore.callSuccess('Operation completed')
```

### Using DefaultAlert with Vuex 4 store (Vue 3 + Vuex 4)

```js
// store/index.js
import { createStore } from 'vuex'
import { appAlertVue } from 'ups-lil-ui-vue3'

export const store = createStore({
  modules: {
    alert: appAlertVue
  }
})
```

Call the alert via Vuex actions:

```js
methods: {
  callAlert(text, type) {
    this.$store.dispatch('callAlert', { text, type })
  },
  onBtnClick() {
    this.callAlert('Button clicked!', 'info')
  }
}
```

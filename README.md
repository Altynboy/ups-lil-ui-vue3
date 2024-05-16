# ups-lil-ui-vue3

> Lil ui library with customazable inputs, icon loader and modal notification

- 💡Intuitive
- 🔧Customazible
- 🪶Lighweight
- ✨Beauty design

## Installation

### npm

```bash
# or yarn
npm install --save ups-lil-ui-vue3
```

### yarn

```bash
yarn add ups-lil-ui-vue3
```

## Usage

### Example of importing component and css file:

```js
import { InputIIN } from 'ups-lil-ui-vue3'
import 'ups-lil-ui-vue3/style.css'
```

## Components

List of all components:

| Component       | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| FormInput       | Customizable input component                                   |
| VueTooltip      | Tooltip component                                              |
| IconBase        | Base component to load icons                                   |
| CodeInput       | Verification code input component                              |
| BaseTransition  | Transition using css `opacity`                                 |
| SlideTransition | Transition using css `opacity` and `translateY`                |
| UserDivider     | Component for user divider                                     |
| DefaultAlert    | Modal alert window component                                   |
| appAlert        | Store object for `DefaultAlert` component (not tested in Vue3) |

### Inputs

List of all inputs components:

| Component       | Description                                            |
| --------------- | ------------------------------------------------------ |
| InputAcc        | Account input component                                |
| InputBik        | Bank Identification Code (BIK) input component         |
| InputBin        | Business Identification Number (BIN) input component   |
| InputEmail      | Email input component                                  |
| InputFIO        | Full name input component                              |
| InputIIN        | Individual Identification Number (IIN) input component |
| InputKbe        | Bank Entity Code (KBE) input component                 |
| InputPhone      | Phone number input component                           |
| InputPhoneLogin | Phone number login input component                     |
| InputTariff     | Tariff input component                                 |

<br>

Usage:

```js
<InputIIN v-model="iin"></InputIIN>
```

### Custom Input

```js
<template>
  <FormInput
    v-model="inputValue"
    title="Input Title"
    :max="30"
    :min="1"
    warningMsg="Warning Message"
    tooltipMsg="Tooltip Message"
    rule="^[0-9А-Яа-я\\-\\s]+$"
    warningFlag="true"
    sintax="^[0-9А-Яа-я\\-\\s]$"
    :capitalize="true"
    :column="false"
    :decimal="false"
    placeholder="Placeholder Text"
    :mobile="false"
  />
</template>

<script>
import { FormInput } from "ups-lil-ui-vue3";

export default {
  components: { FormInput },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  }
};
</script>
```

| Prop        | Type    | Default Value          | Description                                      |
| ----------- | ------- | ---------------------- | ------------------------------------------------ |
| value       | String  |                        | The value of the input field (v-model)           |
| title       | String  |                        | Title for the input field                        |
| max         | Number  | 30                     | Maximum character limit for the input field      |
| min         | Number  | 1                      | Minimum character limit for the input field      |
| warningMsg  | String  |                        | Warning message to display when input is invalid |
| tooltipMsg  | String  |                        | Tooltip message to display                       |
| rule        | String  | "^[0-9А-Яа-я\\-\\s]+$" | Regular expression rule for input validation     |
| warningFlag | Boolean | false                  | Flag to enable warning message display           |
| sintax      | String  | "^[0-9А-Яа-я\\-\\s]$"  | Regular expression for character validation      |
| capitalize  | Boolean | false                  | Flag to capitalize input text                    |
| column      | Boolean | false                  | Flag to enable column layout                     |
| decimal     | Boolean | false                  | Flag to allow decimal input                      |
| placeholder | String  |                        | Placeholder text for the input field             |
| mobile      | Boolean | false                  | Flag to enable mobile-specific input features    |

<br>

| Event Name | Data Type | Description                                                   |
| ---------- | --------- | ------------------------------------------------------------- |
| input      | String    | Emits the updated input value whenever the input changes.     |
| valid      | Boolean   | Emits a boolean indicating whether the input is valid or not. |

### Modal alert window:

```js
<DefaultAlert
    text="This is an alert"
    alert-type="warning"
    :use-store="false"
    :is-clicked="isClicked"
    @update:is-clicked="isClicked = false">
</DefaultAlert>
```

| Prop          | Type    | Default Value      | Description                                       |
| ------------- | ------- | ------------------ | ------------------------------------------------- |
| alert-type    | String  | "info"             | Type of the alert (info, warning, error, success) |
| useStore      | Boolean | true               | Indicates whether to use store                    |
| color-info    | String  | "#2585EE"          | Color for info alerts                             |
| color-warning | String  | "#FFCF40"          | Color for warning alerts                          |
| color-error   | String  | "#F2363B"          | Color for error alerts                            |
| color-success | String  | "#22C993"          | Color for success alerts                          |
| isClicked     | Boolean | false              | Indicates if the alert has been clicked           |
| alert-text    | String  | "This is an alert" | Text content of the alert                         |
| wide          | Boolean | false              | Indicates if the alert should be wide             |

<br>

> Use event below to close modal window without store>
> <br>

| Event Name        | Data Type | Description                              |
| ----------------- | --------- | ---------------------------------------- |
| update:is-clicked | Boolean   | Emits an event to update is-clicked prop |

> Warning: Doesn't tested in vue3

if u want to use store to call `DefaultAlert` u need additional import:

```js
import Vue from 'vue'
import Vuex from 'vuex'

import appAlert from 'ups-lil-ui-vue3'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    alert: appAlert
  }
})
```

Then u can use it like this:

```js
methods: {
    callAlert(text, type) {
        var alert = {
            text: "",
            type: null,
        };
        alert.text = text;
        alert.type = type;
        this.$store.commit("clickAlertWide", true);
        this.$store.commit("setMessage", alert);
    },
    onBtnClick() {
        this.callAlert("Buttn clicked!", "info")
    }
}
```

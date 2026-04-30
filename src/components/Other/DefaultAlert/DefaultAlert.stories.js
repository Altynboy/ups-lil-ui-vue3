import DefaultAlert from './DefaultAlert.vue';

export default {
  title: 'Other/DefaultAlert',
  component: DefaultAlert,
  tags: ['autodocs'],
  argTypes: {
    'alert-type': {
      control: 'select',
      options: ['info', 'warning', 'error', 'success'],
    },
  },
};

export const Default = {
  args: {
    useStore: false,
    isClicked: true,
    'alert-type': 'info',
    'alert-text': 'This is an info alert',
  },
};

export const Warning = {
  args: {
    useStore: false,
    isClicked: true,
    'alert-type': 'warning',
    'alert-text': 'This is a warning alert',
  },
};

export const Error = {
  args: {
    useStore: false,
    isClicked: true,
    'alert-type': 'error',
    'alert-text': 'This is an error alert',
  },
};

export const Success = {
  args: {
    useStore: false,
    isClicked: true,
    'alert-type': 'success',
    'alert-text': 'This is a success alert',
  },
};

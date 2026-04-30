import FormInput from './FormInput.vue';

export default {
  title: 'Base/FormInput',
  component: FormInput,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    modelValue: '',
    label: 'Standard Input',
    placeholder: 'Enter text...',
  },
};

export const WithWarning = {
  args: {
    modelValue: 'Invalid',
    label: 'Input with Warning',
    warningFlag: true,
    warningMsg: 'This input has a warning',
  },
};

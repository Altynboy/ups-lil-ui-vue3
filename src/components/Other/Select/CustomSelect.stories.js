import CustomSelect from './CustomSelect.vue';

export default {
  title: 'Other/CustomSelect',
  component: CustomSelect,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Select an Option',
    options: [
      { value: '1', text: 'Option 1' },
      { value: '2', text: 'Option 2' },
      { value: '3', text: 'Option 3' },
    ],
  },
};

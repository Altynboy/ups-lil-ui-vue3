import ModalWindow from './ModalWindow.vue';

export default {
  title: 'Other/ModalWindow',
  component: ModalWindow,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    show: true,
    title: 'Sample Modal',
    closeIcon: true,
  },
};

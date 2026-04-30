import BaseTransition from './BaseTransition.vue';

export default {
  title: 'Other/Transitions/BaseTransition',
  component: BaseTransition,
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => ({
    components: { BaseTransition },
    setup() {
      return { args };
    },
    template: `
      <div>
        <button @click="show = !show" style="margin-bottom: 20px;">Toggle</button>
        <BaseTransition v-bind="args">
          <div v-if="show" style="padding: 20px; background: #eee; border: 1px solid #ccc; max-width: 300px;">
            This content fades in and out!
          </div>
        </BaseTransition>
      </div>
    `,
    data() {
      return { show: true };
    }
  }),
  args: {
    duration: 300,
  },
};

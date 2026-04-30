import SlideTransition from './SlideTransition.vue';

export default {
  title: 'Other/Transitions/SlideTransition',
  component: SlideTransition,
  tags: ['autodocs'],
};

export const Default = {
  render: (args) => ({
    components: { SlideTransition },
    setup() {
      return { args };
    },
    template: `
      <div>
        <button @click="show = !show" style="margin-bottom: 20px;">Toggle</button>
        <SlideTransition v-bind="args">
          <div v-if="show" style="padding: 20px; background: #eee; border: 1px solid #ccc; max-width: 300px;">
            This content slides in and out!
          </div>
        </SlideTransition>
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

import TableLite from './TableLite.vue';

export default {
  title: 'Other/TableLite',
  component: TableLite,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    tableData: {
      headers: ['A', 'B', 'C'],
      data: [
        [1, 2, 3],
        [4, 5, 6]
      ]
    },
  },
};

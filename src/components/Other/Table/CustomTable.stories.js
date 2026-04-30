import CustomTable from './CustomTable.vue';

export default {
  title: 'Other/CustomTable',
  component: CustomTable,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    name: 'Users Data',
    tableData: {
      headers: ['ID', 'Name', 'Role'],
      data: [
        [1, 'Alice', 'Admin'],
        [2, 'Bob', 'User'],
        [3, 'Charlie', 'Manager']
      ]
    },
  },
};

const Admin = () => import('Admin/Admin.vue');
const Dashboard = () => import('Admin/Dashboard.vue');
const Products = () => import('Admin/Products/Products.vue');
const ProductsTable = () => import('Admin/Products/ProductsTable/ProductsTable.vue');
const Product = () => import('Admin/Products/Product/Product.vue');

const Users = () => import('Admin/Users/Users.vue');
const UsersTable = () => import('Admin/Users/UsersTable/UsersTable.vue');
const UsersForm = () => import('Admin/Users/UsersForm/UsersForm.vue');

export default {
  path: '/admin',
  // name: 'admin',
  component: Admin,
  children: [
    {
      path: '',
      name: 'admin',
      component: Dashboard,
    },
    {
      path: 'products',
      component: Products,
      children: [
        {
          path: '',
          component: ProductsTable,
        },
        {
          path: 'new',
          component: Product,
        },
      ],
    },
    {
      path: 'users',
      component: Users,
      children: [
        {
          path: '',
          component: UsersTable,
        },
        {
          path: 'new',
          component: UsersForm,
        },
      ],
    },
  ],
};

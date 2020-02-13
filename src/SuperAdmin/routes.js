import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Institute = React.lazy(() => import('./views/Institute/Institute'));
const Category = React.lazy(() => import('./views/Category/Category'));
const AddCategory = React.lazy(() => import('./views/Category/AddCategory'));

const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  //Institute
  { path: '/institute', exact: true, name: 'Institute', component: Institute },
  { path: '/institute/list', exact: true, name: 'List', component: Institute },
  //Category
  { path: '/category', exact: true, name: 'Category', component: Category },
  { path: '/category/list', exact: true, name: 'List', component: Category },
  { path: '/category/add', exact: true, name: 'Add', component: AddCategory },
  { path: '/category/edit', exact: true, name: 'Edit', component: AddCategory },
];

export default routes;

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */

// these are bad practice, won't happen in real world application
const getUserRole = localStorage.getItem('userRole');
let routes = [];

if(getUserRole === 'learner') {
  routes = [
    {
      path: '/app/dashboard', // the url
      icon: 'HomeIcon', // the component being exported from icons/index.js
      name: 'Dashboard', // name that appear in Sidebar
    },
    {
      path: '/app/courses/',
      icon: 'FormsIcon',
      name: 'Courses',
    },
    // {
    //   path: '/app/buttons',
    //   icon: 'ButtonsIcon',
    //   name: 'Buttons',
    // },
    // {
    //   path: '/app/modals',
    //   icon: 'ModalsIcon',
    //   name: 'Modals',
    // },
    // {
    //   path: '/app/tables',
    //   icon: 'TablesIcon',
    //   name: 'Tables',
    // },
    // {
    //   icon: 'PagesIcon',
    //   name: 'Pages',
    //   routes: [
    //     // submenu
    //     {
    //       path: '/login',
    //       name: 'Login',
    //     },
    //     {
    //       path: '/create-account',
    //       name: 'Create account',
    //     },
    //     {
    //       path: '/forgot-password',
    //       name: 'Forgot password',
    //     },
    //     {
    //       path: '/app/404',
    //       name: '404',
    //     },
    //     {
    //       path: '/app/blank',
    //       name: 'Blank',
    //     },
    //   ],
    // },
  ]
} else if (getUserRole === 'provider'){
  routes = [
    {
      path: '/app/dashboard', // the url
      icon: 'HomeIcon', // the component being exported from icons/index.js
      name: 'Dashboard', // name that appear in Sidebar
    },
    {
      path: '/app/courses/master',
      icon: 'FormsIcon',
      name: 'Courses',
    },
    {
      path: '/app/modules',
      icon: 'CardsIcon',
      name: 'Modules',
    },
    {
      path: '/app/activities',
      icon: 'ChartsIcon',
      name: 'Activity',
    },
  ]
} else {
  routes = [
    {
      path: '/app/dashboard', // the url
      icon: 'HomeIcon', // the component being exported from icons/index.js
      name: 'Dashboard', // name that appear in Sidebar
    },
    {
      path: '/app/courses/master',
      icon: 'FormsIcon',
      name: 'Courses',
    },
    {
      path: '/app/modules',
      icon: 'CardsIcon',
      name: 'Modules',
    },
    {
      path: '/app/activities',
      icon: 'ChartsIcon',
      name: 'Activity',
    },
    {
      path: '/app/users',
      icon: 'ChartsIcon',
      name: 'User Management',
    },
  ]
}


export default routes

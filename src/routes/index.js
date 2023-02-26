import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const CourseLearner = lazy(() => import('../pages/course/learner'))
const Courses = lazy(() => import('../pages/course/master'))
const CoursesCreate = lazy(() => import('../pages/course/master/create'))
const CoursesView = lazy(() => import('../pages/course/learner/view'))
const Users = lazy(() => import('../pages/user/index'))
const UsersCreate = lazy(() => import('../pages/user/create'))
const Modules = lazy(() => import('../pages/module'))
const ModulesCreate = lazy(() => import('../pages/module/create'))
const Activity = lazy(() => import('../pages/activity/'))
const ActivitiesCreate = lazy(() => import('../pages/activity/create'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/courses',
    component: CourseLearner,
  },
  {
    path: '/courses/view',
    component: CoursesView,
  },
  {
    path: '/courses/master',
    component: Courses,
  },
  {
    path: '/courses/master/create',
    component: CoursesCreate,
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/users/create',
    component: UsersCreate,
  },
  {
    path: '/modules',
    component: Modules,
  },
  {
    path: '/modules/create',
    component: ModulesCreate,
  },
  {
    path: '/activities',
    component: Activity,
  },
  {
    path: '/activities/create',
    component: ActivitiesCreate,
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes

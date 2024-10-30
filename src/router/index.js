
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotFound from "../views/NotFound.vue";
import BlogPage from "../views/BlogPage.vue";
import ProtectRoute from "../components/ProtectRouter.vue"; // تأكد من استيراد المكون بشكل صحيح

const routes = [
  {
    path: '/home',
    name: 'Home',
   
    children: [
      {
        name: 'Home',
        path: '/home',
        component: () => import('../views/HomeView.vue'), // مكون Checkout
      },
    ],
  },
  {
    path: '/product',
    name: 'product',

    children: [
      {
        name: 'product',
        path: '',
        component: () => import('../views/ProductPage.vue'), // مكون Checkout
      },
    ],
  },
  {
    path: '/checkout',
    name: 'heckout',

    children: [
      {
        path: '',
        name: 'heckout',
        component: () => import('../components/CheckOut.vue'), // مكون Checkout
      },
    ],
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/allorders',
    name: 'allorders',
    component: () => import('../components/Allorders.vue'),
  },

  {
    path: '/cartpage',
    name: 'cartpage',

    children: [
      {
        name: 'cartpage',
        path: '',
        component: () => import('@/views/CartPage.vue'),
      },
    ],
  },
  {
    path: '/forgetpassword',
    name: 'forgetpassword',
    component: () => import('@/views/ForgetPassword.vue'),
  },
  {
    path: '/Resetpass',
    name: 'Resetpass',
    component: () => import('@/views/ResetPassword.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/blog',
    name: 'Blog',

    children: [
      {
        path: '',
        name: 'Blog',
        component: () => import(/* webpackChunkName: "about" */ '../views/BlogPage.vue'),
      },
    ],
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',

    children: [
      {
        path: '',
        name: 'ProductDetails',
        component: () => import('@/views/ProductDetails.vue'), // مكون تفاصيل المنتج
      },
    ],
  },
  {
    path: '/about',
    name: 'About',

    children: [
      {
        path: '',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router;


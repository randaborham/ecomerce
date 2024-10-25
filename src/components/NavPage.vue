<template>
  <Disclosure as="nav" class="bg-gray-50 px-[10px]" v-slot="{ open }">
    <div class="mx-auto max-w-7xl lg:px-2 sm:px-6 lg:px-6 h-[20px]">
      <div class="relative flex justify-between">

        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto me-[50px] lg:me-[0px]" :src="logoImg" alt="Your Company" />
          </div>
          <div class="hidden sm:ml-6 sm:block items-center justify-center">
            <div class="flex items-center justify-center">
              <ul class="flex items-center justify-center mt-[5px]">
                <li
                  v-for="route in router.options.routes"
                  :key="route.name"
                >
                  <router-link
                    v-if="
                      route.name !== 'NotFound' &&
                      (
                        (!isLoggedIn && 
                          (route.name === 'home' || route.name === 'about' || route.name === 'contact') 
                        ) ||
                        (isLoggedIn &&
                          route.name !== 'NotFound' &&
                      route.name !== 'login' &&
                      route.name !== 'ProductDetails' &&
                      route.name !== 'allorders' &&
                      route.name !== 'cartpage' &&
                      route.name !== 'heckout'&&
                      route.name !== 'signup'&&
                      route.name !== 'forgetpassword'&&
                      route.name !=='Resetpass'
                        )
                      )
                    "
                    :to="route.path"
                    class="transition-colors duration-300 m-[10px]"
                  >
                    {{ route.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="absolute inset-y-0 right-0 gap-[10px] flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <router-link to="/cartpage" class="relative me-[10px] mt-[15px] hidden lg:block">
            <p class="rounded-full h-[30px] w-[30px] absolute top-[-30px] bg-[#0aad0a] p-1 text-white">
              {{ cart.products?.length }}
            </p>
            <ShoppingCartIcon class="h-6 w-6" aria-hidden="true" />
          </router-link>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3 ">
            <div>
              <MenuButton class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[ active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[ active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a @click.prevent="handleLogout" href="#" :class="[ active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

          <router-link v-if="!isLoggedIn" to="/signup" class="ms-3">Sign up</router-link>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-5">
        <ul>
          <li v-for="route in router.options.routes" :key="route.name" class="flex items-center">
            <router-link
              v-if="
                route.name !== 'NotFound' &&
                (
                  (!isLoggedIn && 
                    (route.name === 'home' || route.name === 'about' || route.name === 'contact') 
                  ) ||
                  (isLoggedIn &&
                      route.name !== 'NotFound' &&
                      route.name !== 'login' &&
                      route.name !== 'ProductDetails' &&
                      route.name !== 'allorders' &&
                      route.name !== 'cartpage' &&
                      route.name !== 'heckout'&&
                      route.name !== 'signup'&&
                      route.name !== 'forgetpassword'&&
                      route.name !=='Resetpass'
                  )
                )
              "
              :to="route.path"
              class="transition-colors duration-300 my-[8px]"
            >
              {{ route.name }}
            </router-link>
          </li>
          
          <!-- رابط سلة التسوق -->
          <li>
          <router-link to="/cartpage" class="me-[14px] mt-[15px] flex justify-between">
  <p class="rounded-full h-[30px] w-[30px] bg-[#0aad0a] text-white  flex justify-center items-center">
    {{ cart.products?.length }}
  </p>
  <ShoppingCartIcon class="h-6 w-6 me-[-30px]" aria-hidden="true" />
</router-link>

          </li>
        </ul>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import logoImg from "../assets/freshcart-logo.svg";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from "@headlessui/vue";

import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";

const store = useStore();
const router = useRouter();

// دالة تسجيل الخروج
const handleLogout = async () => {
  await store.dispatch("logout");
           router.push('/').then(() => {
        // إعادة تحميل الصفحة بعد التوجيه
        window.location.reload();
      });
};

// حالة تسجيل الدخول
const isLoggedIn = computed(() => store.state.isLoggedIn);

// الحصول على حالة سلة التسوق
const cart = computed(() => store.state.cart);

// جلب سلة التسوق عند تحميل المكون
onMounted(async () => {
  await store.dispatch("getCart");
});
</script>

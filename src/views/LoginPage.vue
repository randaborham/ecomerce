<template>
  <div class=" my-5 py-[80px]">
   <div class="w-[80%] m-auto">
     <h5 class="  mb-3 font-bold text-[30px]" :style="{ color: '#0aad0a' }">Login Now:</h5>
    <div  v-if="errMessage" class="lg:w-[80%] m-auto  bg-red-100 border border-red-400 text-red-700 lg:px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Error!</strong>
  <span class="block sm:inline">{{ errMessage }}.</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="errMessage =''">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
   </div>
   </div>
  
    <form >
      <div class="lg:w-[80%] m-auto">
        <form  @submit.prevent="onSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input v-model="form.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
            <div v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</div>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input v-model="form.password" class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
            <div v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</div>
          </div>
          <div class="flex items-center justify-between">
            <button @click="onSubmit" class="bg-[#0aad0a] hover:bg-[#0aaa0a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign In
            </button>
            <router-link to="/forgetpassword" class="inline-block align-baseline font-bold text-sm text-black">
              Forgot Password?
            </router-link>
          </div>
        </form>
     
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { z } from 'zod';
import { useStore } from "vuex";
import { onMounted, computed } from "vue";

// تعريف مخطط Zod للتحقق من صحة البيانات
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});
const isLoggedIn = computed(() => store.state.isLoggedIn);

const cart = computed(() => store.state.cart);
export default {
  
  setup() {
    const form = ref({
      email: '',
      password: ''
    });
    const errors = ref({});
    const store = useStore();
    const errMessage = ref('');
    const isSubmitting = ref(false);

    const router = useRouter();

    const validateForm = () => {
      // استخدام Zod للتحقق من صحة المدخلات
      const result = loginSchema.safeParse(form.value);
      if (!result.success) {
        const zodErrors = result.error.format();
        errors.value = {
          email: zodErrors.email?._errors[0],
          password: zodErrors.password?._errors[0]
        };
        return false;
      }
      errors.value = {};
      return true;
    };

    const onSubmit = async ({store}) => {

      errMessage.value = '';
      if (!validateForm()) return; // التحقق من صحة المدخلات قبل الإرسال

      isSubmitting.value = true;
      try {
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', form.value);
        if (data.message === 'success') {
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userId', data.user.id);
              router.push('/home').then(() => {
        // إعادة تحميل الصفحة بعد التوجيه
        window.location.reload();
      });
          await store.dispatch("login");
          await store.dispatch("getCart");
    
        }
      } catch (error) {
        errMessage.value = error.response?.data?.message || 'An error occurred';
        console.log(error);
      } finally {
        isSubmitting.value = false;
      }
    };
const isLoggedIn = computed(() => store.state.isLoggedIn);
    return {
      form,
      errors,
      errMessage,
      isSubmitting,
      onSubmit,
      cart,
      isLoggedIn
    };
  } 
};
</script>

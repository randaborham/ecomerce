<template>
  <div class="my-5">
    <div class="w-[80%] m-auto">
      <h5 class="mb-3 font-bold text-[30px]" :style="{ color: '#0aad0a' }">Reset Code:</h5>
      <div
        v-if="errMessage"
        class="w-[80%] m-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ errMessage }}.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="errMessage = ''">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </span>
      </div>
    </div>

    <form @submit.prevent="onSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[80%] m-auto">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="resetCode">Reset Code</label>
        <input
          v-model="form.resetCode"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="resetCode"
          type="text"
          placeholder="Reset Code"
        />
        <div v-if="errors.resetCode" class="text-red-500 text-xs mt-1">{{ errors.resetCode }}</div>
      </div>

      <div class="flex items-center justify-between">
        <button
          :disabled="isSubmitting"
          class="bg-[#0aad0a] hover:bg-[#0aaa0a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-else>Send Code</span>
        </button>
        <router-link to="/login" class="inline-block align-baseline font-bold text-sm text-black">Back to Login</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { z } from 'zod';

// تعريف مخطط Zod للتحقق من صحة البيانات
const resetCodeSchema = z.object({
  resetCode: z.string().min(1, 'Code is required'),
});

export default {
  setup() {
    const form = ref({
      resetCode: '',
    });
    const errors = ref({});
    const errMessage = ref('');
    const isSubmitting = ref(false);
    const router = useRouter();

    const validateForm = () => {
      // استخدام Zod للتحقق من صحة المدخلات
      const result = resetCodeSchema.safeParse(form.value);
      if (!result.success) {
        const zodErrors = result.error.format();
        errors.value = {
          resetCode: zodErrors.resetCode?._errors[0],
        };
        return false;
      }
      errors.value = {};
      return true;
    };

    const onSubmit = async () => {
      errMessage.value = '';
      if (!validateForm()) return; // التحقق من صحة المدخلات قبل الإرسال

      isSubmitting.value = true;
      try {
        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', form.value);
        console.log(data)
        if (data.status === 'Success') {
          router.push('/'); // توجيه المستخدم إلى صفحة جديدة بعد نجاح العملية
        }
      } catch (error) {
        errMessage.value = error.response?.data?.message || 'An error occurred';
        console.log(error);
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      form,
      errors,
      errMessage,
      isSubmitting,
      onSubmit,
    };
  },
};
</script>

<style scoped>
/* يمكنك إضافة أنماط CSS الخاصة بك هنا */
</style>

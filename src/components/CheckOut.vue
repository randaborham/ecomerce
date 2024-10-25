<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto p-5">
      <div v-if="!isLoading && !cartData?.data?._id">
        <!-- إذا لم تكن السلة متوفرة -->
        <p class="text-center text-gray-700">سلة التسوق الخاصة بك فارغة. يرجى إضافة عناصر قبل المتابعة.</p>
      </div>
      <div v-else-if="!isLoading">
        <form @submit.prevent="addAddress" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label for="details" class="block text-gray-700 text-sm font-bold mb-2">Details</label>

            <input
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="details"
              v-model="details"
              required
            />
          </div>
          <div class="mb-4">
            <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">phone</label>
            <input
              type="number"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              v-model="phone"
              required
            />
          </div>
          <div class="mb-4">
            <label for="city" class="block text-gray-700 text-sm font-bold mb-2">city</label>
            <input
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              v-model="city"
              required
            />
          </div>
          <button
            type="submit"
            class="bg-[#0aad0a] hover:bg-[#0aaa0a] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
        Pay Now
          </button>
        </form>
      </div>
      <div v-else>
        <p class="text-center text-gray-700">Loading..</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const details = ref('');
    const phone = ref('');
    const city = ref('');
    const isLoading = ref(true); // حالة التحميل

    // الحصول على بيانات السلة من Vuex
    const cartData = computed(() => store.getters.cartData);
    const onlineData = computed(() => store.getters.onlineData);

    // دالة لإضافة العنوان والقيام بعملية الشراء
    const addAddress = () => {
      const cartId = cartData.value?.data?._id;
      if (cartId) {
        const shippingAddress = {
          details: details.value,
          phone: phone.value,
          city: city.value,
        };

        store.dispatch('checkout', { id: cartId, shippingAddress });

        if (onlineData.value?.status === 'success') {
          window.location.href = onlineData.value?.session?.url;
        }
      } else {
        console.error('بيانات السلة غير متوفرة أو معرف السلة مفقود.');
        alert('لا يمكن إتمام عملية الشراء: بيانات السلة غير متوفرة.');
      }
    };

    // استدعاء بيانات السلة عند تحميل المكون
    onMounted(async () => {
      await store.dispatch('getCard'); // جلب بيانات السلة
      isLoading.value = false; // إيقاف حالة التحميل بعد جلب البيانات
    });

    return {
      details,
      phone,
      city,
      addAddress,
      isLoading,
      cartData,
    };
  },
};
</script>

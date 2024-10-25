<template>
  <div>
    <!-- عرض التحميل إذا كانت البيانات لا تزال قيد التحميل -->
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <Loading />
    </div>

    <!-- عرض البيانات بعد تحميلها -->
    <div v-else class="lg:grid grid-cols-12 gap-[10px] lg:px-[50px] lg:px-[100px] lg:py-[80px]">
      <div class="col-span-3" v-for="brand in brands" :key="brand.id">
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img class="w-full" :src="brand.image" alt="Brand Image">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ brand.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import Loading from '../components/Loading.vue'; // تأكد من مسار مكون التحميل

export default {
  components: {
    Loading, // استيراد مكون التحميل
  },
  setup() {
    const store = useStore();
    const brands = computed(() => store.state.brand); // الحصول على قائمة العلامات التجارية من حالة Vuex
    const isLoading = ref(true); // حالة التحميل

    onMounted(async () => {
      await store.dispatch('getbrand'); // جلب البيانات عند تحميل المكون
      isLoading.value = false; // تغيير حالة التحميل إلى false بعد الانتهاء
    });

    return {
      brands, // إرجاع البيانات التي يمكن استخدامها في الـ template
      isLoading, // إرجاع حالة التحميل
    };
  },
};
</script>

<style lang="">
/* تخصيص التنسيق هنا */
</style>

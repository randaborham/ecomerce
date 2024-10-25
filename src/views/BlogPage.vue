<template lang="">
  <div>
   
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <Loading />
    </div>

    <div v-else class="lg:grid grid-cols-12 lg:gap-[10px] gap-[20px] lg:px-[50px]  py-[100px]">
      <div class="col-span-3" v-for="brand in categ" :key="brand.id">
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img class="w-full h-[400px]" :src="brand.image" alt="Brand Image" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ brand.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import Loading from '../components/Loading.vue'; // تأكد من مسار مكون التحميل

export default {
  components: {
    Loading, // استيراد مكون التحميل
  },
  setup() {
    const store = useStore();
    const categ = computed(() => store.state.categ); // الحصول على الفئات من حالة Vuex
    const isLoading = ref(true); // حالة التحميل

    onMounted(async () => {
      await store.dispatch('getCateg'); // جلب البيانات عند تحميل المكون
      isLoading.value = false; // تغيير حالة التحميل بعد الانتهاء
    });

    return {
      categ,
      isLoading, // إرجاع حالة التحميل
    };
  },
};
</script>

<style lang="">
/* تخصيص التنسيق هنا */
</style>

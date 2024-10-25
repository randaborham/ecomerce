<template>
  <div class="loading">
    <div v-if="isVisible">
      <div class="flex justify-center items-center">
        <!-- هنا يمكنك استخدام أي مكتبة Vue للتحميل أو تصميم المكون الخاص بك -->
        <svg class="animate-spin h-20 w-20 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v4m0 4v4m0-4h4m0-4H8m4 0H8m8 4H8m0 4h8m0-4h8" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const isVisible = ref(true); // للتحكم في إظهار/إخفاء التحميل

    onMounted(() => {
      // إذا أردت تغيير حالة التحميل بناءً على عمليات معينة
      setTimeout(() => {
        isVisible.value = false; // إخفاء التحميل بعد فترة معينة
      }, 3000); // مثلاً بعد 3 ثواني
    });

    return {
      isVisible,
    };
  },
};
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>

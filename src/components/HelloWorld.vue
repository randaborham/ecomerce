<template>
  <div class="lg:grid grid-cols-12 lg:px-[30px] lg:py-[80px] py-[20px] gap-[10px]">
    <div class="col-span-12 mb-4 flex justify-center">
      <input
        v-model="searchQuery"
        class="form-control rounded-[5px] w-[50%] bg-white p-2 shadow-sm"
        type="text"
        placeholder="Search for product...."
        :style="{ color: 'rgb(0 137 123)' }"
      />
    </div>
    
    <!-- مكون التحميل يظهر إذا كان isLoading true -->
    <div v-if="isLoading" class="col-span-12">
      <Loading />
    </div>

    <!-- المنتجات تعرض إذا كان isLoading false -->
    <div
      v-else
      class="col-span-2 shadow p-[10px] border rounded h-[320px]"
      v-for="product in filteredProducts" :key="product.id"
    >
      <div class="flex justify-center">
        <img
          @click="goToDetails(product.id)"
          :src="product.imageCover"
          alt="Product Image"
          class="w-[100px] h-[150px]"
        />
      </div>
      <h1 class="font-bold mt-[15px]">{{ product.title.slice(0, 15) }}</h1>
      <p>{{ product.category.name.slice(0, 100) }}</p>
      <div class="flex justify-between">
        <span class="font-bold">{{ product.price }} EGP</span>
        <span class="flex">
          {{ product.ratingsAverage }}
          <svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.867 53.867">
            <polygon style="fill: #efce4a" points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/>
          </svg>
        </span>
      </div>
      <button
        @click.stop="Addtocart(product.id)"
        class="bg-[#0aad0a] mt-[20px] hover:bg-[#0aaa0a] text-white font-bold py-2 px-4 rounded"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Loading from '../components/Loading.vue';

export default {
  components: {
    Loading
  },
  setup() {
    const searchQuery = ref('');
    const store = useStore();
    const router = useRouter();
    const products = computed(() => store.state.ProductModule.products);
    const isLoading = ref(true);
    const $toast = useToast();

    const goToDetails = (id) => {
      router.push({ name: "ProductDetails", params: { id } });
    };

    const Addtocart = async (id) => {
      try {
        await store.dispatch("Addtocart", id);
        await store.dispatch("getCart");
        $toast.success('Product added to cart');
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    };

    // خاصية محسوبة لتصفية المنتجات بناءً على نص البحث
    const filteredProducts = computed(() => {
      if (!searchQuery.value) return products.value; // إذا لم يكن هناك نص بحث، ارجع جميع المنتجات
      return products.value.filter(product =>
        product.category.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    onMounted(async () => {
      await store.dispatch("getproduct");
      isLoading.value = false; // بعد انتهاء جلب المنتجات، يتم إخفاء مكون التحميل
    });

    return {
      products,
      goToDetails,
      Addtocart,
      isLoading,
      searchQuery,
      filteredProducts  // أضف هذا
    };
  },
};
</script>

<style scoped>
/* يمكن تخصيص التنسيق هنا */
</style>

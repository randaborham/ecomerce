<template>
  <div v-if="product">
    <div class="flex  flex-wrap items-center px-[60px]">
      <div class="w-full md:w-1/3 lg:px-[100px] lg:py-[100px] py-[40px]">
          <!-- Swiper Carousel -->
        <swiper :slides-per-view="1" :space-between="10" @swiper="onSwiper" @slideChange="onSlideChange">
          <swiper-slide v-for="(img, index) in product.images" :key="index">
            <img :src="img" class="lg:w-full  h-[50%]" alt="Product Image" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="w-full md:w-2/3 md:pl-6 lg:pe-[100px] mb-[30px] lg:mb-[0px]">
      
        <!-- Product Details -->
        <h3 class="text-xl font-semibold">{{ product.title }}</h3>
        <p class="mt-2 text-gray-700">{{ product.description }}</p>
        <span class="text-main font-medium">{{ product.category.name }}</span>
        <div class="flex justify-between items-center mt-4">
          <span class="text-lg font-bold">{{ product.price }} EGP</span>
          <span class="flex">
            {{ product.ratingsAverage }}
            <!-- Star rating SVG -->
            <svg height="20px" width="20px" version="1.1" viewBox="0 0 53.867 53.867">
              <polygon style="fill:#EFCE4A;" points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
            </svg>
          </span>
        </div>
        <button class="btn bg-[#0aad0a] text-white mt-3 w-full py-2 rounded" @click.stop="Addtocart(product.id)">
          Add to cart
        </button>
      </div>
    </div>
  </div>

  <div v-else>
    <loading/>
  </div>
</template>


<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import loading from "../components/Loading.vue"

import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Loading from '../components/Loading.vue';

export default {
    components: {
    Swiper,
    SwiperSlide,
        Loading,
  },
  setup() {
    const product = ref(null);
    const route = useRoute();
    const store = useStore();

      const $toast = useToast();
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
   const Addtocart = async (id) => {
      try {
        await store.dispatch('Addtocart', id); // استدعاء الأكشن لإضافة المنتج إلى السلة
          await store.dispatch("getCart");
        console.log(`Product with id ${id} added to cart.`);
         $toast.success('Product  added to cart');
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    };
    onMounted(async () => {
      const id = route.params.id;
      try {
        const response = await store.dispatch('getApisingle', id);
        product.value = response.data.data; 
        console.log(product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    });

    return {
      product,
      Addtocart,
       onSwiper,
      onSlideChange,
    };

  },
};
</script>


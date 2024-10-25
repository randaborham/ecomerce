<template>
 <div class="lg:px-[100px]">
     <div class="grid grid-cols-12 ">
    <div class="col-span-8 lg:h-[500px]">
      <swiper
        :slides-per-view="1"
        :space-between="0"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide>
          <img :src="img1" class="lg:h-[500px]" alt="Image 1" />
        </swiper-slide>
        <swiper-slide>
          <img :src="img2" class="" alt="Image 2" />
        </swiper-slide>
        <swiper-slide>
          <img :src="img3" class="lg:h-[500px]" alt="Image 3" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="col-span-4 ">
      <!-- صور جانبية بناءً على الشريحة النشطة -->
      <img :src="sideImg1" class="w-[100%] lg:h-[250px]" alt="Side Image 1" />
      <img :src="sideImg2" class="w-[100%] lg:h-[250px]" alt="Side Image 2" />
    </div>
  </div>
   <swiper
        :slides-per-view="8"
        :space-between="0"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="item in categ" :key="item.id" >
          <img :src="item.image" class="w-[100%] lg:h-[200px] h-[100px]" alt="Image 1" />
        </swiper-slide>
     
      </swiper>
 </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import img1 from '../assets/slider-image-1.jpeg';
import img2 from '../assets/slider-image-2.jpeg';
import img3 from '../assets/slider-image-3.jpeg';
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
// Import Swiper styles
import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = useStore();
    const categ = computed(() => store.state.categ);

    // صور السلايدر
    const img1Ref = ref(img1);
    const img2Ref = ref(img2);
    const img3Ref = ref(img3);

    // صور جانبية
    const sideImg1 = ref(img2);
    const sideImg2 = ref(img3);

    // عند تغيير الشريحة
    const onSwiper = (swiper) => {
      console.log(swiper);
    };

    const onSlideChange = (swiper) => {
      console.log('slide change', swiper.activeIndex);

      // تحديث الصور الجانبية بناءً على الشريحة النشطة
      if (swiper.activeIndex === 0) {
        sideImg1.value = img2;
        sideImg2.value = img3;
      } else if (swiper.activeIndex === 1) {
        sideImg1.value = img1;
        sideImg2.value = img3;
      } else if (swiper.activeIndex === 2) {
        sideImg1.value = img1;
        sideImg2.value = img2;
      }
    };

    onMounted(async () => {
      await store.dispatch("getCateg");
    });

    return {
      onSwiper,
      onSlideChange,
      img1: img1Ref,
      img2: img2Ref,
      img3: img3Ref,
      sideImg1,
      sideImg2,
      categ,
    };
  },
};
</script>

<style scoped>
/* أضف الأنماط الخاصة بالسلايدر هنا إذا لزم الأمر */
</style>

<template>
  <div class="mt-[30px]">
    <div class="lg:px-[100px] lg:pt-[50px] pb-[100px]">
      <!-- تحقق من حالة التحميل -->
      <div v-if="isLoading" class="flex justify-center items-center h-[200px]">
        <p class="text-lg font-bold"><loading/></p>
      </div>

      <!-- عرض المحتوى عند انتهاء التحميل -->
      <div v-else>
        <div class="flex justify-between px-[20px] lg:px-[0px]">
          <div>
            <h2 class="text-[#373837] text-[32px] font-semibold">My Cart</h2>
            <p class="font-bold">
              Total number of items: {{ cart.products?.length }}
            </p>
          </div>
          <div>
            <router-link to="/checkout">
              <button
                class="bg-[#0aad0a] hover:bg-[#0aaa0a] text-white font-bold lg:py-2 lg:px-4 py-1 px-2 rounded"
              >
                CheckOut
              </button>
            </router-link>
            <p class="font-bold lg:mt-[20px] mt-[10px]">
              Total: {{ cart.totalCartPrice }}
            </p>
          </div>
        </div>

        <!-- Table of Products -->
        <div class="lg:grid grid-cols-12 gap-[50px] mt-[50px]">
          <div class="col-span-12">
            <div class="relative overflow-x-auto">
              <table
                class="w-full text-sm text-left rtl:text-right text-gray-500"
              >
                <thead
                  class="text-xs text-gray-700 uppercase bg-white border-b-[2px] border-b-gray-100"
                >
                  <tr>
                    <th class="px-6 py-3">Product</th>
                    <th class="px-6 py-3">Price</th>
                    <th class="px-6 py-3">Quantity</th>
                    <th class="px-6 py-3">Total</th>
                    <th class="px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in cart.products"
                    :key="item.product._id"
                    class="bg-white border-b hover:bg-gray-50"
                  >
                    <th class="pe-6 py-4 font-medium text-gray-900">
                      <div class="flex items-center">
                        <img
                          :src="item.product.imageCover"
                          class="w-[100px] h-[100px]"
                          alt="product image"
                        />
                        <p class="font-medium text-[16px] ms-[10px]">
                          {{ item.product.title.length > 15 ? item.product.title.slice(0, 15) + '...' : item.product.title }}
                        </p>
                      </div>
                    </th>
                    <td class="px-6 py-4 font-medium text-[16px]">
                      {{ item.price }}$
                    </td>
                    <td class="px-4 py-4">
                      <div
                        class="flex items-center justify-between bg-[#F6F6Fc] px-[10px] p-[5px] w-[100px] h-[50px] rounded-full"
                      >
                        <button
                          @click="handleDecrement(item.product._id, item)"
                          class="text-[#BD0600]"
                        >
                          <svg
                            width="21"
                            height="19"
                            viewBox="0 0 21 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_10_1601)">
                              <rect
                                width="21"
                                height="19"
                                rx="9.5"
                                fill="#0aad0a"
                              />
                              <path
                                d="M15.6667 8H5.66667C5.22464 8 4.80072 8.1756 4.48816 8.48816C4.17559 8.80072 4 9.22464 4 9.66667C4 10.1087 4.17559 10.5326 4.48816 10.8452C4.80072 11.1577 5.22464 11.3333 5.66667 11.3333H15.6667C16.1087 11.3333 16.5326 11.1577 16.8452 10.8452C17.1577 10.5326 17.3333 10.1087 17.3333 9.66667C17.3333 9.22464 17.1577 8.80072 16.8452 8.48816C16.5326 8.1756 16.1087 8 15.6667 8Z"
                                fill="white"
                              />
                            </g>
                          </svg>
                        </button>
                        <p class="text-[20px] m-[10px]">{{ item.count }}</p>
                        <button
                          @click="handleIncrement(item.product._id, item)"
                          class="text-[#BD0600]"
                        >
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="21"
                              height="21"
                              rx="10.5"
                              fill="#0aad0a"
                            />
                            <path
                              d="M15.8051 9.81601H11.3453V5.19492C11.3453 4.53321 10.8094 3.99727 10.1477 3.99727C9.48594 3.99727 8.95 4.53321 8.95 5.19492V9.81601H4.19219C3.53594 9.81601 3 10.352 3 11.0137C3 11.6754 3.53594 12.2113 4.19766 12.2113H8.95547V16.8051C8.95547 17.4668 9.49141 18.0027 10.1531 18.0027C10.8148 18.0027 11.3508 17.4668 11.3508 16.8051V12.2113H15.8105C16.4723 12.2113 17.0082 11.6754 17.0082 11.0137C17 10.352 16.4668 9.81601 15.8051 9.81601Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-medium text-[16px]">
                      {{ item.price * item.count }}$
                    </td>
                    <td class="px-5 py-4 text-left">
                      <a
                        href="#"
                        @click.prevent="dalettocart(item.product._id)"
                        class="font-medium text-red-600 hover:underline"
                        >Delete</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Loading from '@/components/Loading.vue';

export default {
  components: { Loading },
  setup() {
    const store = useStore();
    const $toast = useToast();
    const isLoading = ref(true); // حالة التحميل

    const handleDecrement = async (id, item) => {
      if (!id) return;
      if (item.count > 1) {
        item.count--;
        try {
          await store.dispatch("update", { id, count: item.count });
          $toast.success("Product quantity updated");
        } catch (error) {
          console.error("Failed to update item count:", error);
        }
      }
    };

    const handleIncrement = async (id, item) => {
      if (!id) return;
      item.count++;
      try {
        await store.dispatch("update", { id, count: item.count });
        $toast.success("Product quantity updated");
      } catch (error) {
        console.error("Failed to update item count:", error);
      }
    };

    const dalettocart = async (id) => {
      if (!id) {
        console.error("Product ID is undefined");
        return;
      }
      try {
        await store.dispatch("deletcard", id);
        await store.dispatch("getCart");
        $toast.success("Product delete from cart");
      } catch (error) {
        console.error("Error deleting product from cart:", error);
      }
    };

    const cart = computed(() => store.state.cart);

    // تحميل البيانات عند تحميل المكون وتحديث حالة التحميل
    onMounted(async () => {
      try {
        await store.dispatch("getCart");
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        isLoading.value = false; // إنهاء حالة التحميل
      }
    });

    return {
      cart,
      isLoading, // إضافة حالة التحميل للمكون
      handleDecrement,
      handleIncrement,
      dalettocart,
    };
  },
};
</script>

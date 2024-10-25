<template>
  <div>
   

    <div v-if="!userAllOrders" class="text-center">
 loading
    </div>

    <div v-else class="m-auto py-5" style="width: 90%;">
      <table>
        <thead class="text-white py-4">
          <tr class="bg-main">
            <th style="width: 12%;" class="ps-2">Product image</th>
            <th class="ps-4">Title</th>
            <th class="ps-3">Price</th>
            <th class="ps-4">Count</th>
            <th class="ps-4">Total price</th>
            <th class="ps-5">Phone</th>
            <th class="ps-3">City</th>
            <th class="ps-4">User email</th>
            <th class="pe-2">Payment method</th>
          </tr>
        </thead>
        <tbody v-for="(order, index) in userAllOrders" :key="index">
          <tr v-for="(item, idx) in order.cartItems" :key="idx">
            <td class="ps-2">
              <img class="w-50" :src="item.product.imageCover" alt="" />
            </td>
            <td class="fw-bold">
              {{ item.product.title.split(' ').slice(0, 2).join(' ') }}
            </td>
            <td class="fw-bold ps-3">{{ item.price }} EGP</td>
            <td class="fw-bold ps-5">{{ item.count }}</td>
            <td class="fw-bold ps-4">{{ item.price * item.count }} EGP</td>
            <td class="fw-bold ps-3">{{ order.shippingAddress.phone }}</td>
            <td class="fw-bold ps-3 pe-3">{{ order.shippingAddress.city }}</td>
            <td class="fw-bold me-5 ps-2">{{ order.user.email }}</td>
            <td class="fw-bold text-primary ps-5">
              {{ order.paymentMethodType }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

import jwtDecode from "jwt-decode";

export default {
  components: {
    Loading,
    Helmet,
  },
  setup() {
    const userAllOrders = ref(null);

    const getUserOrders = async (id) => {
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
        );
        userAllOrders.value = data;
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    onMounted(() => {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        const user = jwtDecode(userToken);
        getUserOrders(user.id);
      }
    });

    return {
      userAllOrders,
    };
  },
};
</script>

<style scoped>
/* أضف الأنماط الخاصة هنا */
</style>

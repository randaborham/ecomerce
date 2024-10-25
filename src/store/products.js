import axios from 'axios'; // استيراد axios

export default {
  state: {
    products: [], // تهيئة المنتجات كـ array فارغ
  },
  mutations: {
    // Mutation لتحديث المنتجات في الحالة
    getproducts(state, products) {
      state.products = products;
      console.log(products);
    },
  },
  actions: {
    // الأكشن لجلب قائمة المنتجات
    async getproduct({ commit }) {
      try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        commit("getproducts", response.data.data); // استخدام commit لتحديث الـ state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    // الأكشن لجلب تفاصيل منتج معين
    async getApisingle(_, id) {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        return response; // إرجاع الاستجابة
      } catch (error) {
        console.error("Error fetching product details:", error);
        throw error; // رمي الخطأ لمعالجته في المكون
      }
    },
  },
};

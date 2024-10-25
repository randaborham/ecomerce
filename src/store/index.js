import { createStore } from "vuex";
import axios from "axios";
const userToken = localStorage.getItem('userToken');
import ProductModule from "../store/products";
export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem("userToken"),
    cartData: null,
    errorMessage: '',
    onlineData: null,
    products: "",
    cart: [], 
    categ:[],
    brand:[]
  },
  mutations: {
    SET_LOGGED_OUT(state) {
      state.isLoggedIn = false;
    },
    SET_LOGGED_IN(state) {
      state.isLoggedIn = true;
    },
    setCartData(state, data) {
      state.cartData = data;
    },
    setOnlineData(state, data) {
      state.onlineData = data;
    },
    setError(state, errorMessage) {
      state.errorMessage = errorMessage;
    },

    products(state, products) {
      state.products = products;
      console.log(products);
    },

    setCart(state, cart) {
      state.cart = cart;
      console.log(cart);
    },
    setCateg(state, categ) {
      state.categ = categ;
      console.log(categ);
    },
    setbran(state, brand) {
      state.brand = brand;
      console.log(brand);
    },
    setid(state,id){
      state.id =id
      console.log(id)
    },
    
  },
  
  actions: {
    async getCard({ commit }) {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        });
        commit('setCartData', response.data);
      } catch (error) {
        commit('setError', error.response?.data?.message || 'Error fetching cart');
      }
    },

    logout({ commit }) {
      localStorage.removeItem("userToken"); // حذف التوكن
      commit("SET_LOGGED_OUT"); // تحديث الحالة
    },
    login({ commit }) {
      commit("SET_LOGGED_IN"); // تحديث الحالة إلى مسجل دخول
    },


    async checkout({ commit }, { id, shippingAddress }) {
      try {
        const response = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:8081`,
          { shippingAddress },
          {
            headers: {
              token: localStorage.getItem('userToken'),
            },
          }
        );
        commit('setOnlineData', response.data);
      } catch (error) {
        commit('setError', error.response?.data?.message || 'Checkout failed');
      }
    },
    async update({ commit }, { id, count }) {
      try {
        const response = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          { count },
          {
            headers: {
              token: localStorage.getItem('userToken'),
            },
          }
        );
        commit('setCart', response.data.data); 
      } catch (error) {
        commit('setError', error.response?.data?.message || 'Failed to update cart item');
      }
    },
    
    async deletcard({ dispatch }, id) {
      try {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        });
        await dispatch('getCard');
    
      } catch (error) {
        console.error('Failed to delete item:', error.response);
        throw error; 
      }
    },
    
   
    async getCart(context) {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
          headers: {
            token: userToken,
          },
        });
        context.commit("setCart", response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },
    async getCateg(context) {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        context.commit("setCateg", response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },
  
    async getbrand(context) {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
        context.commit("setbran", response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },
  

    async Addtocart(context, productId) {
      try {
        const response = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/cart`,
          { productId },
          {
            headers: {
              token: localStorage.getItem("userToken"),
            },
          }
        );
        context.commit("setCart", response.data.data.products);
      } catch (error) {
        console.log(error);
      }
    }
  },
 
  modules: {
    ProductModule,
  },
  getters: {
    cartData: (state) => state.cartData,
    errorMessage: (state) => state.errorMessage,
    onlineData: (state) => state.onlineData,
  },
});
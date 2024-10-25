<template>
  <div class="lg:px-[100px] lg:py-[50px] py-[20px] px-[30px] bg-gray-100">
    <h2 class="text-xl font-semibold">Get The FreshCart app</h2>
    <p class="text-gray-700 mb-4">We will send you a link, open it on your phone to download the app</p>

    <div class="container mx-auto">
      <div class="flex  flex-wrap gap-[50px] mb-4">
        <div class="w-full lg:w-8/12 mb-3 lg:mb-0">
          <input
            type="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email..."
            v-model="email"
          />
        </div>
        <div class="w-full lg:w-3/12">
          <button
            class="bg-[#0aad0a] hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            @click="shareAppLink"
          >
            Share App Link
          </button>
        </div>
      </div>
    </div>

    <hr class="w-full opacity-20 my-4" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "", // تخزين البريد الإلكتروني
    };
  },
  methods: {
    shareAppLink() {
      if (this.email) {
        // هنا يمكنك تنفيذ منطق إرسال الرابط
        console.log(`Sharing app link to: ${this.email}`);
        alert(`Link sent to ${this.email}`);
      } else {
        alert("Please enter an email");
      }
    },
  },
};
</script>

<style scoped>
/* يمكنك إضافة تنسيقات مخصصة هنا إذا لزم الأمر */
</style>

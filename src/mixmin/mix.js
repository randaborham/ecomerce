
import { ref } from 'vue'; // يجب استيراد ref من Vue

export default function counterfunction() {
  const counert = ref(0); // متغير تفاعلي

  const increaas = () => {
    counert.value++;
  };

const decreaas = ()=>{
    if (counert.value > 0){
        counert.value--;
    }
    else{
        return;
    }
}
  return {
    counert,
    increaas,
    decreaas,
  };
}

  
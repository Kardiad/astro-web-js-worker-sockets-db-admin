<template>
  <div class="products flex flex-wrap justify-around">
    <div
      v-for="p in products"
      :key="p.id"
      class="product w-[300px] bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs m-1"
    >
      <img class="rounded-base mb-6 w-full" :src="p.image" alt="product image" />
      <div>
        <h5 class="text-xl text-heading font-semibold tracking-tight">
          {{ p.title }}
        </h5>
        <p>
            {{p.desc ?? ''}}
        </p>
        <p class="flex justify-between">
            <span class="w-[50%]">Unidades a añadir: </span>
            <input class="w-[35%]" type="number" v-model.number="p.quantity" name="quantity" min="0" :max="p.stock" @input="maxVal(p)" placeholder="0uds" :disabled="p.stock == 0">
        </p>
        <div class="flex items-center justify-between mt-6">
          <span class="text-3xl font-extrabold text-heading">{{ p.price }} €</span>
          <button
            type="button"
            :class="
              p.stock > 0
                ? 'text-white bg-[#31C48D] box-border border border-transparent hover:bg-[#046C4E] focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none'
                : 'text-white bg-[#F98080] box-border border border-transparent hover:bg-[#9B1C1C] focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none'
            "
            :disabled="p.stock === 0"
            @click="p.stock > 0 && clicked(p)"
          >
            <svg
              class="w-4 h-4 me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
            Añadir
          </button>
        </div>
      </div>
    </div>
  </div>
  <ShopingCart :products="selectedProducts" @sendsale="handleSale"/>
</template>

<script setup>
import { DataBase } from "../../db/db.js";
import { onMounted, ref } from "vue";
import ShopingCart from './ShopingCart.vue'
let db;
let products = ref([]);
let selectedProducts = ref([]);
let refresh;
onMounted(async () => {
  refresh = async () => {
    db = new DataBase();
    products.value = await db.read("cd");
    for (let event of await db.read("events")) {
      products.value.push(event);
    }
  }
  refresh();
});
const handleSale = (sales) => {
  console.log('Venta recibida:', sales)
  selectedProducts.value = []
  refresh();
}
const clicked = (p) => {
  if (p.stock > 0) { 
    selectedProducts.value.push(p)
  }
};
const maxVal = (p) =>{
    if(p.quantity > p.stock){
        p.quantity = p.stock
    }
}
</script>

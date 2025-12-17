<template>
  <!-- Modal toggle -->
  <button data-modal-target="default-modal" data-modal-toggle="default-modal"
    class="text-white bg-green-600 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none fixed bottom-5 right-5 z-100 w-[50px] rounded-full"
    type="button">
    <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
      viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
    </svg>
    <span class="bg-red-600 absolute right-0 top-0 rounded-full">{{
      products.length
    }}</span>
  </button>

  <!-- Main modal -->
  <div id="default-modal" tabindex="-1" aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-stone-300 border border-default rounded-base shadow-sm p-4 md:p-6">
        <!-- Modal header -->
        <div class="flex items-center justify-between border-b border-default pb-4 md:pb-5">
          <h3 class="text-lg font-medium text-heading">Este es el estado de tu pedido</h3>
          <button type="button"
            class="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
            data-modal-hide="default-modal">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="space-y-4 md:space-y-6 py-4 md:py-6">
          <div v-if="products.length === 0">Carrito vacío</div>

          <div v-for="p in products" :key="p.id">
            {{ p.title }} × {{ p.quantity }} x {{ p.price }} = {{ p.quantity * p.price }}€
            <button>
              <svg width="1rem" height="1rem" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">

                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                <g id="SVGRepo_iconCarrier">
                  <title>delete [#1487]</title>
                  <desc>Created with Sketch.</desc>
                  <defs> </defs>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path
                          d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z"
                          id="delete-[#1487]"> </path>
                      </g>
                    </g>
                  </g>
                </g>

              </svg>
            </button>
          </div>
        </div>
        <div class="flex justify-end">
          <p>{{ getTotal() }}€</p>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
          <button data-modal-hide="default-modal" type="button"
            class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            @click="sendSale(true)" :disabled="products.length == 0">
            Comprar
          </button>
          <button data-modal-hide="default-modal" type="button" @click="sendSale(false)"
            class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toRaw } from 'vue';

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['sendsale'])

const getTotal = () => {
  let total = 0;
  for (let line of props.products) {
    total += line.price * line.quantity;
  }
  return total
}

const sendSale = (isSendable) => {
  const sales = toRaw(props.products);
  // (opcional) seguir usando el worker si lo necesitas
  if (isSendable) {
    globalThis.myWorker.postMessage({
      action: 'sendsale',
      data: sales
    })
    // 👉 emitir evento al padre
  }
  emit('sendsale', sales)
}
</script>

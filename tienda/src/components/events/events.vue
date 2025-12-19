<template>
    <div v-for="p in products" :key="p.id"
        class="flex flex-col justify-center items-center w-full max-w-[400px] bg-white rounded-xl shadow-lg">

        <!-- Info -->
        <div class="w-full sm:w-1/2 p-4 flex flex-col justify-between">
            <div>
                <h2 class="text-lg text-center font-semibold text-gray-800">
                    {{ p.title }}
                </h2>
                <p class="mt-2 text-sm text-center text-gray-600">
                    Fecha concierto {{ p.date.replace('T', ' ') }}
                </p>
            </div>
        </div>

        <!-- Mapa -->
        <div class="w-full sm:w-1/2 h-64 sm:h-auto p-4">
            <MapElement :id="p.id" :lat="p.coords.x" :lng="p.coords.y" client:only></MapElement>
        </div>

    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { DataBase } from '../../db/db';
import MapElement from './MapElement.vue';
let db;
let products = ref([]);
let refresh;
onMounted(async () => {
    refresh = async () => {
        db = new DataBase();
        products.value = await db.read("events");
        console.log(products.value)
    }
    refresh();
})
</script>
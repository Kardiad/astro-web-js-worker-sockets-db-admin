<script setup  client:only>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'


const props = defineProps({
    id: Number,
    lat: Number,
    lng: Number
})

onMounted(() => {
    const map = L.map(`map-${props.id}`, {
        zoomControl: false,
        attributionControl: false
    }).setView([props.lat, props.lng], 14)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(map)

    L.marker([props.lat, props.lng]).addTo(map)
})
</script>

<template>
    <div class="map z-0" :id="`map-${id}`"></div>
</template>

<style scoped>
.map {
    height: 200px;
    width: 100%;
    border-radius: 8px;
}
</style>

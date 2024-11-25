<template>
    <HatAll/>
    <body>
    <RouterView></RouterView>
    </body>
</template>

<script setup>
import HatAll from './components/Hat.vue'


</script>

<style>
body {
    width: 100%;
    min-width: auto;
    background-color: #F0F3F8;
    display: flexbox;
    box-sizing: content-box;

}
</style>

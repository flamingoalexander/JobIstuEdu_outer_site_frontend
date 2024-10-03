<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-8">
                    <h2 style="width: fit-content;" >
                        Промышленные партнеры института "{{ current_institute.name }}"
                    </h2>
                    <hr>
                    <h2>Направления:</h2>
                    <ul>
                        <li v-for="speciality in current_institute.specialities">{{ speciality }}</li>
                    </ul>
                </div>
                <div class="col-4">
                    <img :src="current_institute.picture" style="height: 20rem;width: 20rem;" alt="тут должна быть картинка">
                </div>
            </div>

            <div>
                <button href="#" class="btn btn-light">
                    <router-link :to="{ name: 'home' }">На главную </router-link>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import HatImg from '@/assets/pics/hat.jpeg';
import { onBeforeMount } from 'vue';
import { useInstStorage } from '@/storages/InstStorage';
import { usePracticeStorage } from '@/storages/PracticeStorage';
import { storeToRefs } from 'pinia';
const instStorage = useInstStorage()
const practiceStorage = usePracticeStorage()
const { current_institute } = storeToRefs(instStorage)
onBeforeMount(() => {
    console.log(practiceStorage.getInstId())
    instStorage.getInstsById(practiceStorage.getInstId())
    console.log(instStorage.current_institute)
})
</script>
<template>
    <div>
        <div v-if="practiceStorage.is_empty == true" style="background-color: rgb(20, 220, 200);">
            <h2>Пока тут ничего нет</h2>
        </div>
        <div v-if="practiceStorage.has_error == true" style="background-color: crimson;">
            <h2>Произошла ошибка</h2>
        </div>
        
        <div v-for="practice in  practiceStorage.practices">
            <div class="card" style="margin-top: 2rem">
                <div class="card-header">
                    <h5 class="card-title">{{ practice.company.name }}</h5>
                </div>
                <img :src="practice.company.image" class="card-img-top" alt="тут должна быть картинка"
                    style="width: 15rem;">
                <div class="card-body">
                    <p class="card-text">Договор: {{ practice.company.agreements }}</p>
                    <p class="card-text">Задачи:</p>
                    <ul>
                        <li class="card-text" v-for="theme in practice.themes">{{ theme.name }}</li>
                    </ul>
                </div>
                
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="link in practice.doc_links">
                        <div v-if="link.type === 'Веб-сайт'">
                            <i class="bi bi-globe"><a :href="link.url">{{ " " + link.type }}</a></i>
                        </div>
                        <div v-else>
                            <i class="bi bi-file-earmark-arrow-down-fill">{{ link.type }}</i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useUserStorage } from '@/storages/UserStorage';
import { usePracticeStorage } from '@/storages/PracticeStorage'
import { onBeforeMount } from 'vue';


const practiceStorage = usePracticeStorage()

onBeforeMount(() => {
    // console.log("получаем практики")
    practiceStorage.getPracticeFromServer()
    // console.log(practiceStorage.value.getPracticeFromServer())
})
</script>

<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                    Добавление партнера
                </h5>

            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Введите название компании</label>
                    <input class="form-control" placeholder="Название" v-model="partnerHolder.name" />
                </div>
                <div class="form-group">
                    <label>Введите ссылку на картинку</label>
                    <input class="form-control" placeholder="логотип" v-model="partnerHolder.image" />
                </div>
                <div class="form-group">
                    <label>Введите договор</label>
                    <input class="form-control" placeholder="договор" v-model="partnerHolder.agreements" />
                </div>
                <button class="btn btn-primary" type="button" @click="addPartner">
                    Добавить
                </button>
            </div>
        </div>
        
    </div>

</template>
<script setup>
import { useUserStorage } from '@/storages/UserStorage';
import { usePracticeStorage } from '@/storages/PracticeStorage'
import { ref, onBeforeMount } from 'vue';
import axios from 'axios'
const userStorage = ref(useUserStorage())

const partnerHolder = {
    name: '',
    dbegin: '',
    dend: '',
    image: '',
    agreements: ''
}

const pracHolder = {
    name: '',
    company: '',
    faculty: ''
}
const addPartner = async () => {
    try {
        await axios.post('/api/out/legacy/company/add', partnerHolder,
            {
                auth: userStorage.value.auth,
            })
            .then(res => res.data)
            .then(data => console.log(data))
            .then(res => alert("Партнер добавлен"))

    } catch (err) {
        alert('У вас нет прав админа')
        console.log(userStorage.value.auth)
        console.log(err)
    }

}
const addPractice = async () => {
    try {
        await axios.post('/api/out/base/practice/add', pracHolder,
            {
                auth: userStorage.value.auth,
            })
            .then(res => res.data)
            .then(data => console.log(data))
            .then(res => alert("практика добавлена"))

    } catch (err) {
        alert('У вас нет прав админа')
        console.log(userStorage.value.auth)
        console.log(err)
    }

}
onBeforeMount(() => {
    userStorage.value.authUser()

})
</script>
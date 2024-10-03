<template>
    <div>
        <div v-if="userStorage.user.is_superuser = true">
            <div class="card" style="width: 30rem;">
                <h1 style="text-align: center;">Профиль</h1>
                <div class="card-body" style="margin: 2rem;">
                    <h3 class="card-title"> Логин: {{ userStorage.user.username }}</h3>
                    <hr>
                    <h3 class="card-title">почта: {{ userStorage.user.email }}</h3>
                    <hr>
                    <h3 class="card-title">Имя: {{ userStorage.user.first_name }}</h3>
                    <hr>
                    <h3 class="card-title">Фамилия: {{ userStorage.user.last_name }}</h3>
                </div>

                <div style="text-align: center;">

                    <RouterLink :to="{ name: 'update' }">
                        <button class="btn btn-primary" type="button" style="margin-bottom: 10px;">
                            Добавить партнера
                        </button>
                    </RouterLink><br>
                    <RouterLink :to="{ name: 'auth' }">
                    <button class="btn btn-secondary" type="button" @click="logOut" style="margin-bottom: 10px;">
                        Выйти
                    </button>
                </RouterLink>

                </div>

                
            </div>
        </div>
        <div v-else>
            <div class="card" style="width: 30rem;">
                <h1 style="text-align: center;">Профиль</h1>
                <div class="card-body" style="margin: 2rem;">
                    <h3 class="card-title"> Логин: {{ userStorage.user.username }}</h3>
                    <hr>
                    <h3 class="card-title">почта: {{ userStorage.user.email }}</h3>
                    <hr>
                    <h3 class="card-title">Имя: {{ userStorage.user.first_name }}</h3>
                    <hr>
                    <h3 class="card-title">Фамилия: {{ userStorage.user.last_name }}</h3>
                </div>

                <div style="text-align: center;">

                    <RouterLink :to="{ name: 'auth' }">
                        <button class="btn btn-secondary" type="button" @click="logOut" style="margin-bottom: 10px;">
                            Выйти
                        </button>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUserStorage } from '@/storages/UserStorage';
import { onBeforeMount } from 'vue'
import axios from 'axios'
const userStorage = ref(useUserStorage())
let change_button = ref(true)
const changeUser = async () => {
    console.log(userStorage.value.id)
    await axios.patch('/api/users/' + userStorage.value.id,
    )
        .then(res => userStorage.value.setAuth({
            username: userHolder.username,
            password: userStorage.value.password
        }))
        .then(res => userStorage.value.setUserFromServer())
}
const on_change_click = () => {
    change_button.value = !change_button.value
}
const userHolder = {
    image: '',
    username: '',
    agreement: '',
    practice_topics: ''


}
const logOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('auth')
}

onBeforeMount(() => {
    if (!(JSON.parse(localStorage.getItem('user')) === null)) {
        userStorage.value.setUser(JSON.parse(localStorage.getItem('user')))
        userStorage.value.setAuth(JSON.parse(localStorage.getItem('auth')))
    }
})
</script>
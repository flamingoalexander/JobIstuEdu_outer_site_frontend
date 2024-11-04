<template>
  <div class="profile-container">
    <!-- Блок с информацией о профиле -->
    <div class="profile-info">
      <h1 class="profile-title">Профиль пользователя</h1>

      <!-- Основные данные пользователя -->
      <div class="info-row">
        <h3>Логин:</h3>
        <span>{{ userStorage.user.username }}</span>
      </div>
      <hr />
      <div class="info-row">
        <h3>Почта:</h3>
        <span>{{ userStorage.user.email }}</span>
      </div>
      <hr />
      <div class="info-row">
        <h3>Имя:</h3>
        <span>{{ userStorage.user.first_name }}</span>
      </div>
      <hr />
      <div class="info-row">
        <h3>Фамилия:</h3>
        <span>{{ userStorage.user.last_name }}</span>
      </div>
      <hr />

      <!-- Данные компании -->
      <h2 class="section-title">Информация о компании</h2>
      <div class="info-row">
        <h3>Название компании:</h3>
        <span>{{userStorage.user.company_name}}</span>
      </div>
      <hr />
      <div class="info-row">
        <h3>Лого компании:</h3>
        <img :src="userStorage.user.company_image" alt="Лого компании" class="company-logo" />
      </div>
      <hr />
      <div class="info-row">
        <h3>Направление деятельности компании:</h3>
        <span>Some data</span>
      </div>
      <hr />
      <div class="info-row">
        <h3>ФИО и должность главы компании:</h3>
        <span>Some data</span>
      </div>
      <hr />

      <!-- Контактные данные для работы с практикантами -->
      <h2 class="section-title">Контактные данные лица, которое работает с практикантами</h2>
      <div class="info-row">
        <h3>ФИО:</h3>
        <span>Some data</span>
      </div>
      <div class="info-row">
        <h3>Мессенджер:</h3>
        <span>Some data</span>
      </div>
      <div class="info-row">
        <h3>Email:</h3>
        <span>Some data</span>
      </div>
      <hr />

      <!-- Перечень тем практики -->
<!--      <h2 class="section-title">Перечень тем практики</h2>-->
<!--      <ul class="practice-topics">-->
<!--        <li v-for="(topic, index) in companyData.practiceTopics" :key="index">{{ topic }}</li>-->
<!--      </ul>-->
<!--      <hr />-->

<!--      &lt;!&ndash; Согласование приложения к договору &ndash;&gt;-->
<!--      <h2 class="section-title">Согласование приложения к договору</h2>-->
<!--      <div class="agreement">-->
<!--        <h3>Список студентов:</h3>-->
<!--        <ul>-->
<!--          <li v-for="(student, index) in agreementData.students" :key="index">-->
<!--            {{ student.name }} — {{ student.group }} ({{ student.dateRange }})-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
    </div>

    <!-- Кнопки действий -->
    <div class="profile-actions">
      <RouterLink :to="{ name: 'update' }">
        <button class="btn btn-primary">Добавить партнера</button>
      </RouterLink>
      <RouterLink :to="{ name: 'auth' }">
        <button class="btn btn-secondary" @click="logOut">Выйти</button>
      </RouterLink>
      <button class="btn btn-secondary" @click="update">UPDATE</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUserStorage } from '@/storages/UserStorage';
import { onMounted} from 'vue'
import axios from 'axios'
import AuthService from "@/services/AuthService";
import router from "@/router";

const userStorage = useUserStorage()
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
    AuthService.logout();
    router.push({ name: 'auth' });
}

const update = () => {
    userStorage.authInputUser().then(res => console.log(res));
}

onMounted(() => {
    // if (!(JSON.parse(localStorage.getItem('user')) === null)) {
    //     userStorage.value.setUser(JSON.parse(localStorage.getItem('user')))
    //     userStorage.value.setAuth(JSON.parse(localStorage.getItem('auth')))
    // }
    userStorage.authInputUser();
})
</script>
<style scoped>
/* Основной контейнер профиля */
.profile-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

/* Блок с информацией о профиле */
.profile-info {
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
}

/* Заголовок профиля по центру */
.profile-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #343a40;
  text-align: center;
}

/* Секция */
.section-title {
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #343a40;
}

/* Строки с информацией */
.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  padding: 10px 0;
}

hr {
  border: 1px solid #dee2e6;
  margin: 10px 0;
}

/* Логотип компании */
.company-logo {
  max-width: 150px;
  height: auto;
  border-radius: 8px;
}

/* Список тем практики */
.practice-topics {
  padding-left: 20px;
  list-style-type: disc;
}

/* Кнопки действий */
.profile-actions {
  display: flex;
  justify-content: center; /* Кнопки по центру */
  gap: 20px; /* Пробел между кнопками */
  margin-top: 20px;
}

/* Стиль кнопок */
.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
}

.btn-secondary:hover {
  background-color: #565e64;
}
</style>
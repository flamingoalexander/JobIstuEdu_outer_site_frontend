<template>
    <div class="profile-container">
        <div class="profile-info">
            <h1 class="profile-title">Личный кабинет предприятия</h1>
            <div class="alo header-block">
                <div class ="gol-left">
                    <div class="info-row">
                        Логин:
                        <br>
                        <div class="aboba">
                            <span>{{user.username}}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        Почта:
                        <br>
                        <CustomInput v-model:value="user.email" :disabled=!isEditing id="company-name"/>
                    </div>
                </div>
                <div class="gol-right">
                    <div class="info-row">
                        Имя:
                        <br>
                        <CustomInput v-model:value="user.first_name" :disabled=!isEditing id="company-name"/>
                    </div>
                    <div class="info-row">
                        Фамилия:
                        <br>
                        <CustomInput v-model:value="user.last_name" :disabled=!isEditing id="company-name"/>
                    </div>
                </div>
            </div>
            <h2>Информация о компании</h2>
            <div class="alo central-block" v-if="company">
                <div class="gol-left">
                    <div class="info-row">
                        Лого компании:
                        <br>
                        <div class="abobaimg">
                            <img :src="company.image" alt="Лого компании" class="company-logo"/>
                        </div>
                    </div>
                </div>
                <div class="gol-right">
                    <div class="info-row">
                        Название компании:
                        <br>
                        <CustomInput v-model:value="company.name" :disabled=!isEditing id="company-name"/>
                    </div>
                    <div class="info-row">
                        Направление деятельности компании:
                        <br>
                        <CustomInput v-model:value="company.area_of_activity" :disabled=!isEditing id="company-name"/>
                    </div>
                    <div class="info-row">
                        ФИО и должность главы компании:
                        <br>
                        <div class="aboba2">
                            <span>Some data</span>
                        </div>
                    </div>
                    <div class="info-row">
                        Договор:
                        <br>
                        <CustomInput v-model:value="company.agreements" :disabled=!isEditing id="company-name"/>
                    </div>
                </div>
            </div>
            <div class="practices-container">
                <h2>Темы практик</h2>
                <div v-if="practices.length" class="practices-list">
                    <div v-for="practice in practices" :key="practice.id" class="practice-item">
                        <h3>{{ practice.name }}</h3>
                        <p><strong>Институт:</strong>В разработке</p>
                        <div>
                            <strong>Темы:</strong>
                            <ul>
                                <li v-for="theme in practice.themes" :key="theme.id">
                                    <CustomInput v-model:value="theme.name" :disabled=!isEditing id="company-name"/>
<!--                                    <button v-if="isEditing" class="btn btn-danger" @click="removeTheme(practice.id, theme.id)">Удалить</button>-->
                                </li>
                            </ul>
                        </div>
                        <div v-if="practice.doc_links.length">
                            <strong>Документы:</strong>
                            <ul>
                                <li v-for="link in practice.doc_links" :key="link.id">
                                    <a :href="link.url" target="_blank">{{ link.type }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p v-else>Практики не найдены.</p>
            </div>
            <h2>Контактные данные лица, которое работает с практикантами</h2>
            <div class="alo">
                <div class="gol-left">
                    <div class="info-row">
                        ФИО:
                        <br>
                        <div class="aboba">
                            <span>Some data</span>
                        </div>
                    </div>
                    <div class="info-row">
                        Email:
                        <br>
                        <div class="aboba">
                            <span>Some data</span>
                        </div>
                    </div>
                </div>
                <div class="gol-right">
                    <div class="info-row">
                        Мессенджер:
                        <br>
                        <div class="aboba">
                            <span>Some data</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-actions">
            <button v-if="!isEditing" class="btn btn-primary" @click="isEditing = !isEditing">Редактировать профиль</button>
            <div class="profile-actions2" v-else>
                <button class="btn btn-success" @click="saveChanges">Сохранить</button>
                <button class="btn btn-success2" @click="isEditing = false;">Отмена</button>
            </div>
            <RouterLink :to="{ name: 'auth' }">
                <button class="btn btn-primary" @click="logOut">Выйти</button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import CustomInput from "@/components/UI/CustomInput.vue";
import {onBeforeMount, ref, reactive, toRefs, computed} from 'vue'
import { useUserStorage } from '@/storages/UserStorage';
import AuthService from "@/services/AuthService";
import router from "@/router";
import {storeToRefs} from "pinia";
import {getInstituteNameById} from "@/services/Api";
const userStorage = useUserStorage();
const { userData } = storeToRefs(userStorage);
const practices = computed(() => userData.value.practices);
const company = computed(() => userData.value.company);
const user = computed(() => userData.value.user);

const getFacultyName = async  (facultyId) => {
    return await getInstituteNameById(facultyId);
};

const removeTheme = (practice_id, theme_id) => {
    const practice = userData.value.practices.find(item => item.id === practice_id);
    const theme = practice.themes.find(item => item.id === theme_id);
    practice.themes = theme_id;
    userData.value.practices = userData.value.practices.filter(p => p.id !== id);
};

let isEditing= ref(false)
const logOut = async () => {
    await AuthService.logout();
    await router.push({ name: 'auth' });
}

const saveChanges = async () => {
    try {
        await userStorage.UpdateUser()
        isEditing.value = false;
        alert('Данные успешно сохранены');
    } catch (error) {
        alert('Произошла ошибка:' + error.message);
        console.error(error);
    }
};
onBeforeMount(async () => {
    await userStorage.authInputUser();
    localStorage.getItem('access_token');
    if (!localStorage.getItem('access_token')) {
        router.push({ name: 'auth' });
    }
})
</script>

<style scoped>
.profile-container {
    margin-bottom: 40px;
    font-family: system-ui, -apple-system, "Segoe UI", Ro;
}
.profile-info {
  padding: 30px 60px 30px 60px;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 920px;
  max-height: 1050;
  min-width: 840px;
}
.profile-title {
  margin-bottom: 30px;
  font-size: 40px;
  color: #343a40;
  text-align: center;
}
.alo {
    display:flex;
    justify-content: space-between;
    margin-bottom: 50px;
}
.gol-left {
   text-align: left;
   justify-content:baseline; 
}
.gol-right {
    text-align: left; 
}
.info-row { 
    font-size: 1.25rem;
    padding: 10px 0px 0px 0px;
}
.aboba {
    background-color: #e4e4e4;
    display:inline-flex;
    justify-content: left; 
    align-items:center;
    border-radius: 10px;
    width: 320px;
    height: 50px;
    padding: 00px 0px 0px 20px; 
}
.aboba2 {
    background-color: #e4e4e4;
    display:inline-flex;
    justify-content: left; 
    align-items:center;
    border-radius: 10px;
    width: 480px;
    height: 50px;
    padding: 00px 0px 0px 20px; 
}
.header-block::v-deep(.custom-input__field ) {
    width: 320px;
}
.central-block::v-deep(.custom-input__field ) {
    width: 480px;
}
.abobaimg {
    background-color: #e4e4e4;
    display:inline-flex;
    justify-content: center; 
    align-items:center;
    border-radius: 10px;
    width: 222px;
    height: 222px;
    
}
.company-logo {
  width: 95%;
  height: auto;
  border-radius: 10px;
}
h2 {
    font-size: 26px;
    color: #000000;
}
.profile-actions {
  display: flex;
  justify-content: center; 
  gap: 20px; 
  margin-top: 20px;
}
.profile-actions2 {
  display: flex;
 
  gap: 20px; 
  
}
.btn-primary {
  background-color: #0B6EFE;
  border: none;
  padding: 10px 15px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
}
.btn-primary:hover {
  background-color: #0056b3;
}
.btn-success {
    background-color: #34a344;
    border-radius: 20px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 20px;
    border: none;
    height:50px;
}
.btn-success2 {
    background-color: #d13131;
    border-radius: 20px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 20px;
    color:#ffffff;
    border: none;
    height:50px;
}
.btn-success2:hover {
  background-color: #b82323;
  color: #ffffff;
}
@media (max-width: 840px) {
    .alo {
        display:block;
        margin-bottom: 30px;
    }
    .profile-title {
        font-size: 21px;
        margin-bottom: 10px;
    }
    h2 {
        font-size: 18px;
        margin-bottom: 0px;
    }
    .profile-info {
       min-width: 400px;
       max-width: 400px;
       padding: 20px 20px 5px 20px;
    }
    .header-block::v-deep(.custom-input__field ) {
        width: 360px;
    }
    .central-block::v-deep(.custom-input__field ) {
        width: 360px;
    }
    .aboba{
        width: 360px;
    }
    .aboba2 {
        width: 360px;
    }
    .abobaimg {
        width: 80px;
        height: 80px;
    }
    .profile-actions {
        display:grid;
        text-align: center;
        
    }
    .btn-primary {
        width: 270px;
    }
    .profile-actions2 {
        justify-content: space-between;
    }
    .btn-success {
        width: 128px;
    }   
    .btn-success2 {
        width: 128px;
    }    
}
</style>
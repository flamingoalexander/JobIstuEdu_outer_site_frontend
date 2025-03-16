<template>
<div class="profile-container">
    <el-card class="profile-info" shadow="hover">
        <h1 class="profile-title">Личный кабинет предприятия</h1>
        <el-row :gutter="20" class="header-block">
            <el-col :span="12">
                <div class="info-row">
                    <label>Логин:</label>
                    <div class="display-box">
                        <span>{{ user.username || "Данные не заданы" }}</span>
                    </div>
                </div>
                <div class="info-row">
                    <label>Почта:</label>
                    <div class="display-box">
                        <span>{{ user.email || "Данные не заданы" }}</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="info-row">
                    <label>Имя:</label>
                    <div class="display-box">
                        <span>{{ user.first_name || "Данные не заданы"  }}</span>
                    </div>
                </div>
                <div class="info-row">
                    <label>Фамилия:</label>
                    <div class="display-box">
                        <span>{{ user.last_name || "Данные не заданы" }}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div style="display:flex !important; ">
            <el-button icon="Edit" circle type="primary" @click="userInfoFormVisible = true"/>
        </div>
        <el-divider></el-divider>

        <!-- Блок информации о компании -->
        <h2>Информация о компании</h2>
        <div v-if="company">
            <el-row :gutter="20" class="central-block">
                <el-col :span="8">
                    <div class="info-row">
                        <label>Лого компании:</label>
                        <el-image
                            :src="company.image"
                            alt="Лого компании"
                            class="company-logo"
                            fit="contain"
                        />
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="info-row">
                        <label>Название компании:</label>
                        <el-input
                            v-model="company.name"
                            :disabled="!isEditing"
                            placeholder="Введите название компании"
                        />
                    </div>
                    <div class="info-row">
                        <label>Направление деятельности компании:</label>
                        <el-input
                            v-model="company.area_of_activity"
                            :disabled="!isEditing"
                            placeholder="Введите направление"
                        />
                    </div>
                    <div class="info-row">
                        <label>ФИО и должность главы компании:</label>
                        <div class="display-box">
                            <span>Some data</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <label>Договор:</label>
                        <el-input
                            v-model="company.agreements"
                            :disabled="!isEditing"
                            placeholder="Введите данные договора"
                        />
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-divider></el-divider>

        <!-- Блок практик -->
        <div class="practices-container">
            <h2>Темы практик</h2>
            <div v-if="practices.length" class="practices-list">
                <el-collapse>
                    <el-collapse-item
                        v-for="practice in practices"
                        :key="practice.id"
                        :title="practice.name"
                    >
                        <p><strong>Институт:</strong> В разработке</p>
                        <p><strong>Темы:</strong></p>
                        <ul class="themes-list">
                            <li v-for="theme in practice.themes" :key="theme.id">
                                <el-input
                                    v-model="theme.name"
                                    :disabled="!isEditing"
                                    placeholder="Название темы"
                                />
                            </li>
                        </ul>
                        <div v-if="practice.doc_links && practice.doc_links.length">
                            <p><strong>Документы:</strong></p>
                            <ul>
                                <li v-for="link in practice.doc_links" :key="link.id">
                                    <a :href="link.url" target="_blank">{{ link.type }}</a>
                                </li>
                            </ul>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <p v-else>Практики не найдены.</p>
        </div>

        <el-divider></el-divider>

        <!-- Блок контактных данных -->
        <h2>Контактные данные лица, которое работает с практикантами</h2>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="info-row">
                    <label>ФИО:</label>
                    <div class="display-box">
                        <span>Some data</span>
                    </div>
                </div>
                <div class="info-row">
                    <label>Email:</label>
                    <div class="display-box">
                        <span>Some data</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="info-row">
                    <label>Мессенджер:</label>
                    <div class="display-box">
                        <span>Some data</span>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-divider></el-divider>

        <!-- Блок действий -->
        <div class="profile-actions" style="text-align: center; margin-top: 20px;">
            <el-button
                v-if="!isEditing"
                type="primary"
                @click="isEditing = true"
            >
                Редактировать профиль
            </el-button>
            <span v-else>
          <el-button type="success" @click="saveChanges">
            Сохранить
          </el-button>
          <el-button type="warning" @click="isEditing = false">
            Отмена
          </el-button>
        </span>
            <router-link :to="{ name: 'auth' }">
                <el-button type="danger" @click="logOut">
                    Выйти
                </el-button>
            </router-link>
        </div>
    </el-card>
</div>
<el-dialog v-model="userInfoFormVisible" title="Редактирование данных пользователя" width="500">
    <el-form :model="user">
        <el-form-item label="Почта" :label-width="140">
            <el-input v-model="user.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Имя" :label-width="140">
            <el-input v-model="user.first_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Фамилия" :label-width="140">
            <el-input v-model="user.last_name" autocomplete="off" />
        </el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer">
            <el-button @click="userInfoFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="userInfoFormVisible = false">
                Confirm
            </el-button>
        </div>
    </template>
</el-dialog>
</template>

<script setup>
import {onMounted, ref, computed, onBeforeMount} from 'vue'
import { useUserStorage } from '@/storages/UserStorage'
import AuthService from '@/services/AuthService'
import router from '@/router'
import { storeToRefs } from 'pinia'
const userInfoFormVisible = ref(false);
const onEditUserInfo = () => {

}
const userStorage = useUserStorage()
const { user, company, practices } = storeToRefs(userStorage)

const logOut = async () => {
    await AuthService.logout()
    await router.push({ name: 'auth' })
}

onBeforeMount(() => {
    if (!localStorage.getItem('access_token')) {
        router.push({ name: 'auth' })
    }
})
onMounted(async () => {
    await userStorage.fetchUserData()
})
</script>

<style scoped>
.profile-container {
    padding: 20px;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    background-color: #f0f2f5;
}
.profile-info {
    padding: 30px;
    margin: auto;
    max-width: 920px;
    border-radius: 20px;
}
.profile-title {
    margin-bottom: 30px;
    font-size: 32px;
    text-align: center;
    color: #303133;
}
.info-row {
    margin-bottom: 20px;
}
.info-row label {
    font-weight: 600;
    display: block;
    margin-bottom: 5px;
}
.display-box {
    background-color: #f5f7fa;
    padding: 10px;
    border-radius: 6px;
}
.company-logo {
    width: 100%;
    height: 180px;
    object-fit: contain;
    border-radius: 10px;
}
.practices-list {
    margin-top: 10px;
}
.themes-list {
    list-style: none;
    padding-left: 0;
}
.info-row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.info-row label {
    flex: 0 0 80px;
    font-weight: bold;
    margin-right: 8px;
}

.display-box {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
}

.display-box span {
    flex: 1;
    font-size: 14px;
    color: #333;
}

.display-box .el-button {
    margin-left: 8px;
}
</style>

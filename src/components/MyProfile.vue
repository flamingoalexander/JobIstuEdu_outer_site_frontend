<template>
<div id="top-loading" class="top-loading"></div>
<div class="profile-container">
    <el-card class="profile-info" shadow="hover">
        <h1 class="profile-title">Личный кабинет предприятия</h1>
        <el-skeleton v-if="isLoading" animated />
        <el-row v-else :gutter="20" class="header-block">
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
                        <span>{{ user.first_name || "Данные не заданы" }}</span>
                    </div>
                </div>
                <div class="info-row">
                    <label>Фамилия:</label>
                    <div class="display-box">
                        <span>{{ user.last_name || "Данные не заданы" }}</span>
                    </div>
                </div>
            </el-col>
            <el-button icon="Edit" circle type="primary" @click="userInfoFormVisible = true" />
        </el-row>
        <el-divider></el-divider>

        <!-- Блок информации о компании -->
        <h2>Информация о компании</h2>
        <el-skeleton v-if="isLoading" animated />
        <div v-else v-if="company">
            <el-row :gutter="20" class="header-block">
                <el-col :span="8">
                    <div class="info-row">
                        <label>Лого компании:</label>
                        <div class="display-box">
                            <el-image
                                :src="company.image_url"
                                alt="Лого компании"
                                class="company-logo"
                                fit="contain"
                            />
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="info-row">
                        <label>Название компании:</label>
                        <div class="display-box">
                            <span>{{ company.name || "Данные не заданы" }}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <label>Направление деятельности компании:</label>
                        <div class="display-box">
                            <span>{{ company.area_of_activity || "Данные не заданы" }}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <label>ФИО и должность главы компании:</label>
                        <div class="display-box">
                <span>
                  {{ (company.head_full_name && company.head_job_title)
                    ? company.head_full_name + ', ' + company.head_job_title
                    : "Данные не заданы" }}
                </span>
                        </div>
                    </div>
                    <div class="info-row">
                        <label>Договор:</label>
                        <div class="display-box">
                            <span>{{ company.agreements || "Данные не заданы" }}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-button icon="Edit" circle type="primary" @click="userCompanyFormVisible = true" />
        </div>

        <el-divider></el-divider>


        <!-- Блок практик -->

        <div class="themes-container">
            <h2>Темы практик</h2>
            <div class="flex gap-2">
                <el-tag
                    v-for="theme in themes"
                    :key="theme.id"
                    closable
                    :disable-transitions="false"
                    @close="handleCloseTheme(theme)"
                >
                    {{ theme.title }}
                </el-tag>
                <el-input
                    v-if="themeInputVisible"
                    ref="inputRef"
                    v-model="inputThemeValue"
                    class="w-20"
                    size="small"
                    @keyup.enter="handleInputConfirm"
                    @blur="handleInputConfirm"
                />
                <el-button v-else class="button-new-tag" size="small" @click="showInput">
                    + New Tag
                </el-button>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="practices-container">
            <h2>ТAAA</h2>
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
            <router-link :to="{ name: 'auth' }">
                <el-button type="danger" @click="logOut">Выйти</el-button>
            </router-link>
        </div>
    </el-card>
</div>

<!-- Форма редактирования данных пользователя -->
<el-dialog v-model="userInfoFormVisible" title="Редактирование данных пользователя" width="500">
    <el-form :model="userInfoForm">
        <el-form-item label="Почта" :label-width="140">
            <el-input v-model="userInfoForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Имя" :label-width="140">
            <el-input v-model="userInfoForm.first_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Фамилия" :label-width="140">
            <el-input v-model="userInfoForm.last_name" autocomplete="off" />
        </el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer">
            <el-button @click="userInfoFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onConfirmEditUserInfo">Confirm</el-button>
        </div>
    </template>
</el-dialog>

<!-- Форма редактирования данных о компании -->
<el-dialog v-model="userCompanyFormVisible" title="Редактирование данных компании" width="500">
    <el-form :model="userCompanyForm">
        <el-form-item label="Имя компании" :label-width="140">
            <el-input v-model="userCompanyForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Ссылка на лого" :label-width="140">
            <el-input v-model="userCompanyForm.image_url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Направление деятельности" :label-width="140">
            <el-input v-model="userCompanyForm.area_of_activity" autocomplete="off" />
        </el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer">
            <el-button @click="userCompanyFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onConfirmEditUserCompany">Confirm</el-button>
        </div>
    </template>
</el-dialog>
</template>

<script setup>
import {onMounted, ref, onBeforeMount, reactive, nextTick} from 'vue'
import { useUserStorage } from '@/storages/UserStorage'
import AuthService from '@/services/AuthService'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { ElMessage, ElLoading } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'

const userInfoFormVisible = ref(false)
const userCompanyFormVisible = ref(false)
const isLoading = ref(true)

const userStorage = useUserStorage()
const { user, company, practices, themes } = storeToRefs(userStorage)


let userInfoForm = reactive({
    email: '',
    first_name: '',
    last_name: ''
})
let userCompanyForm = reactive({
    name: '',
    image_url: '',
    area_of_activity: '',
    head_full_name: '',
    head_job_title: '',
    agreements: ''
})
const themeInputVisible = ref(false)
const inputThemeValue = ref('')
const inputRef = ref(null)
const showInput = () => {
    themeInputVisible.value = true
    // nextTick(() => {
    //     inputRef.value.input.focus()
    // })
}
const handleCloseTheme = (theme) => {
    userStorage.deleteUserTheme(theme);
}
const handleInputConfirm = () => {
    if (inputThemeValue.value) {
        userStorage.addUserTheme(inputThemeValue.value)
    }
    themeInputVisible.value = false
    inputThemeValue.value = ''
}



const onConfirmEditUserInfo = async () => {
    try {
        userInfoFormVisible.value = false
        const topLoadingEl = document.getElementById('top-loading')
        const loadingInstance = ElLoading.service({
            target: topLoadingEl,
            lock: false,
            text: '',
            background: 'transparent'
        })
        await userStorage.patchUserInfo(userInfoForm)
        loadingInstance.close()
    } catch (e) {
        ElMessage({
            message: 'Ошибка',
            type: 'error'
        })
        throw e
    }
    ElMessage({
        message: 'Данные успешно сохранены',
        type: 'success'
    })
}

const onConfirmEditUserCompany = async () => {
    try {
        userCompanyFormVisible.value = false
        const topLoadingEl = document.getElementById('top-loading')
        const loadingInstance = ElLoading.service({
            target: topLoadingEl,
            lock: false,
            text: '',
            background: 'transparent'
        })
        await userStorage.patchUserCompany(userCompanyForm)
        loadingInstance.close()
    } catch (e) {
        ElMessage({
            message: 'Ошибка',
            type: 'error'
        })
        throw e
    }
    ElMessage({
        message: 'Данные успешно сохранены',
        type: 'success'
    })
}

const logOut = async () => {
    await AuthService.logout()
    await router.push({ name: 'auth' })
}

onBeforeMount(() => {
    if (!localStorage.getItem('access_token')) {
        router.push({ name: 'auth' })
    }
})

const fetchUserData = async () => {
    isLoading.value = true
    await userStorage.fetchUserData()
    isLoading.value = false
}

onMounted(async () => {
    await fetchUserData()
    userInfoForm = reactive(cloneDeep(user))
    userCompanyForm = reactive(cloneDeep(company))
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
    display: flex;
    align-items: center;
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
.top-loading {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
    width: 40px;
    height: 40px;
}
</style>

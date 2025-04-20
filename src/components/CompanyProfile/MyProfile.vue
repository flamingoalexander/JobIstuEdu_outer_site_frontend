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
                        <label>ФИО главы компании:</label>
                        <div class="display-box">
                <span>
                  {{ (company.head_full_name) ? company.head_full_name : "Данные не заданы" }}
                </span>
                        </div>
                    </div>
                    <div class="info-row">
                        <label>Договор:</label>
                        <div class="display-box">
                            <span>{{ company.agreement || "Данные не заданы" }}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-button icon="Edit" circle type="primary" @click="userCompanyFormVisible = true" />
        </div>

        <el-divider></el-divider>


        <!-- Блок тем -->
        <h2>Взаимодействие с ИИТИАД:</h2>
        <div class="themes-container practice-themes">
            <h4>Темы производственной практики</h4>
            <el-skeleton :rows=1 v-if="isLoading" animated />
            <div v-else class="flex gap-2">
                <el-tag
                    v-for="theme in practiceThemes"
                    :key="theme.id"
                    closable
                    :disable-transitions="false"
                    @close="handleCloseTheme(theme)"
                >
                    {{ theme.title }}
                </el-tag>
                <el-input
                    v-if="practiceThemeInputVisible"
                    ref="inputRef"
                    v-model="inputThemeValue"
                    class="w-20"
                    size="small"
                    @keyup.enter="handleInputThemePR('ПР')"
                    @blur="handleInputThemePR('ПР')"
                />
                <el-button v-else class="button-new-tag" size="small" @click="showPracticeThemeInput">
                    Добавить новую тему
                </el-button>
            </div>
        </div>
        <div class="themes-container niokr-themes">
            <h4>Темы ВКР</h4>
            <el-skeleton :rows=1 v-if="isLoading" animated />
            <div v-else class="flex gap-2">
                <el-tag
                    v-for="theme in vkrThemes"
                    :key="theme.id"
                    closable
                    type="warning"
                    :disable-transitions="false"
                    @close="handleCloseTheme(theme)"
                >
                    {{ theme.title }}
                </el-tag>
                <el-input
                    v-if="vkrThemeInputVisible"
                    ref="inputRef"
                    v-model="inputThemeValue"
                    class="w-20"
                    size="small"
                    @keyup.enter="handleInputThemePR('ВКР')"
                    @blur="handleInputThemePR('ВКР')"
                />
                <el-button v-else class="button-new-tag" size="small" @click="showVkrThemeInput">
                    Добавить новую тему
                </el-button>
            </div>
        </div>
        <div class="themes-container vkr-themes">
            <h4>Темы НИОКР</h4>
            <el-skeleton :rows=1 v-if="isLoading" animated />
            <div v-else class="flex gap-2">
                <el-tag
                    v-for="theme in niokrThemes"
                    :key="theme.id"
                    type="danger"
                    closable
                    :disable-transitions="false"
                    @close="handleCloseTheme(theme)"
                >
                    {{ theme.title }}
                </el-tag>
                <el-input
                    v-if="niokrThemeInputVisible"
                    ref="inputRef"
                    v-model="inputThemeValue"
                    class="w-20"
                    size="small"
                    @keyup.enter="handleInputThemePR('НИОКР')"
                    @blur="handleInputThemePR('НИОКР')"
                />
                <el-button v-else class="button-new-tag" size="small" @click="showNiokrThemeInput">
                    Добавить новую тему
                </el-button>
            </div>
        </div>
        <el-divider></el-divider>

<!--        <div class="practices-container">-->
<!--            <h2>Взаимодействие с ИИТИАД</h2>-->
<!--            <div class="practices-block">-->
<!--                <el-skeleton v-if="isLoading" animated />-->
<!--                <div v-else>-->
<!--                    <el-row :gutter="20">-->
<!--                        <el-col v-for="practice in practices" :key="practice.id" :span="8">-->
<!--                            <el-card class="practice-card" shadow="hover">-->
<!--                                &lt;!&ndash; Кнопка удаления в правом верхнем углу &ndash;&gt;-->
<!--&lt;!&ndash;                                <div class="delete-btn-container">&ndash;&gt;-->
<!--&lt;!&ndash;                                    <el-button&ndash;&gt;-->
<!--&lt;!&ndash;                                        icon="Delete"&ndash;&gt;-->
<!--&lt;!&ndash;                                        circle&ndash;&gt;-->
<!--&lt;!&ndash;                                        type="danger"&ndash;&gt;-->
<!--&lt;!&ndash;                                        @click="deletePractice(practice.id)" />&ndash;&gt;-->
<!--&lt;!&ndash;                                </div>&ndash;&gt;-->
<!--                                <div class="practice-details">-->
<!--                                    <p><strong>Факультет:</strong> {{ practice.faculty_name }}</p>-->
<!--                                    <p>-->
<!--                                        <strong>Темы:</strong>-->
<!--                                        <el-tag-->
<!--                                            v-for="theme in practice.themes"-->
<!--                                            :key="theme.id"-->
<!--                                            style="margin-right: 4px;">-->
<!--                                            {{ theme.title }}-->
<!--                                        </el-tag>-->
<!--                                    </p>-->
<!--                                    <p>-->
<!--                                        <strong>Контакты:</strong>-->
<!--                                        <ul>-->
<!--                                            <li v-for="doc in practice.doc_links" :key="doc.id">-->
<!--                                                <a :href="doc.url" target="_blank">{{ doc.type }}</a>-->
<!--                                            </li>-->
<!--                                        </ul>-->
<!--                                    </p>-->
<!--                                </div>-->
<!--                            </el-card>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
<!--                    <el-button-->
<!--                        icon="Plus"-->
<!--                        circle-->
<!--                        type="primary"-->
<!--                        @click="" />-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

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
<UserInfoForm :userInfoFormVisible="userInfoFormVisible" @update:userInfoFormVisible="handleChangeUserInfoVisible" ></UserInfoForm>

<!-- Форма редактирования данных о компании -->

<CompanyInfoForm :userCompanyFormVisible="userCompanyFormVisible" @update:userCompanyFormVisible="handleChangeUserCompanyVisible"></CompanyInfoForm>

<!--Форма создания практики-->
<el-dialog v-model="addPracticeFormVisible" title="Добавление новой практики" width="500">
    <el-form :model="practiceForm" label-width="120px">
        <!-- Поле для выбора тем -->
        <el-form-item label="Темы">
            <el-select
                v-model="practiceForm.themes"
                multiple
                placeholder="Выберите темы"
                style="width: 100%;">
                <el-option
                    v-for="theme in themes"
                    :key="theme.id"
                    :label="theme.title"
                    :value="theme.id" />
            </el-select>
        </el-form-item>

        <!-- Поле для выбора института -->
        <el-form-item label="Институт">
            <el-select
                v-model="practiceForm.faculty"
                placeholder="Выберите институт"
                size="small"
                style="width: 240px">
                <el-option
                    v-for="inst in institutes"
                    :key="inst.id"
                    :label="inst.name"
                    :value="inst.id" />
            </el-select>
        </el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer">
            <el-button @click="addPracticeFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onConfirmAddPractice">Confirm</el-button>
        </div>
    </template>
</el-dialog>
</template>

<script setup>
import {onMounted, ref, onBeforeMount, reactive, nextTick, computed} from 'vue'
import { useUserStorage } from '@/storages/UserStorage'
import {useInstitutesStorage} from "@/storages/InstitutesStorage";
import UserApiService from '@/services/UserApiService'
import router from '@/router'
import { storeToRefs } from 'pinia'
import {ElMessage, ElLoading, ElMessageBox} from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
import UserInfoForm from "@/components/CompanyProfile/UserInfoForm.vue";
import CompanyInfoForm from "@/components/CompanyProfile/CompanyInfoForm.vue";
import {map} from "lodash";

const userInfoFormVisible = ref(false)
const userCompanyFormVisible = ref(false)
const addPracticeFormVisible = ref(false)
const isLoading = ref(true)

const userStorage = useUserStorage()
const institutesStorage = useInstitutesStorage()
const { user, company, practices, themes } = storeToRefs(userStorage)
const practiceThemes = computed(() => {
    return themes.value.filter(theme => theme.type === "ПР")
})
const vkrThemes = computed(() => {
    return themes.value.filter(theme => theme.type === "ВКР")
})
const niokrThemes = computed(() => {
    return themes.value.filter(theme => theme.type === "НИОКР")
})

let institutes = reactive([])


let practiceForm = reactive({
    doclinks: [],
    themes: [],
    faculty: null
})

const practiceThemeInputVisible = ref(false)
const vkrThemeInputVisible = ref(false)
const niokrThemeInputVisible = ref(false)



const inputThemeValue = ref('')
const inputRef = ref(null)
const showPracticeThemeInput = () => {
    practiceThemeInputVisible.value = true
}
const showVkrThemeInput = () => {
    vkrThemeInputVisible.value = true
}
const showNiokrThemeInput = () => {
    niokrThemeInputVisible.value = true
}
const deletePractice = async (practiceId) => {
    try {
        await ElMessageBox.confirm(
            'Вы действительно хотите удалить практику?',
            'Подтверждение',
            {
                confirmButtonText: 'Да',
                cancelButtonText: 'Нет',
                type: 'warning'
            }
        );

        const topLoadingEl = document.getElementById('top-loading');
        const loadingInstance = ElLoading.service({
            target: topLoadingEl,
            lock: false,
            text: '',
            background: 'transparent'
        });

        await userStorage.deleteUserPractice(practiceId);
        loadingInstance.close();
        ElMessage({
            message: 'Практика успешно удалена',
            type: 'success'
        });
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage({
                message: 'Ошибка при удалении темы',
                type: 'error'
            });
        }
    }

}
const handleChangeUserInfoVisible = (value) => {
    userInfoFormVisible.value = value
}
const handleChangeUserCompanyVisible = (value) => {
    userCompanyFormVisible.value = value
}
const handleCloseTheme = async (theme) => {
    try {
        await ElMessageBox.confirm(
            'Вы действительно хотите удалить тему?',
            'Подтверждение',
            {
                confirmButtonText: 'Да',
                cancelButtonText: 'Нет',
                type: 'warning'
            }
        );

        const topLoadingEl = document.getElementById('top-loading');
        const loadingInstance = ElLoading.service({
            target: topLoadingEl,
            lock: false,
            text: '',
            background: 'transparent'
        });

        await userStorage.deleteUserTheme(theme);
        await userStorage.fetchUserPractice()
        loadingInstance.close();

        ElMessage({
            message: 'Тема успешно удалена',
            type: 'success'
        });
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage({
                message: 'Ошибка при удалении темы',
                type: 'error'
            });
        }
    }
}
const handleInputThemePR = async (themeType) => {
    try {
        const topLoadingEl = document.getElementById('top-loading')

        const loadingInstance = ElLoading.service({
            target: topLoadingEl,
            lock: false,
            text: '',
            background: 'transparent'
        })
        if (inputThemeValue.value) {
            await userStorage.addUserTheme({ title:inputThemeValue.value, type: themeType })
        }
        await userStorage.fetchUserPractice()
        practiceThemeInputVisible.value = false
        vkrThemeInputVisible.value = false
        niokrThemeInputVisible.value = false
        inputThemeValue.value = ''
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

const onConfirmAddPractice = async () => {
    addPracticeFormVisible.value = false
    const topLoadingEl = document.getElementById('top-loading')
    const loadingInstance = ElLoading.service({
        target: topLoadingEl,
        lock: false,
        text: '',
        background: 'transparent'
    })
    try {
        await userStorage.addUserPractice(practiceForm)
        loadingInstance.close()
        ElMessage({
            message: 'Данные успешно сохранены',
            type: 'success'
        })
        practiceForm = reactive({
            id: null,
            doclinks: [],
            themes: [],
            faculty: null
        })
    } catch (e) {
        loadingInstance.close()
        ElMessage({
            message: 'Ошибка',
            type: 'error'
        })
        practiceForm = reactive({
            id: null,
            doclinks: [],
            themes: [],
            faculty: null
        })
        throw e
    }

}


const logOut = async () => {
    await UserApiService.logout()
    await router.push({ name: 'auth' })
}

onBeforeMount(() => {
    if (!UserApiService.getToken()) {
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
    institutes = reactive(await institutesStorage.getInstitutesWithIds())
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
.practices-block {
    padding: 20px;
}

.practice-card {
    margin-bottom: 20px;
}
.practice-card {
    position: relative;
    margin-bottom: 20px;
}

.delete-btn-container {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
}
</style>

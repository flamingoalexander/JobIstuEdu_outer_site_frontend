<template>
<el-dialog :model-value="userCompanyFormVisible" title="Редактирование данных компании" width="500">
    <el-form :model="userCompanyForm">
        <el-form-item label="Имя компании" :label-width="140">
            <el-input v-model="userCompanyForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Ссылка на лого" :label-width="140">
            <el-input v-model="userCompanyForm.image_url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Направление деят" :label-width="140">
            <el-input v-model="userCompanyForm.area_of_activity" autocomplete="off" />
        </el-form-item>
        <el-form-item label="ФИО главы" :label-width="140">
            <el-input v-model="userCompanyForm.head_full_name" autocomplete="off" />
        </el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer">
            <el-button @click="onChangeVisible(false)">Cancel</el-button>
            <el-button type="primary" @click="onConfirmEditUserCompany">Confirm</el-button>
        </div>
    </template>
</el-dialog>
</template>

<script setup>
import {onBeforeUpdate, reactive} from "vue";
import {ElLoading, ElMessage} from "element-plus";
import cloneDeep from "lodash/cloneDeep";
import { useUserStorage } from '@/storages/UserStorage'
import {storeToRefs} from "pinia";
const userStorage = useUserStorage()
const { company } = storeToRefs(userStorage)
const props = defineProps({
    userCompanyFormVisible: {
        type: Boolean,
        required: true,
    }
});
let userCompanyForm = reactive({
    name: '',
    image_url: '',
    area_of_activity: '',
    head_full_name: '',
    head_job_title: '',
    agreements: ''
})
const onConfirmEditUserCompany = async () => {
    try {
        const topLoadingEl = document.getElementById('top-loading')
        const loadingInstance = ElLoading.service({
            target: topLoadingEl,
            lock: false,
            text: '',
            background: 'transparent'
        })
        await userStorage.patchUserCompany(userCompanyForm.value)
        loadingInstance.close()
        onChangeVisible(false)
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
const emit = defineEmits(['update:userCompanyFormVisible']);
const onChangeVisible = (newValue) => {
    emit('update:userCompanyFormVisible', newValue)
}
onBeforeUpdate(async () => {
    userCompanyForm = reactive(cloneDeep(company))
})
</script>
<style scoped>

</style>
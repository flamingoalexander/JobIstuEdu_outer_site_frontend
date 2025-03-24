<template>
<el-dialog :model-value="userInfoFormVisible" @update:modelValue="onChangeVisible" title="Редактирование данных пользователя" width="500">
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
            <el-button @click="onChangeVisible(false)">Cancel</el-button>
            <el-button type="primary" @click="onConfirmEditUserInfo">Confirm</el-button>
        </div>
    </template>
</el-dialog>
</template>

<script setup>
import {onBeforeUpdate, onMounted, onUpdated, reactive} from "vue";
import {ElLoading, ElMessage} from "element-plus";
import { useUserStorage } from '@/storages/UserStorage'
import cloneDeep from "lodash/cloneDeep";
import {storeToRefs} from "pinia";
const userStorage = useUserStorage()
const { user } = storeToRefs(userStorage)

const props = defineProps({
    userInfoFormVisible: {
        type: Boolean,
        required: true,
    }
});
let userInfoForm = reactive({
    email: '',
    first_name: '',
    last_name: ''
})
const onConfirmEditUserInfo = async () => {
    try {
        const topLoadingEl = document.getElementById('top-loading')
        const loadingInstance = ElLoading.service({
            target: topLoadingEl,
            lock: false,
            text: '',
            background: 'transparent'
        })
        await userStorage.patchUserInfo(userInfoForm.value)
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
const emit = defineEmits(['update:userInfoFormVisible']);
const onChangeVisible = (newValue) => {
    emit('update:userInfoFormVisible', newValue)
}
onBeforeUpdate(async () => {
    userInfoForm = reactive(cloneDeep(user))
    console.log(userInfoForm)
})
</script>
<style scoped>

</style>
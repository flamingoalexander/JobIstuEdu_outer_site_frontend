<template>
<el-dialog v-model="visible" title="Редактирование данных пользователя" width="500">
    <el-form :model="form">
        <el-form-item label="Почта" :label-width="140">
            <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Имя" :label-width="140">
            <el-input v-model="form.first_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Фамилия" :label-width="140">
            <el-input v-model="form.last_name" autocomplete="off" />
        </el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer">
            <el-button @click="closeDialog">Cancel</el-button>
            <el-button type="primary" @click="onConfirm">Confirm</el-button>
        </div>
    </template>
</el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { ElLoading, ElMessage } from "element-plus";
import { useUserStorage } from "@/storages/UserStorage";
import cloneDeep from "lodash/cloneDeep";
import { storeToRefs } from "pinia";

const props = defineProps({
    formVisibleModel: {
        type: Boolean,
        required: true,
    },
});
const emit = defineEmits(['update:formVisibleModel']);

const visible = ref(props.formVisibleModel);

watch(() => props.formVisibleModel, (newVal) => {
    visible.value = newVal;
});
watch(visible, (newVal) => {
    emit('update:formVisibleModel', newVal);
});

const userStorage = useUserStorage();
const { user } = storeToRefs(userStorage);

let form = reactive({
    email: '',
    first_name: '',
    last_name: ''
});

const onConfirm = async () => {
    try {
        visible.value = false; // закрываем диалог
        const topLoadingEl = document.getElementById('top-loading');
        const loadingInstance = ElLoading.service({
            target: topLoadingEl,
            lock: false,
            text: '',
            background: 'transparent'
        });
        await userStorage.patchUserInfo(form); // Передаём form напрямую
        loadingInstance.close();
        ElMessage({
            message: 'Данные успешно сохранены',
            type: 'success'
        });
    } catch (e) {
        ElMessage({
            message: 'Ошибка',
            type: 'error'
        });
        throw e;
    }
};

const closeDialog = () => {
    visible.value = false;
};

onMounted(() => {
    form = reactive(cloneDeep(user))
});
</script>

<style scoped>
.dialog-footer {
    text-align: right;
}
</style>

<template>

        <div class="container-fluid">
            <div class="card" v-for="company in companyStorage.companies" style="margin-top: 1rem;">
                <div class="card-header">
                    <h5 class="card-title">{{ company.name }}</h5>
                </div>
                <img :src="company.image" class="card-img-top" alt="тут должна быть картинка"
                    style="width: 15rem;">
                <div class="card-body">
                    <p class="card-text">Договор: {{ company.agreements }}</p>
                    <p class="card-text">Задачи:</p>
                    <hr>
                    <div class="row">
                        <AddPracticeModal>
                        </AddPracticeModal>
                    </div>
                </div>
                
            </div>
        </div>

</template>
<script setup>
import { onBeforeMount,ref } from 'vue';
import { useCompanyStorage } from '@/storages/CompanyStorage'
import AddPracticeModal from '@/components/AddPracticeModal.vue'

const companyStorage = ref(useCompanyStorage())

onBeforeMount(() => {
    companyStorage.value.getCompaniesFromServer()
})


</script>
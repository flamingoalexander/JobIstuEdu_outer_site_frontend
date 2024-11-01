<script setup>
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const company = ref(null)
const route = useRoute()

onBeforeMount(async () => {
    const company_id = route.query.company_id;
    const response = await axios.get('api/out/legacy/company/' + company_id)
    company.value = response.data
})
</script>

<template>
    <div class="profile-container">
        <!-- Блок с информацией о профиле -->
        <div class="profile-info">
            <h1 class="profile-title">Информация о компании</h1>
            <!-- Данные компании -->
            <div class="info-row">
                <h3>Название компании:</h3>
                <span>{{company?.name}}</span>
            </div>
            <hr />
            <div class="info-row">
                <h3>Лого компании:</h3>
                <img :src="company?.image" alt="Лого компании" style="width: 10em" />
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
            <hr>
            <h2 class="section-title">Договор с ИРНИТУ</h2>
            <div class="info-row">
                <h3>Название договора</h3>
                <span>{{company?.agreements}}</span>
            </div>
            <div class="info-row">
                <h3>Дата начала:</h3>
                <span>{{company?.dbegin}}a</span>
            </div>
            <div class="info-row">
                <h3>Дата конца</h3>
                <span>{{company?.dend}}</span>
            </div>
            <hr/>
        </div>
    </div>
</template>

<style scoped>

</style>
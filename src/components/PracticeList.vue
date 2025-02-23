<template>
    <div class="empty" v-if="partnersStorage.is_empty">
        <h2>Ожидаем согласования перечня производственных партнеров</h2>
    </div>
    <div class="error" v-if="partnersStorage.has_error">
        <h2>Произошла ошибка</h2>
    </div>
    <div v-for="(practice, index) in partnersStorage.partners" :key="practice.company.id" class="card1">
        <div class="info">
            <div class="info-left">
                <img :src="practice.company.image" class="img1" alt="тут должна быть картинка">
            </div>
            <div class="info-right">
                <h2>{{ practice.company.name }}</h2>
                <div class="info-text">
                    {{ practice.company.agreements }}
                </div>
            </div>
        </div>
        <span :id="'more-' + index" v-show="isVisible[index]">
                <div class="info-row">
                    Направление деятельности компании:
                    <br>
                    <div class="aboba">
                        <span>Some data</span>
                    </div>
                </div>
                <div class="info-row">
                    ФИО и должность главы компании:
                    <br>
                    <div class="aboba">
                        <span>Some data</span>
                    </div>
                </div>
        </span>
        <div class="body-cell">
            <div class="cell" v-for="(theme, themeIndex) in practice.themes.slice(0, isVisible[index] ? practice.themes.length : 3)" :key="theme.id">
                {{ theme.name }}
            </div>    
        </div>
        <hr>
        <div class="link-block">
            <div class="presentation">
                Презентация компании ООО "СвязьБанк"
            </div>
            <div class="students">
                Компания готова рассмотреть студентов..
            </div>
            <div class="website" v-for="link in practice.doc_links" :key="link.id">
                <div v-if="link.type === 'Веб-сайт'">
                    <a :href="link.url">
                        {{ " " + link.type }}
                    </a>
                </div>
                <div v-else>
                    {{ link.type }}
                </div>
            </div>
        </div>
        <button class="button" @click="readMore(index)">
            {{ isVisible[index] ? "Закрыть" : "Подробнее" }}
        </button>
    </div>
 </template>
 

<style scoped>
#more{display: none;}
.info-row { 
    font-size: 20px;
    font-weight: 500;
    color: #202020; 
    line-height: 24.38px;
    padding: 0px 0px 10px 40px;
}
.aboba {
    display:inline-flex;
    justify-content: left; 
    align-items:center;
    min-height: 40px;
    font-weight: 500;
    font-size: 20px;
    line-height: 29.26px;
    color: #727272;
}
.empty {
   font-family: system-ui, -apple-system, "Segoe UI", Ro;
   background-color: rgb(103, 187, 255);
   max-width: 1160px;
   height: auto;
   border-radius: 40px;
   box-shadow: 0 15px 30px 1px grey;
   margin: auto;
   margin-top: 40px;
   margin-bottom: 40px;
   justify-content: center; 
   align-items: center; 
   padding: 10px 0px 10px 40px;
}
.empty h2 {
   padding-right: 20px;
   font-weight: 400;
}
.error {
   font-family: system-ui, -apple-system, "Segoe UI", Ro;
   background-color: crimson;
   max-width: 1160px;
   height: auto;
   border-radius: 40px;
   box-shadow: 0 15px 30px 1px grey;
   margin: auto;
   margin-top: 40px;
   margin-bottom: 40px;
   justify-content: center; 
   align-items: center; 
   padding: 10px 0px 10px 40px;
}
.error h2 {
   padding-right: 20px;
   font-weight: 400;
}
.card1 {
   font-family: system-ui, -apple-system, "Segoe UI", Ro;
   background-color: rgb(255, 255, 255);
   max-width: 1160px;
   height: auto;
   border-radius: 40px;
   box-shadow: 0 15px 30px 1px grey;
   margin: auto;
   margin-top: 60px;
   margin-bottom: 60px;
}
.info {
   display: flex;
   align-items: center; 
}
.info-left {
   margin: 40px;
   border-radius: 20px;
   background-color: #F0F0F0;
   display:inline-flex;
   justify-content: center; 
   align-items:center;
}
.img1 {
   width: 180px;
   height: auto;
   border-radius: 20px;
   justify-content: center; 
   align-items:center;
}
.info-right {
   padding: 0px 20px 0px 0px;
}
h2 {
   margin: 20px 0px 20px 0px;
   font-size: 36px;
   font-weight: 500;
}
.info-text {
   font-size: 20px;
   font-weight: 500;
   color: #727272;
}
.body-cell {
   margin-left: 40px;
}
.cell {
   color: rgb(40, 40, 40);
   background: #C3C3C3;
   display:inline-flex;
   justify-content: center; 
   align-items:center;
   border-radius: 15px;
   min-height: 33px;
   width: auto;
   padding: 0px 15px 0px 15px;
   margin: 0px 10px 10px 0px ;
   font-size: 15px;
   font-weight: 500;
   color: #000000;
}
hr {
   background-color: #000000;
   color: #000000;
   height: 1px;
   max-width: 800px;
   margin: 10px 0px 15px 40px;
}
.link-block {
   margin-left: 40px;
}
.presentation {
   background-color: rgba(255, 255, 255, 0);
   font-weight: 500;
   font-size: 20px;
   color:#000000;
   padding: 5px 0px 5px 0px;
}
.students {
   background-color: rgba(255, 255, 255, 0);
   font-weight: 500;
   font-size: 20px;
   color:#000000;
   padding: 5px 0px 5px 0px;
}
.website {
   padding: 5px 0px 5px 0px;
}
a {
   font-weight: 500;
   font-size: 20px;
   color:#000000;
   text-decoration: none;
   background-color: rgba(255, 255, 255, 0);
}
.button {
   background-color: #FFFFFF;
   width: 150px;
   height: 40px;
   margin: 20px 0px 30px 40px;
   color:#0B6EFE;
   font-size: 16px;
   font-weight: 500;
   line-height: 19.5px;
   border-radius: 20px;
   align-items: center;
   letter-spacing: 0.2px;
   border: 2px solid #0B6EFE;
   transition: background-color 0.3s ease, color 0.3s ease;
}
.button:hover{
    background-color: #0B6EFE;
    color:#FFFFFF;
}
@media (max-width: 800px) {
   .info {
       display: block;
   }
   .info-left {
       margin: 20px 20px 20px 40px;
   }
   .info-right {
       padding: 0px 20px 0px 40px;
   }
   .info-right h2 {
       font-size: 20px;
       margin: 0px 0px 20px 0px; 
   }
   .body-cell {
       padding-top: 20px;
       padding-right: 20px;
   }
   .link-block {
       padding-right: 20px;
   }
   .empty h2 {
       font-size: 20px;
   }
   .error h2 {
       font-size: 20px;
   }
}
</style>

<script setup>
import { usePartnersStorage } from '@/storages/PartnersStorage'
import { ref, onBeforeMount } from "vue";
const partnersStorage = usePartnersStorage();
const props = defineProps({
   instId: {
       type: Number,
       required: true,
   }
});
const isVisible = ref([]);
onBeforeMount(() => {
   partnersStorage.setInstId(props.instId);
   isVisible.value = new Array(partnersStorage.partners.length).fill(false);
});
function readMore(index) {
   isVisible.value[index] = !isVisible.value[index];
}
</script>

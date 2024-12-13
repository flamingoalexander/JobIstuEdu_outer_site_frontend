<template>
    <div class="profile-info">
        <h1 class="profile-title">Информация о компании</h1>   
        <div class="alo1">
            <div class="gol-left">
                <div class="info-row">
                    Лого компании:
                    <br>
                    <div class="abobaimg">
                        <img :src="company?.image" alt="Лого компании" class="company-logo" />
                    </div>
                </div>
            </div>
            <div class="gol-right1">
            <div class="info-row">
                Название компании:
                <br>
                <div class="aboba">
                <span>{{company?.name}}</span>
            </div>
            </div>
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
            </div>
        </div>

        <div class="body-cell"> 
            <div class="cell">Тема 1</div> 
            <div class="cell">Тема 2</div> 
            <div class="cell">Тема 3</div> 
        </div>

        <div class="info-row2">
            Договор с ИРНИТУ
        </div>
        <div class="info-row2">
            Название договора:
            <br>
            <div class="aboba">
                <span>{{company?.agreements}}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-info {
  padding: 30px 60px 30px 60px;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  max-width: 920px;
}
.profile-title {
  margin-top: 5px;
  margin-bottom: 25px;
  font-size: 40px;
  color: #000000;
  text-align: center;
  font-weight: 500;
  font-size:36px;
  line-height: 43.88px;
}
.alo1 {
    display:flex;
    justify-content: start;
    margin-bottom: 25px;
}
.gol-left {
   text-align: left;
}
.gol-right1 {
    text-align: left; 
    display: flex;
    flex-direction: column; 
    padding-left: 3em;
}
.info-row { 
    font-size: 20px;
    font-weight: 600;
    color: #202020; 
    line-height: 24.38px;
    padding: 10px 0px 0px 0px;
}
.aboba {
    display:inline-flex;
    justify-content: left; 
    align-items:center;
    min-height: 40px;
    font-weight: 400;
    font-size: 24px;
    line-height: 29.26px;
}
.abobaimg {
    background-color: #e4e4e4;
    display:inline-flex;
    justify-content: center; 
    align-items:center;
    border-radius: 10px;
    width: 200px;
    height: 200px;
}
.company-logo {
  width: 90%;
  height: auto;
  border-radius: 10px;
}
.alo2 {
    display:flex;
    justify-content: start;
    margin-bottom: 0px;
}
.gol-right2 {
    text-align: left; 
    display: flex;
    flex-direction: column; 
    padding-left: 18em;
}
.info-row2 { 
    font-size: 20px;
    font-weight: 600;
    color: #202020; 
    line-height: 24.38px;
    padding: 30px 0px 0px 0px;
}
.body-cell {
   margin-top: 30px;
}
.cell {
    color: rgb(40, 40, 40);
    background: #e4e4e4;
    display:inline-flex;
    justify-content: center; 
    align-items:center;
    border-radius: 15px;
    min-height: 33px;
    min-width: 180px;
    width: auto;
    padding: 0px 15px 0px 15px;
    margin: 0px 10px 10px 0px ;
    font-size: 15px;
    font-weight: 500;
    color: #000000;
}
@media (max-width: 550px) {
    .alo1 {
        display:block;
        margin-bottom: 15px;
    }
    .alo2 {
        display:block;
        margin-bottom: 25px;
    }
    .gol-right1 {
        padding-left: 0px;
    }
    .gol-right2 {
        padding-left: 0px;
    }
    .info-row2 {
        padding-top: 10px;
    }
    .body-cell {
   margin-top: 0px;
}
}
</style>

<script setup>
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
const company = ref(null)
const route = useRoute()
onBeforeMount(async () => {
    const company_id = route.query.company_id;
    const response = await axios.get('/api/out/legacy/company/' + company_id)
    company.value = response.data
})
</script>
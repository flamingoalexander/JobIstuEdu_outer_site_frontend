<template>
    <div class="cardd">
        <div class="chto">
            <div class="block_with_picture">      
                 <div class="picture">
                    <img :src="current_institute.picture" style="height: 15rem;width: 15rem;" alt="тут должна быть картинка">
                </div>
                <div class="text-content">
                    <h2 style="margin: 0px;">
                        Промышленные партнеры института <br>"{{ current_institute.name }}"
                    </h2>
                </div>
            </div>
            <h2 style="margin: 0px 40px 32px 40px; font-size: 32px" >Направления: </h2>
            <div class="spisok">  
                <div v-if="bachelor.length > 0">
                    <div class="zag">
                        Бакалавриат 
                    </div>
                    <div class="test">
                        <div class="mini1" v-for="(speciality) in bachelor">{{ speciality }}</div>
                    </div>
                    <hr>
                </div>
                <div v-if="magistracy.length > 0">
                    <div class="zag">
                        Магистратура 
                    </div>
                    <div class="test">
                        <div class="mini2" v-for="(speciality) in magistracy">{{ speciality }}</div>
                    </div>
                    <hr>
                </div>
                <div v-if="specialty.length > 0">
                    <div class="zag">
                        Специалитет 
                    </div>
                    <div class="test">
                        <div class="mini3" v-for="(speciality) in specialty">{{ speciality }}</div>
                    </div>
                    <hr>
                </div>
                <div v-if="other.length > 0">
                    <div class="zag">
                        Другие 
                    </div>
                    <div class="test">
                        <div class="mini4" v-for="(speciality) in other">{{ speciality }}</div>
                    </div>
                </div>
            </div>
        </div>  
        <div>
            <button href="#" class="to_home_bt"> <<router-link class="gray-link" :to="{ name: 'home' }">На главную </router-link></button>
        </div>
    </div>
</template>

<style scoped>
.cardd {
    font-family: system-ui, -apple-system, "Segoe UI", Ro;
    background-color: rgb(255, 255, 255);
    max-width: 1160px;
    height: auto;
    border-radius: 40px;
    margin: auto; 
    box-shadow: 0 15px 30px 1px grey;
}
.spisok {
    text-align: left;
    padding: 0px 32px 0px 32px;  
}
.zag {
    margin:0px 0px 10px 20px;
    font-size: 32px;
}
.test {
    text-align: left;
}
.mini1 {
    color: rgb(40, 40, 40);
    background: linear-gradient(135deg, rgba(255, 255, 110, 1) 0%, rgba(255, 200, 0, 1) 100%);
    display:inline-flex;
    justify-content: center; 
    align-items:center;
    border-radius: 15px;
    width: 160px;
    height: 80px;
    margin: 10px ;
    font-size: 32px;
    font-weight: 500;
}
.mini2 {
    color: rgb(40, 40, 40);
    background: linear-gradient(135deg, rgba(255, 223, 150, 1) 0%, rgba(255, 165, 50, 1) 100%);
    display:inline-flex;
    justify-content: center; 
    align-items: center; 
    border-radius: 15px;
    width: 160px;
    height: 80px;
    margin: 10px ;
    font-size: 32px;
    font-weight: 500;
}
.mini3 {
    color: rgb(40, 40, 40);
    background: linear-gradient(135deg, rgba(255, 165, 0, 1) 0%, rgba(255, 94, 0, 1) 100%);
    display:inline-flex;
    justify-content: center; 
    align-items: center; 
    border-radius: 15px;
    width: 160px;
    height: 80px;
    margin: 10px ;
    font-size: 32px;
    font-weight: 500;
}
.mini4 {
    color: rgb(40, 40, 40);
    background: linear-gradient(135deg, rgba(255, 90, 0, 1) 0%, rgba(255, 50, 0, 1) 100%);
    display:inline-flex;
    justify-content: center; 
    align-items: center; 
    border-radius: 15px;
    width: 160px;
    height: 80px;
    margin: 10px ;
    font-size: 32px;
    font-weight: 500;
}
.block_with_picture {
    display:flex;
    align-items: center;
}
.picture {
    background-color: rgb(255, 255, 255);
    max-width: 20rem;
    margin: 40px;
    border-radius: 20px;
}
.text-content {
    width: 85%;
    margin: 0px 0px 0px 40px;
    font-size: 16px;
    
}
.to_home_bt {
    background-color: rgb(255, 255, 255);
    border:none;
    margin: 40px;  
    font-size:25px;
    color: gray;
}
.gray-link {
    color: gray;
}
.gray-link:hover {
    color: gray; 
}
hr {
    background-color:rgb(0, 0, 0);
}
@media (max-width: 610px) {
    .block_with_picture {
        display:flow-root;
    }
    .text-content {
    margin: 0px 0px 40px 40px;  
    }
}
</style>
<script setup>
import { watch, onBeforeMount, reactive } from 'vue';
import { useInstStorage } from '@/storages/InstStorage';
import { usePracticeStorage } from '@/storages/PracticeStorage';
import { storeToRefs } from 'pinia';
const instStorage = useInstStorage();
const practiceStorage = usePracticeStorage();
let bachelor = reactive([]);
let magistracy = reactive([]);
let specialty = reactive([]);
let other =reactive([]);
const { current_institute } = storeToRefs(instStorage);
watch(current_institute, (newVal) => {
    if (newVal && newVal.specialities) {
        let directions = newVal.specialities.flat();
        console.log(directions);
        directions.forEach(direction => {
            if (direction.education_level === 2){
                bachelor.push(direction.code);
            }
            else if (direction.education_level === 3) {
                magistracy.push(direction.code);
            }
            else if (direction.education_level === 1) {
                specialty.push(direction.code);
            }
            else {
                other.push(direction.code);
            }
        })
    }
}, { immediate: true });
onBeforeMount(() => {
    instStorage.getInstsById(practiceStorage.getInstId())
});
</script>
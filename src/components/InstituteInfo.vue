<template>
    <div class="cardd">
        <div class="chto">
            <div class="block_with_picture">      
                 <div class="picture">
                    <img :src="currentInstitute.picture" alt="тут должна быть картинка">
                </div>
                <div class="text-content">
                    <h2>
                        Промышленные партнеры института <br>"{{ currentInstitute.name }}"
                    </h2>
                </div>
            </div>
            <h2 class="h2_napravl">Направления: </h2>
            <div class="spisok">
                <div v-if="bachelor.length > 0">
                    <div class="zag">
                        Бакалавриат
                    </div>
                    <div class="test">
                        <a class="mini mini1 tooltip-container" v-for="(speciality) in bachelor"
                           :href="speciality.url ? speciality.url : null"
                           v-bind:data-tooltip="speciality.full_name">
                           {{ speciality.code }}
                        </a>
                    </div>
                    <hr>
                </div>
                <div v-if="magistracy.length > 0">
                    <div class="zag">
                        Магистратура
                    </div>
                    <div class="test">
                        <a class="mini mini2 tooltip-container" v-for="(speciality) in magistracy"
                            :href="speciality.url ? speciality.url : null"
                            v-bind:data-tooltip="speciality.full_name">   
                            {{ speciality.code }}
                        </a>
                    </div>
                    <hr>
                </div>
                <div v-if="specialty.length > 0">
                    <div class="zag">
                        Специалитет
                    </div>
                    <div class="test">
                        <a class="mini mini3 tooltip-container" v-for="(speciality) in specialty"
                        :href="speciality.url ? speciality.url : null"
                        v-bind:data-tooltip="speciality.full_name">
                        {{ speciality.code }}
                    </a>
                    </div>
                    <hr>
                </div>
                <div v-if="other.length > 0">
                    <div class="zag">
                        Другие
                    </div>
                    <div class="test">
                        <a class="mini mini4 tooltip-container" v-for="(speciality) in other"
                            :href="speciality.url ? speciality.url : null"
                            v-bind:data-tooltip="speciality.full_name">
                            {{ speciality.code }}
                        </a>
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
    box-shadow: 0 10px 10px 1px grey;
}
.h2_napravl
{
    margin: 0px 40px 32px 40px;
}
.spisok { 
    padding: 32px 0px 0px px;
    margin-left: 40px;
    margin-right: 40px;
}
.zag {
    margin:0px 0px 10px 0px;
    font-size: 32px;
}
.test {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content:center;
}
.mini {
    color: rgb(40, 40, 40);
    display:inline-flex;
    justify-content: center;
    align-items:center;
    border:50px;
    border-radius: 15px;
    margin: 5px 0px 5px 0px;
    min-width: 160px;
    max-width: 180px;
    height: 80px;
    font-size: 32px;
    font-weight: 500;
    text-decoration: none;
    flex: 1;
}
.mini1 {
    background: linear-gradient(135deg, rgba(255, 255, 110, 1) 0%, rgba(255, 200, 0, 1) 100%);
}
.mini2 {
    background: linear-gradient(135deg, rgba(255, 223, 150, 1) 0%, rgba(255, 165, 50, 1) 100%);
}
.mini3 {
    background: linear-gradient(135deg, rgba(255, 165, 0, 1) 0%, rgba(255, 94, 0, 1) 100%);
}
.mini4 {
    background: linear-gradient(135deg, rgba(255, 90, 0, 1) 0%, rgba(255, 50, 0, 1) 100%);
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
.picture>img {
    height: auto;
    width: 15rem;
}
h2 {
    margin: 0px; 
    font-size: 32px;
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
.tooltip-container {
    position: relative;
}
.tooltip-container::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 110%;
    left: 50%;
    font-size: 50%;
    font-weight: normal;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    white-space: normal;
    min-width: 220px;
    height: auto;
    text-align: center; 
    display: block; 
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.tooltip-container:hover::after {
    visibility: visible;
    opacity: 0.9;
}

@media (max-width: 700px) {
    .block_with_picture {
        display:flow-root;
    }
    .text-content {
        margin: 0px 0px 40px 40px;
    }
}
</style>
<script setup>
import {onBeforeMount, reactive} from "vue";
const props = defineProps({
    instId: {
        type: Number,
        required: true,
    }
});
import {useInstitutesStorage} from "@/storages/InstitutesStorage";
const InstitutesStorage = useInstitutesStorage();
let bachelor = reactive([]);
let magistracy = reactive([]);
let specialty = reactive([]);
let other =reactive([]);

const currentInstitute = InstitutesStorage.getInstituteById(Number(props.instId));
onBeforeMount(()=>{
    if (currentInstitute && currentInstitute.specialities) {
        let directions = currentInstitute.specialities.flat();
        directions.forEach(direction => {
            if (direction.education_level === 2){
                bachelor.push(direction);
            }
            else if (direction.education_level === 3) {
                magistracy.push(direction);
            }
            else if (direction.education_level === 1) {
                specialty.push(direction);
            }
            else {
                other.push(direction);
            }
        })
    }
})
</script>
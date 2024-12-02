<template>
    <div>
        <div v-if="isLoading">
            <h2 class="empty">Загрузка...</h2>
        </div>
        <div v-else>
            <div class="container-xl">
                <InstituteInfo :instId="instituteId" />
            </div>
            <div v-if="!isLoading" class="container-xl">
                <PracticeList :instId="instituteId"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import PracticeList from '@/components/PracticeList.vue';
import InstituteInfo from '@/components/InstituteInfo.vue';
import {useInstitutesStorage} from "@/storages/InstitutesStorage";
import {usePartnersStorage} from "@/storages/PartnersStorage";
import {onBeforeMount, ref} from "vue";
const InstitutesStorage = useInstitutesStorage()
const PartnersStorage = usePartnersStorage()
const props = defineProps({
    instituteId: {
        required: true,
    }
});
const isLoading = ref(false)
onBeforeMount(async ()=>{
    if (InstitutesStorage.isEmpty === true) {
        isLoading.value = true;
        try {
            await InstitutesStorage.getInstitutesFromServer()
        } catch (error) {
            console.log(error)
        } finally {
            isLoading.value = false;
        }
    }
})
</script>
<style scoped>
.empty {
    font-family: system-ui, -apple-system, "Segoe UI", Ro;
    background-color: rgb(103, 187, 255);
    border-radius: 40px;
    box-shadow: 0 15px 30px 1px grey;
    text-align: center;
    font-weight: 500;
    margin: 2em;
    font-size: 36px;
}

</style>
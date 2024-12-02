<template>
    <div>
        <div v-if="!isLoading" class="container-xl">
            <InstituteInfo :instId="instituteId" />
        </div>
        <div v-else>
            <h1>LOADING...</h1>
        </div>
        <div v-if="!isLoading" class="container-xl">
            <PracticeList :instId="instituteId"/>
        </div>
        <div v-else>
            <h1>LOADING...</h1>
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

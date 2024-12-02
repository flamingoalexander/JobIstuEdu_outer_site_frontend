<template>
    <div>
        <div class="container-xl">
            <HatInstitute :instituteId="props.instituteId" />
        </div>
        <div class="container-xl">
            <PracticeList :instituteId="props.instituteId"/>
        </div>

    </div>
</template>
<script setup>
import PracticeList from '@/components/PracticeList.vue';
import HatInstitute from '@/components/HatInInstitute.vue';
import {useInstitutesStorage} from "@/storages/InstitutesStorage";
import {usePartnersStorage} from "@/storages/PartnersStorage";
import {onBeforeMount} from "vue";
const InstitutesStorage = useInstitutesStorage()
const PartnersStorage = usePartnersStorage()
const props = defineProps({
    instituteId: {
        required: true,
    }
});
PartnersStorage.setInstId(props.instituteId);
onBeforeMount(()=>{
    if(InstitutesStorage.institutes.length === 0){
        InstitutesStorage.getInstitutesFromServer()
    }
})
</script>

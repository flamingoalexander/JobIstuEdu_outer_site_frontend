<template>
    <div>
        <div class="container-xl">
            <HatInstitute/>
        </div>
        <div class="container-xl">
            <PracticeList/>  
        </div>

    </div>
</template>
<script setup>
import PracticeList from '@/components/PracticeList.vue';
import HatInstitute from '@/components/HatInInstitute.vue';

const {instituteId} = defineProps({
    instituteId: {
        type: Number,
        required: true,
    }
});
console.log(instituteId)
</script>

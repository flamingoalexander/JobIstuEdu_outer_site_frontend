<template>
    <div>
        <div class="container-xl">
            <HatInstitute/>
        </div>
        <div class="container">
            <div class="container-fluid">
                <div class="col-sm p-3 min-vh-100">
                    <PracticeList/>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import PracticeList from '@/components/PracticeList.vue';
import HatInstitute from '@/components/HatInInstitute.vue';
</script>

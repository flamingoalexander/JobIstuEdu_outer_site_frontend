<template>
        <a v-for="inst in InstitutesStorage.institutes" class = "block" >
            <router-link :to="{ name: 'partner' }">
                <button href="#" class="button"  style = "margin-left: 35px;" 
                    @click="practiceStorage.setInstId(inst.id)">
                        <div class="Institutes" v-bind:style="{backgroundImage:'url(' + inst.picture + ')'}">
                            <div class="textInst">
                                <div style="margin-left: 10px; margin-bottom: 15px;">{{ inst.name }}</div>
                            </div>
                        </div>
                    </button>
                </router-link>
            </a>
</template>
<script setup>
import { useInstitutesStorage } from '@/storages/InstitutesStorage'
import { onBeforeMount } from 'vue';
const InstitutesStorage = useInstitutesStorage()
onBeforeMount(() => {
    InstitutesStorage.getInstitutesFromServer()
})
</script>
<style scoped>
button {
    background-color: #F0F3F8;
}
</style>
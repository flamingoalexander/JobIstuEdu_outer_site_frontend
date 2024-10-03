<template>
    
        <a v-for="inst in instStorage.Insts" class = "block" >
            
            <router-link :to="{ name: 'partner' }">
                <button href="#" class="button"  style = "margin-left: 35px;" 
                    @click="practiceStorage.setInstId(inst.id)">
                        <div class="Institutes" v-bind:style="{backgroundImage:'url(' + inst.picture + ')'}">
                            <div class="textInst">
                                <div style="margin-left: 10px; margin-bottom: 15px;">{{ inst.name }}</div>

                                <!-- <div class="specText"><strong>Специальности:</strong>
                                    {{ inst.specialities.join(', ') }}
                                </div> -->

                                <!-- <div class="specText"><strong>Должности:</strong>{{ inst.works }}</div> -->

                            </div>
                        </div>
                    </button>
                </router-link>
            
            </a>
    
</template>
<script setup>
import { ref, watch } from 'vue';
import { useInstStorage } from '@/storages/InstStorage'
import { onBeforeMount } from 'vue';
import { usePracticeStorage } from '@/storages/PracticeStorage';
const instStorage = useInstStorage()
const practiceStorage = usePracticeStorage()


onBeforeMount(() => {
    // console.log("получаем институты")
    instStorage.getInstsFromServer()
    // console.log(instStorage.value.getInstsFromServer())

})
</script>

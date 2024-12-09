<template>
    <input
        type="text"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        class="custom-input__field"
        :class="{
            'custom-input__field--error': error,
            'custom-input__field--edit': !disabled
        }"
        :disabled="disabled"
        @input="onInput"
    >
    <p v-if="error" class="custom-input__error">ЕРРОР</p>
</template>

<script setup>

defineProps({
    value:{
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: '',
    },
    id: {
        type: String,
        required: true,
    },
    error: {
        type: Boolean,
        default: false,
    }
})
const emit = defineEmits(['update:value']);
const onInput = (event) => {
    emit('update:value', event.target.value)
}
</script>

<style scoped>
.custom-input__field {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 10px;
    transition: border-color 0.3s;
    background-color: #e4e4e4;
}
.custom-input__field--edit {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 10px;
    transition: border-color 0.3s;
    background-color: honeydew;
}
.custom-input__field:focus {
    outline: none;
    border-color: #4a90e2;
    background-color: white;
}

.custom-input__field--error {
    border-color: #e74c3c;
}

.custom-input__error {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 4px;
}
</style>

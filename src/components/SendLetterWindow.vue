<template>
    <div>
        <p>Для регистрации вашей компании необходимо отправить заполненную версию
            <a href="https://job.istu.edu/out/templates" >документа</a>
                на адрес  <a :href="emailLink" class="email-link">job.istu.edu@istu.ru</a></p>
    </div>
</template>

<script>
export default {
    setup() {
        const emailLink = 'mailto:job.istu.edu@istu.ru?subject=Регистрация компании&body=Заполненная версия документа';

        return {
            emailLink,
        };
    },
};
</script>

<style scoped>
p {
    font-size: 18px;
    color: #333;
}

</style>
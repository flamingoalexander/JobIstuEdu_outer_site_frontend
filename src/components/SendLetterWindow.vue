<template>
    <div class="message-container">
        <p class="message">
            Для регистрации вашей компании необходимо отправить заполненную версию
            <a href="https://job.istu.edu/out/templates" class="document-link">документа</a>
            на адрес
            <a :href="emailLink" class="email-link">job.istu.edu@istu.ru</a>
        </p>
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
/* Оформляем контейнер */
.message-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Стили для текста */
.message {
    font-size: 18px;
    color: #333;
    background-color: #ffffff; /* Белый фон для блока с текстом */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px; /* Ограничиваем максимальную ширину */
    text-align: center;
}

/* Стили для ссылок */
.document-link {
    text-decoration: none;
}

.document-link:hover {
    text-decoration: underline;
}

.email-link {
    text-decoration: none;
}

.email-link:hover {
    text-decoration: underline;
}
</style>
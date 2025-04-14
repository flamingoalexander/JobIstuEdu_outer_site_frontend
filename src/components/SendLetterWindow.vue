<template>
    <div class="message-container">
        <p class="message">
            Для регистрации вашей компании необходимо отправить заполненную версию
            документа на адрес
            <a :href="emailLink" class="email-link">job@istu.ru</a>.
        </p>
        <p>
            <a href="https://job.istu.edu/out/templates/long_agreement2023.docx" class="document-link">Долгосрочный договор</a>
        </p>
        <p>
            <a href="https://job.istu.edu/out/templates/short_agreement2023.docx" class="document-link">Индивидуальный договор</a>
        </p>
    </div>
</template>

<script setup>
const emailLink = 'mailto:job@istu.ru?subject=Регистрация компании&body=Заполненная версия документа';
</script>

<style scoped>
/* Контейнер */
.message-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(135deg, #e3f2fd, #bbdefb); /* Оттенки синего */
    border-radius: 15px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 40px auto;
}

/* Сообщение */
.message {
    font-size: 18px;
    color: #0d47a1; /* Темно-синий */
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    line-height: 1.6;
    margin-bottom: 20px;
}

/* Общие стили для ссылок */
a {
    color: #1565c0; /* Синий */
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease, text-shadow 0.3s ease;
}

a:hover {
    color: #0d47a1; /* Более темный синий при наведении */
    text-shadow: 0 0 8px rgba(21, 101, 192, 0.5);
}

/* Индивидуальные ссылки для документов */
.document-link {
    display: inline-block;
    padding: 10px 15px;
    margin: 10px;
    background-color: #ffffff;
    color: #1565c0;
    border: 2px solid #1565c0;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
    font-size: 16px;
    text-decoration: none;
}

.document-link:hover {
    background-color: #1565c0; /* Синий фон при наведении */
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(21, 101, 192, 0.3);
}

/* Ссылки для email */
.email-link {
    color: #1e88e5; /* Яркий синий */
    font-weight: bold;
    transition: color 0.3s ease, text-shadow 0.3s ease;
}

.email-link:hover {
    color: #0d47a1; /* Темно-синий при наведении */
    text-shadow: 0 0 8px rgba(30, 136, 229, 0.5);
}
</style>

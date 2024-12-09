<script setup>
import { ref, reactive, onBeforeMount} from 'vue';
import { useUserStorage } from '@/storages/UserStorage';
import { useRouter } from 'vue-router';
import AuthService from "@/services/AuthService";

const isDisabled = ref(false);

const userStorage = useUserStorage()
const router = useRouter();
const authHolder = reactive({
    username: '',
    password: '',
    rememberMe: false,
});
const authMessage = ref('');

const handleAuth = async () => {
    try {
        const loginResponse = await AuthService.login(authHolder.username, authHolder.password);


        if (loginResponse.data.error) {
            authMessage.value = 'Неверный логин или пароль';
        }
        else {
            await router.push({name: 'user'});
        }
    } catch (error) {
        authMessage.value = `Ошибка сервера: ${error.message}`;
    }
}
const formSubmitHandler = (e) => {
    e.preventDefault();
    handleAuth();
}
if (localStorage.getItem('username')) {
    authHolder.username = localStorage.getItem('username');
    authHolder.rememberMe = true;
}
onBeforeMount(() => {
    if (localStorage.getItem('access_token')) {
        router.push({ name: 'user' });
    }
});
</script>

<template>

    <div id="container">

        <div class="product-image">
            <img src="..\assets\pics\beztexta.jpg" alt="">
            <div class="overlay-text">
                Центр<br>
                Карьеры <br>
                ИРНИТУ
            </div>
        </div>
        <div class="content">
            <div class="information">
                <h1>Авторизация</h1>
            </div>

            <div class="modal-body">

                <div v-if="authMessage" class="alert alert-danger">
                    {{ authMessage }}
                </div>
                <form action="">
                    <div class="form-group">
                        <div class="input-icon">
                            <input id="username" class="form-control" placeholder="Логин" autocomplete="username" v-model="authHolder.username" />
                            <i class="fas fa-user"></i>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="input-icon">
                            <input id="password" type="password" class="form-control" placeholder="Пароль" autocomplete="current-password" v-model="authHolder.password" />
                            <i class="fas fa-lock"></i>
                        </div>
                    </div>

                    <div class="checkbutton">
                        <input type="checkbox"
                               class="custom-checkbox"
                               id="rememberMe"
                               name="rememberMe"
                               value="yes"
                               v-model="authHolder.rememberMe"
                               :disabled="isDisabled">
                        <label for="rememberMe">Запомнить меня</label>
                    </div>

                    <div style="margin: 50px 0px 0px 0px; text-align: center;">
                        <button type="submit" class="btn btn-primary" style="margin-bottom: 10px;" @click="formSubmitHandler">
                            Авторизоваться
                        </button>
                        <div>
                            <a href="https://job.istu.edu/in">Студенту</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bree+Serif&family=EB+Garamond:ital,wght@0,500;1,800&display=swap');

@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
body {
    background: #9c1818;
    background-image: linear-gradient( to right, #ffffb3,#ffe6e6);
    background-attachment: fixed;
    background-size: cover;
    font-family: verdana, Arial, sans-serif;
}

#container{
    box-shadow: 0 15px 30px 1px grey;
    background: rgb(255, 255, 255);
    text-align: center;
    margin: 5em auto;
    width: 100%;


    position: relative;
    border-radius: 40px;
    min-height: 480px;
}

.product-image {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

}

.product-image img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 40px;
    min-height: 480px;
}

.overlay-text {
    position: absolute;
    font-size: 440%;
    top: 5%;
    left: 5%;
    font-weight: 500;
    color: #222222;
    text-shadow: 2px 2px 4px rgba(116, 116, 116, 0.5);
    line-height: 1;
    text-align: left;
}

.content {
    position: absolute;
    min-width: 50%;
    height: 100%;
    padding: 40px 20px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-radius: 40px;
    top: 0;
    right: 0;
}

.information{
    display: inline-block;
    font-size: 20px;
    color: #344055;
    margin: 0px;
}

.information, h1
{
    font-size: 40px;
    color: #222222;
}

.form-group
{
    margin: 60px 0px 10px 0px;
    position: relative;
}

.form-control {
    border: none;
    border-bottom: 2px solid #646464;
    padding: 4px 0;
    width: 100%;
    outline: none !important;
    border-radius: 0%;
    text-indent: 5px;
}

.form-control:focus {
    border-bottom-color: #222222;
    outline: none !important;
    box-shadow: none;
}

.form-control:focus-visible {
    outline: none !important;
}


#container img {width: 100%;height: auto;}

.input-icon {
    position: relative;
}

.input-icon input {
    padding-right: 30px;
}

.input-icon i {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #646464;
    transition: color 0.3s
}

.input-icon input:focus + i {
    color: #222222;
}
.checkbutton
{
    display: flex;
    justify-content: flex-start;
    margin: 4px 0px 0px 4px;
}

.custom-checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
}

.custom-checkbox+label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    cursor: pointer;

}

.custom-checkbox+label::before {
    content: '';
    display: inline-block;
    width: 1.2em;
    height: 1.2em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 0px solid #adb5bd;
    border-radius: 0.25em;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 70% 70%;
    background-color: #b3d7ff;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");

}

.custom-checkbox:checked+label::before {

    background-color: #0b76ef;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.custom-checkbox:not(:disabled):active+label::before {
    background-color: #b3d7ff;
    border-color: #b3d7ff;
}

.btn-primary
{
    border-radius: 20px;
    padding: 8px 46px;
    font-weight: bold;
    letter-spacing: 0px;
}

.btn-btn-noneprimary {
    background-color: transparent;
    text-decoration: underline;
    border: none;
    cursor: pointer;
}


.btn-btn-noneprimary a {
    color: #808080;
}

@media (max-width: 700px){

    #container
    {
        max-width: 380px;
    }
    .content {
        min-width: 100%;
        min-height: 430px;
    }
}

</style>
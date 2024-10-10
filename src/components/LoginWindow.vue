<script setup>
import { ref, reactive } from 'vue';
import { useUserStorage } from '@/storages/UserStorage';
import { useRouter } from 'vue-router';
import axios from 'axios';


const userStorage = useUserStorage()
const router = useRouter();
const authHolder = reactive({
  username: '',
  password: '',
});
const authMessage = ref('');

const handleAuth = async () => {
  try {
    const response = await userStorage.authInputUser(authHolder);
    console.log(response);
    if (response.data.error) {
      authMessage.value = 'Неверный логин или пароль';
    } else {
      await router.push({name: 'user'});
    }
  } catch (error) {
    authMessage.value = `Ошибка сервера: ${error.message}`;
  }
}

</script>

<template>
    <div style="align-items: center;">
        <div class="card" style="width: 30rem;">
            <div style="margin: 2rem;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            Авторизация
                        </h5>
                    </div>
                    <div class="modal-body">
                        <div v-if="authMessage" class="alert alert-danger">
                          {{ authMessage }}
                        </div>
                        <div class="form-group">
                            <label>Username</label>
                            <input class="form-control" placeholder="Username" v-model="authHolder.username" />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" placeholder="Password"
                                v-model="authHolder.password" />
                        </div>
                        <div style="margin-top: 10px; text-align: center;">
                                <button href="/" type="button" class="btn btn-primary" data-bs-target="#login"
                                    style="margin-bottom: 10px;" @click="handleAuth()">
                                    Авторизоваться
                                </button>
                            <div><button type="button" class="btn btn-primary"><a href="https://job.istu.edu/in"
                                        style="color: azure; text-decoration: none;">Студенту</a>
                                </button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
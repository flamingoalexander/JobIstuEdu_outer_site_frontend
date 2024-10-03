<script setup>
import { ref } from 'vue';
import { useUserStorage } from '@/storages/UserStorage';
import axios from 'axios';

const userStorage = ref(useUserStorage())

const authHolder = {
    username: '',
    password: '',
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
                            <router-link :to="{ name: 'user' }">
                                <button href="/" type="button" class="btn btn-primary" data-bs-target="#login"
                                    style="margin-bottom: 10px;" @click="userStorage.authInputUser(authHolder)">
                                    Авторизоваться
                                </button></router-link>
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
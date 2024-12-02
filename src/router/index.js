import {createRouter, createWebHistory} from 'vue-router'
import InstitutesView from '@/views/InstitutesView.vue';
import PracticeView from '@/views/PracticeView.vue';
import UserView from '@/views/UserView'
import AuthView from '@/views/AuthView.vue'
import UpdateView from '@/views/UpdateView.vue'
import CompanyInfoView from "@/views/CompanyInfoView.vue";
import SendLetterWindow from '@/components/SendLetterWindow.vue';
const routes = [
    {
        path: '/',
        name: 'home',
        component: InstitutesView
    }, {
        path: '/partner',
        name: 'partner',
        component: PracticeView
    },
    {
        path: '/auth',
        name: 'auth',
        component: UserView
    },
    {
        path: '/user',
        name: 'user',
        component: AuthView
    },
    {
        path: '/update',
        name: 'update',
        component: UpdateView
    },
    {
        path: "/company",
        name: "CompanyInfo",
        component: CompanyInfoView
    },
    {
        path: "/register",
        name: "SendLetter",
        component: SendLetterWindow
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// router.beforeEach((to, from, next) => {
//     console.log(to.name);
//     console.log(from.name);
//     console.log(next.name);
//     const accessToken = localStorage.getItem('accessToken');
//     if (to.name !== 'auth' && from.name !== 'auth') {
//         if (!accessToken) {
//             return next({
//                 name: 'auth',
//             });
//         }
//     }
//     next();
// })
export default router

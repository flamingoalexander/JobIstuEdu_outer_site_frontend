<template>


    <div class="Header">
        <a href="/"><button class="logo"><img
                    src="https://www.istu.edu/upload/iblock/f55/logo_1.png" class="logo"></button></a>
        <div class="name">

            Производственные партнеры <br>
            институтов ИРНИТУ

        </div>
        <div class="icons">
            <RouterLink :to="{ name: 'SendLetter' }">
                <button class="btn">
                    Регистрация
                </button>
            </RouterLink>
            <a href="https://t.me/ForStudentIRNITUbot">
                <button class="hat_butt"><img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1200px-Telegram_logo.svg.png"
                        style="height: 35px; width: 35px; ">
                </button>
            </a>
            <RouterLink :to="{ name: 'auth' }"><button class="hat_butt"><img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALBplMxySL51Y_dJZ5FTrLpa1rpD72FebJA&usqp=CAU"
                    style="height: 35px; width: 35px; margin-left: 7px;">
                    
                
            </button></RouterLink>
        </div>
        
    </div>


</template>

<script setup>
</script>
<style scoped>
.Header {
    background-color: #ffffff;
}
</style>

Vue.component ('error', {
    props: ['error'],
    template:`
             <div class="errorBlock" v-show = "error">
                <h1>Отсутствует соединение с сервером. Обновите страницу.</h1>
             </div>
             `
});
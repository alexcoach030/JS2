const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        baksetUrl: '/getBasket.json',
        imgCatalog: 'https://placehold.it/200x150',
        userSearch: '',
        show: false,
        filtered: [],
        basket: []
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            let find = this.basket.find(el => el.id_product === product.id_product);
            if(find){
                find.quantity++;
            } else {
                const prod = Object.assign({quantity: 1}, product);//создание нового объекта на основе двух, указанных в параметрах
                this.basket.push(prod)
            }
        },
        removeProduct(product){
            let item = this.basket.indexOf(product);
            if(this.basket[item].quantity > 1)
                this.basket[item].quantity--;
            else {
                this.basket.splice(item, 1);
            }
        },
        filter(value){
            const regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },
    mounted(){
        this.getJson(`${API + this.baksetUrl}`)
            .then(data => {
                for (let item of data.contents){
                    this.basket.push(item);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let item of data){
                    this.products.push(item);
                    this.filtered.push(item);
                }
            })
    }
});
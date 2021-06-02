Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    item.img = `img/${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.img"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3 class="product-item-name">{{product.product_name}}</h3>
                    <p class="price">{{product.price}}</p>
                    <div class="product-btns">
                        <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>
                        <button class="catalog-btn">Открыть в каталоге</button>
                    </div>
                </div>
            </div>
    `
})
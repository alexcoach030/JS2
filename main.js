document.addEventListener('DOMContentLoaded', () => {

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class BasketList {
    constructor(container = '.basket'){
        this.container = container;
        this.goods = [];
        this._getBasket()
            .then(data => {
                this.goods = [...data.contents];
                this.render()
            });
    }
    _getBasket(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const basketObj = new BasketItem(product);
            block.insertAdjacentHTML('beforeend', basketObj.render());
            this.addClicker(product, block, basketObj); // функция добавления события на кнопку +
            this.removeClicker(product, block); // функция добавления события на кнопку -
        }
        this.renderResult(); // функция вывода итога Корзины
    }
    addClicker(product, block) {
        const btn = document.getElementById(product.id_product + '-1');
        if(btn) {
            btn.addEventListener('click', () => {
                product.quantity ++;
                block.innerHTML = '';
                this.render();
            });
        }
        else console.log('error');
    }
    removeClicker(product, block) {
        const btn = document.getElementById(product.id_product + '-2');
        if(btn) {
            btn.addEventListener('click', () => {
                if (product.quantity > 0) product.quantity --;
                console.log(5);
                block.innerHTML = '';
                this.render();
            });
        }
        else console.log('error');
    }

    renderResult() {
        const sumBlock = document.querySelector('.basket');
        this.sum = this.goods.reduce((accum, item) => accum += item.price * item.quantity, 0);
        sumBlock.insertAdjacentHTML('beforeend', `<p>Сумма заказа ${this.sum} $</p>`);
    }
}

class BasketItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price * product.quantity;
        this.id = product.id_product;
        this.img = img;
        this.count = product.quantity;
    }

    render() {
        return `<div class="basket-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <p>${this.count} шт</p>
                    <button id='${this.id}-1' class="add-btn">+</button>
                    <button id='${this.id}-2' class="add-btn">-</button>
                </div>
            </div>`
    }

}


let productList = new ProductsList();
let basketList = new BasketList();


// Добавление функции для всплывания блока Корзины по нажатию
let blockBasket = document.querySelector('.btn-cart');
if(!blockBasket) console.log('error-basket-show');
else {
    blockBasket.addEventListener('click', addShow);
    function addShow () {
        document.querySelector('.basket').classList.remove('basket-show');
    }
}
})

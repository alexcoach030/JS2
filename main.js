document.addEventListener('DOMContentLoaded', () => {
    class GoodsItem {
        constructor(title, price) {
            this.title = title;
            this.price = price;
        }
        render() {
            return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
        }
    }

    class GoodsList {
        constructor() {
            this.goods = [];
        }
        fetchGoods() {
            this.goods = [
                { title: 'Shirt', price: 150 },
                { title: 'Socks', price: 50 },
                { title: 'Jacket', price: 350 },
                { title: 'Shoes', price: 250 },
            ];
        }
        render() {
            let listHtml = '';
            this.goods.forEach(good => {
                const goodItem = new GoodsItem(good.title, good.price);
                listHtml += goodItem.render();
            });
            document.querySelector('.goods-list').innerHTML = listHtml;
        }

        sum(){
            let sum = 0;
            for (let item of this.goods){
                sum += item.price;
                console.log(sum);
            }
        }
    }

    class Cart {
        addCart();
        deleteCart();
        render();
    }

    class CartItem {
        deleteItem();
        scoreItem();
    }

    const list = new GoodsList();
    list.fetchGoods();
    list.render();
    list.sum();
})



document.addEventListener('DOMContentLoaded', () => {
    const goods = [
        { title: 'Shirt', img: 'http://via.placeholder.com/150/0000FF', price: 150 },
        { title: 'Socks', img: 'http://via.placeholder.com/150/FF0000', price: 50 },
        { title: 'Jacket', img: 'http://via.placeholder.com/150/FFFFFF', price: 350 },
        { title: 'Shoes', img: 'http://via.placeholder.com/150/808080', price: 250 },
    ];

    const renderGoodsItem = (item, button = '<button class="addCart">Добавить в корзину</button>') => {
        return `<div class="goods-item">
                    <h3>${item.title}</h3>
                    <img src="${item.img}">
                    <p>Цена: ${item.price}</p>
                    ${button}
                </div>`

    };

    const renderGoodsList = list => {
        document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item)).join('');
    };

    renderGoodsList(goods);
})



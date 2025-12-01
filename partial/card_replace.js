module.exports = (card, product) => {
    card = card.replace(/{% IMAGE %}/g, product.image);
    card = card.replace(/{% PRODUCTNAME %}/g, product.productName);
    card = card.replace(/{% ORGANIC %}/g, product.organic ? '' : 'not-organic');
    card = card.replace(/{% QUANTITY %}/g, product.quantity);
    card = card.replace(/{% PRICE %}/g, product.price);
    card = card.replace(/{% URL %}/g, `/product?id=${product.id}`);
    return card;
}
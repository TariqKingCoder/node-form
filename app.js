const http = require('http').createServer();
const url = require('url');
const fs = require('fs');
const cardReplace = require('./partial/card_replace');


const data = JSON.parse(fs.readFileSync('./dev-data/data.json', 'utf-8'));



http.on('request', (req, res) => {
    const { pathname, search } = url.parse(req.url, true);

    if (pathname === '/overview') {
        let items = '';
        let body = fs.readFileSync('./templates/overview.html', 'utf-8');
        let card = fs.readFileSync('./templates/card.html', 'utf-8');
        body = body.replace(/{% TITLE %}/g, 'NODE FORM');
        data.forEach((product) => {
            items += cardReplace(card, product);
        });
        body = body.replace(/{% ITEMS %}/g, items)
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        res.end(body);

    } else if (pathname === '/product') {
        const param = search.split('=')[1];
        let body = fs.readFileSync('./templates/product.html', 'utf-8');
        body = body.replace(/{% TITLE %}/g, 'NODE FORM');
        data.forEach((product) => {
            if (product.id == param) {
                body = body.replace(/{% PRODUCTNAME %}/g, product.productName);
                body = body.replace(/{% IMAGE %}/g, product.image);
                body = body.replace(/{% PRODUCTNAME %}/g, product.productName);
                body = body.replace(/{% ORGANIC %}/g, product.organic ? '' : 'not-organic');
                body = body.replace(/{% FROM %}/g, product.from);
                body = body.replace(/{% NUTRIENTS %}/g, product.nutrients);
                body = body.replace(/{% QUANTITY %}/g, product.quantity);
                body = body.replace(/{% PRICE %}/g, product.price);
                body = body.replace(/{% DESCRIPTION %}/g, product.description);
            }
        });
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        res.end(body);
    } else {
        const body = '<h1 style="text-align:center;margin-top:20px;">404 Not Found!</h1>'
        res.writeHead(404, {
            'Content-Type': 'text/html',
        });
        res.end(body);

    }
});


http.on('close', () => {
    console.log('Server Closed');
});


http.listen(8000, '127.0.0.1', () => {
    console.log('server is start listening to 8000 port.');
});

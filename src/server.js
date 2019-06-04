
'use strict';

const express = require('express');
const request = require('request-promise');

const app = express();
const router = express.Router();

const port = 3001;
const queryLimit = 4;

// Allowing CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Set the route path & initialize the API
router.get('/', (req, res) => {
    res.json({ message: 'API Initialized!'});
});

// Use router configuration when call /api
app.use('/api', router);

// Starts the server and listens for requests
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`api running on port ${port}`);
});
// Route for endpoint /api/items?search=:query
router.route('/items')
    .get( (req, res) => {
        const query = req.query;
        if(query.q){
            querySearch(query , res);
        }
    });
// Route for endpoint /api/items/:id?
router.route('/items/:id')
    .get( (req, res) => {
        const params = req.params;
        if(params.id){
            formatItem(params, res);
        }
    });

function querySearch(query , res){
    searchProduct(query.q)
        .then((response) => {
            res.json(formatQueryResponse(response));
        })
        .catch((err)  => {
            res.send(err);
        });
}

function formatQueryResponse(response){
    response = JSON.parse(response);
    let formattedResponse = {};
    formattedResponse.author ={
        name:"Martin",
        lastname:"Gaviola"
    };
    formattedResponse.categories = !!response.filters.length ? response.filters.filter(item => item.id==='category')[0].values[0]
    .path_from_root.map(cat => cat.name) : [];
    
    formattedResponse.items = [];
    for(let item of response.results){
        let decimals = getDecimalsNumbers(item.price);
        let product = {
            id: item.id,
            title: item.title,
            price:{
                amount: item.price,
                currency: item.currency_id,
                decimals: decimals
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
        };
        formattedResponse.items.push(product);
    }
    return formattedResponse;
}

function getDecimalsNumbers(value) {
    let decimalNumber =(value % 1).toFixed(2);
    let decimalPoint = (decimalNumber).indexOf('.');
    decimalNumber = (decimalNumber).slice(decimalPoint + 1);
    return decimalNumber;
}

function formatItem(params, res){
    let productDetail = {};
    searchItem(params.id)
        .then((response) => {
            response = JSON.parse(response);
            productDetail.author ={
                name:"Martin",
                lastname:"Gaviola"
            };
            productDetail.item ={
                id: response.id,
                title: response.title, 
                price:{
                    currency: response.currency_id,
                    amount: response.price,
                    decimals: getDecimalsNumbers(response.price)
                }
            }
            
            if(!!response.pictures.length) productDetail.picture = response.pictures[0].secure_url;
           
            productDetail.condition = response.condition;
            productDetail.free_shipping = response.shipping.free_shipping;
            productDetail.sold_quantity = response.sold_quantity;
            return searchCategory(response.category_id);
        })
        .then((response) => {
            response = JSON.parse(response);
            if(response.path_from_root){
                productDetail.categories = response.path_from_root.map(cat => cat.name);
            }
            return searchDescription(params.id);
        })

        .then((response) => {
            productDetail.description = JSON.parse(response).plain_text;
            res.json(productDetail);
        })

        .catch((err) => {
            res.send(err);
        });
}


//     ML API         //////////////////////////////////////////////////////////////////////

function searchItem(id){
    const options = {
        method: 'GET',
        uri: `https://api.mercadolibre.com/items/${id}`
    };

    return request(options);
}

function searchDescription(id){
    const options = {
        method: 'GET',
        uri: `https://api.mercadolibre.com/items/${id}/description`
    };

    return request(options);
}

function searchCategory(id){
    const options = {
        method: 'GET',
        uri: `https://api.mercadolibre.com/categories/${id}`
    };

    return request(options);
}

function searchProduct(query){
    const options = {
        method: 'POST',
        uri: `https://api.mercadolibre.com/sites/MLA/search`,
        qs: {
            q: query,
            limit: queryLimit
        }
    };

    return request(options);
}

//     END ML API    //////////////////////////////////////
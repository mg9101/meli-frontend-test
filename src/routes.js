// src/routes.js
import React from 'react'
import { Route } from 'react-router'
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';
import ProductItem from './components/item/ProductItem';
import ProductResultList from './components/search/ProductResultList';

export default (
    <Route path="/" component={Layout}>
        <Route path="items/:id" component={ProductItem}/>
        <Route path="items" component={ProductResultList}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);

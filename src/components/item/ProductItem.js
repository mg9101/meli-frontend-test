
import React from 'react';
import axios from 'axios';
import Breadcrumb from "../categories/Breadcrumb";

export default class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { product: {} };
    }

    getItems() {
        axios.get(`http://localhost:3001/api/items/${this.props.params.id}`)
            .then(res => {
                this.setState({ product: res.data });
            })
    }

    componentDidMount() {
        this.getItems();
    }


    render() {
        if (this.state.product.item) {
            return (
                <section>
                    <Breadcrumb categories={this.state.product.categories} />
                    <section className="ml-product">
                        <section className="ml-gallery">
                            <img src={this.state.product.picture} alt="" className="ml-img"></img>
                        </section>
                        <section className="ml-product-info">
                            <section className="ml-product-status">
                                <span>{this.state.product.condition==='new'?'Nuevo':'Usado'}</span>
                                <span> - </span>
                                <span>{this.state.product.sold_quantity}{this.state.product.sold_quantity>1?` vendidos`:` vendido`}</span>
                            </section>
                            <h2 className="ml-product-title">{this.state.product.item.title}</h2>
                            <h1 className="ml-product-price">$ {Math.floor(this.state.product.item.price.amount)} <span className="ml-supra">{this.state.product.item.price.decimals}</span></h1>
                            <button className="ml-button ml-button_purchase">Comprar</button>
                        </section>
                        <section className="ml-product-description">
                            <h3 className="ml-description-title">Descripcion del producto</h3>
                            <p className="ml-description-text">{this.state.product.description}</p>
                        </section>
                    </section>
                </section>
            );
        }

        return (
            <div className="ml-loader"></div>
        );

    }
}
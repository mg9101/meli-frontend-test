
import React from 'react';
import { Link } from 'react-router';
import iconShipping from '../../assets/ic_shipping.png'

const styleLinkTitle = {
    color: 'black',
    textDecoration: 'none'
};

export default class ProductResultItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { product: this.props.item };
    }

    render() {
        return (
            <section className="ml-results-item">
                <Link to={`/items/${this.state.product.id}`} style={styleLinkTitle}>
                    <section className="ml-thumbnail">
                        <img className="ml-img" src={this.state.product.picture} alt=""></img>
                    </section>
                    <section className="ml-item-info">
                        <h1 className="ml-item-price">${this.state.product.price.amount} {this.state.product.free_shipping?<img src={iconShipping} alt="shipping"/>:''}</h1>

                        <p className="ml-item-location">{this.state.product.address}</p>
                            <h2 className="ml-item-title">{this.state.product.title}</h2>
                    </section>
                </Link>
            </section>
        );
    }
}
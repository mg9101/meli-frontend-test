
import React from 'react';
import axios from 'axios';
import ProductResultItem from './ProductResultItem';
import Breadcrumb from "../categories/Breadcrumb";

export default class ProductResultList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], categories: [], loading: false} ;
    }

    getItems() {
        this.setState({loading: true });
        axios.get(`http://localhost:3001/api/items?q=${this.props.location.query.search}`)
            .then(res => {
                this.setState({ items: res.data.items ,categories: res.data.categories, loading: false });
            })
    }

    componentDidMount() {
        this.getItems();
    }

    componentDidUpdate(prevProps){
        if (this.props !== prevProps) {
            this.getItems();
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <section>
                    {this.state.categories? <Breadcrumb categories={this.state.categories} /> : ''}
                    <section className="ml-results ml-centered">
                        {this.state.items.map(resultItem => <ProductResultItem key={resultItem.id} item={resultItem} />)}
                    </section>
                </section>
            );
        }

        return (
            <div className="ml-loader"></div>
        );
    }
}
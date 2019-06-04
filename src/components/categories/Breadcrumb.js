
import React from 'react';

export default class Breadcrumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categories: this.props.categories };
    }

    componentDidUpdate(prevProps){
        if (this.props !== prevProps) {
            this.setState({ categories: this.props.categories });
        }
    }
    
    render() {
        return (
            <section className="ml-breadcrum-list ml-centered">
                {this.state.categories.map((category, key) => <span key={key}  className="ml-breadcrum-list-item">{category}</span>)}
            </section>
        );
    }
}


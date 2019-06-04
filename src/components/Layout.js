
import React from 'react';
import { Link } from 'react-router';
import SearchBar from "./search/SearchBar";
import imgUrl from "../assets/Logo_ML.png"

const mlLogo = {
    backgroundImage: `url(${imgUrl})`
};

export default class Layout extends React.Component {
    render() {
        return (
            <div className="app-container">
                <header className="ml-header">
                    <section className="ml-centered">
                        <Link to="/"  className="ml-logo" style={mlLogo}></Link>
                        <SearchBar />
                    </section>
                </header>
                <section className="ml-header-offset"></section>
                <section className="app-content">{this.props.children}</section>
            </div>

        );
    }
}


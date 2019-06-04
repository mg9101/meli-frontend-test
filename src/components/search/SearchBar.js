
import React from 'react';
import { browserHistory } from 'react-router'
import searchIcon from '../../assets/ic_Search.png' // relative path to image

export default class SearchBar extends React.Component {
    handleClick(e) {
        e.preventDefault();
        let query = document.querySelector(".ml-search-bar").value;
        browserHistory.push(`/items?search=${query}`);
    }

    render() {
        return (
            <form action="" className="ml-search">
                <input type="search"  placeholder="Nunca dejes de buscar" className="ml-search-bar"></input>
                <button type="submit" className="ml-search-button" onClick={this.handleClick}>
                    <img src={searchIcon} alt="" className="button-img"></img>
                </button>
            </form>
        );
    }
}


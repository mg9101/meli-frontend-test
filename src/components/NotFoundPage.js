
import React from 'react';
import { Link } from 'react-router';

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <div className="ml-centered">
                <h1>La búsqueda no ha coincidido con ningún producto.</h1>                
            </div>
        );
    }
}
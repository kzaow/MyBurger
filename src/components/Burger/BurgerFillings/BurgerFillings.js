import React, {Component} from 'react';
import './BurgerFillings.css';
import PropTypes from 'prop-types';

class BurgerFillings extends Component {
    render() {
        let filling = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                filling = <div className="BreadBottom"></div>;
                break;
            case ('bread-top'):
                filling = (
                    <div className="BreadTop">
                        <div className="Seeds1"></div>
                        <div className="Seeds2"></div>
                    </div>
                );
                break;
            case ('meat'):
                filling = <div className="Meat"></div>;
                break;
            case ('cheese'):
                filling = <div className="Cheese"></div>;
                break;
            case ('lettuce'):
                filling = <div className="Lettuce"></div>;
                break;
            case ('bacon'):
                filling = <div className="Bacon"></div>;
                break;
            default:
                filling = null;
        }
        return filling;
    }

}

BurgerFillings.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerFillings;
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends Component {

    logout() {
        this.props.logout();
        window.location.href = "/";
    }

    render() {
        const { validToken, user } = this.props.security;

        const userIsNotAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link " to="/register">
                            S'inscrire</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Se connecter</Link>
                    </li>
                </ul>
            </div>
        );

        const userIsAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/matieres" className="nav-link">
                            Matières
                                </Link>
                    </li>
                </ul>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/etudiants" className="nav-link">
                            Etudiants
                                </Link>
                    </li>
                </ul>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/professeurs" className="nav-link">
                            Professeurs
                                </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link " to="/">
                            <div className="fas fa-user-circle mr-1">
                                : {user.nom} {user.prenom}
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout" onClick={this.logout.bind(this)}>
                            Se déconnecter</Link>
                    </li>
                </ul>
            </div>
        );

        let headerLinks;

        if (validToken && user) {
            headerLinks = userIsAuthenticated;
        } else {
            headerLinks = userIsNotAuthenticated;
        }

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        Gestion Ecole
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {headerLinks}
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(
    mapStateToProps,
    { logout }
)(Header);
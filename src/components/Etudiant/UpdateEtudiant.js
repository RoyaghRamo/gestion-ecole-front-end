import React, { Component } from 'react';
import { getEtudiant, createEtudiant } from "../../actions/etudiantActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateEtudiant extends Component {

    constructor() {

        super();

        this.state = {
            id: "",
            nom: "",
            prenom: "",
            etudiantId: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        const {
            id,
            nom,
            prenom,
            etudiantId
        } = nextProps.etudiant;

        this.setState({
            id,
            nom,
            prenom,
            etudiantId
        });
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getEtudiant(id, this.props.history);
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();
        const updatedEtudiant = {
            id: this.state.id,
            nom: this.state.nom,
            prenom: this.state.prenom,
            etudiantId: this.state.etudiantId
        };

        this.props.createEtudiant(updatedEtudiant, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="etudiant">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Modifier Etudiant</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.nom
                                        })}
                                        placeholder="Nom d'étudiant"
                                        name="nom"
                                        value={this.state.nom}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.nom && (
                                            <div className="invalid-feedback">{errors.nom}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.prenom
                                        })}
                                        placeholder="Prénom d'étudiant"
                                        name="prenom"
                                        value={this.state.prenom}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.prenom && (
                                            <div className="invalid-feedback">{errors.prenom}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Identifiant d'étudiant"
                                        name="etudiantId"
                                        value={this.state.etudiantId}
                                        disabled />
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" value="Enregistrer" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateEtudiant.propTypes = {
    getEtudiant: PropTypes.func.isRequired,
    createEtudiant: PropTypes.func.isRequired,
    etudiant: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    etudiant: state.etudiant.etudiant,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getEtudiant, createEtudiant }
)(UpdateEtudiant);
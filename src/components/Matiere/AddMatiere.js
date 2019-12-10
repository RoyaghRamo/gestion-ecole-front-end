import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { createMatiere } from '../../actions/matiereActions';
import classnames from "classnames";

class AddMatiere extends Component {

    constructor() {
        super();
        this.state = {
            nom: "",
            matiereId: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    // Life Cycle Hooks
    // This function is called when the component may be receiving new props
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();
        const newMatiere = {
            nom: this.state.nom,
            matiereId: this.state.matiereId
        };
        this.props.createMatiere(newMatiere, this.props.history);
    };

    render() {

        // Get the erros from the state
        const { errors } = this.state;
        return (
            <div className="matiere">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Formulaire: Ajouter une matière</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.nom
                                        })}
                                        placeholder="Nom de la matière"
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
                                            "is-invalid": errors.matiereId
                                        })}
                                        placeholder="Identifiant de la matière"
                                        name="matiereId"
                                        value={this.state.matiereId}
                                        onChange={this.onChange}
                                    />
                                    {
                                        errors.matiereId && (
                                            <div className="invalid-feedback">{errors.matiereId}</div>
                                        )
                                    }
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" value="Ajouter matière" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddMatiere.propTypes = {
    createMatiere: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createMatiere }
)(AddMatiere); 
import React, { Component } from 'react';
import { getMatiere, createMatiere } from "../../actions/matiereActions";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateMatiere extends Component {

    constructor() {

        super();

        this.state = {
            id: "",
            nom: "",
            matiereId: "",
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
            matiereId
        } = nextProps.matiere;

        this.setState({
            id,
            nom,
            matiereId
        });
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getMatiere(id, this.props.history);
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();
        const updatedMatiere = {
            id: this.state.id,
            nom: this.state.nom,
            matiereId: this.state.matiereId
        };

        this.props.createMatiere(updatedMatiere, this.props.history);
    }

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
                                        className="form-control form-control-lg"
                                        placeholder="Identifiant de la matière"
                                        name="matiereId"
                                        value={this.state.matiereId}
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

UpdateMatiere.propTypes = {
    getMatiere: PropTypes.func.isRequired,
    createMatiere: PropTypes.func.isRequired,
    matiere: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    matiere: state.matiere.matiere,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getMatiere, createMatiere }
)(UpdateMatiere);
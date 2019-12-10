import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getMatieres } from "../../actions/matiereActions";
import MatiereItem from "./MatiereItem";
import CreateMatiereButton from "../../Buttons/Add Buttons/CreateMatiereButton";


class Matieres extends Component {

    // Life Cycle Hook
    // This function is Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    componentDidMount() {
        this.props.getMatieres();
    };

    render() {
        const { matieres } = this.props.matiere;
        return (
            <div className="matieres">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Matières</h1>
                            <br />
                            <CreateMatiereButton />
                            <br />
                            <hr />
                            {
                                matieres.map(matiere => (
                                    <MatiereItem key={matiere.id} matiere={matiere} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Matieres.propTypes = {
    matiere: PropTypes.object.isRequired,
    getMatieres: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    matiere: state.matiere
});

export default connect(mapStateToProps, { getMatieres })(Matieres);
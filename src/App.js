import React from 'react';
// Importing the stylesheets
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
// Importing the Provider
import { Provider } from "react-redux";
// Importing the store
import store from './store';
// Importing the Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Importing the Header
import Header from './components/Layout/Header';

// CRUD starts
// Importing classes of Etudiants 
import Etudiants from './components/Etudiant/Etudiants';
import AddEtudiant from './components/Etudiant/AddEtudiant';
import UpdateEtudiant from './components/Etudiant/UpdateEtudiant';
import MatieresOfEtudiant from './components/Etudiant/MatieresOfEtudiant';

// Importing classes of Matieres
import Matieres from './components/Matiere/Matieres';
import AddMatiere from './components/Matiere/AddMatiere';
import UpdateMatiere from './components/Matiere/UpdateMatiere';
import EtudiantsOfMatiere from './components/Matiere/EtudiantsOfMatiere';
import ProfesseursOfMatiere from './components/Matiere/ProfesseursOfMatiere';

// Importing classes of Professeurs
import Professeurs from './components/Professeur/Professeurs';
import AddProfesseur from './components/Professeur/AddProfesseur';
import UpdateProfesseur from './components/Professeur/UpdateProfesseur';
import MatieresOfProfesseur from './components/Professeur/MatieresOfProfesseur';
// CRUD ends

// Importing the Classe classes 
import AddMatieresEtudiants from './components/Classe/AddMatieresEtudiants';
import AddMatieresProfesseurs from './components/Classe/AddMatieresProfesseurs';

// User Management
import Landing from './components/Layout/Landing';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/SetJWTToken";
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/securityActions';
import SecureRoute from './securityUtils/SecureRoute';


// Setting the token here so that we can reload the page 
// without losing the login privileges
const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decodedToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodedToken
  });

  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }

}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {
            // Public Routes
          }

          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          {
            // Private Routes
          }
          <br />
          <hr />
          <Switch>
            {
              // Classe routes
            }
            <SecureRoute exact path="/addMatieresEtudiants" component={AddMatieresEtudiants} />
            <SecureRoute exact path="/addMatieresProfesseurs" component={AddMatieresProfesseurs} />
            {
              // Etudiants
            }
            <SecureRoute exact path="/etudiants" component={Etudiants} />
            <SecureRoute exact path="/addEtudiant" component={AddEtudiant} />
            <SecureRoute exact path="/updateEtudiant/:id" component={UpdateEtudiant} />
            <SecureRoute exact path="/matieresOfEtudiant/:id" component={MatieresOfEtudiant} />
            {
              // Professeurs
            }
            <SecureRoute exact path="/professeurs" component={Professeurs} />
            <SecureRoute exact path="/addProfesseur" component={AddProfesseur} />
            <SecureRoute exact path="/updateProfesseur/:id" component={UpdateProfesseur} />
            <SecureRoute exact path="/matieresOfProfesseur/:id" component={MatieresOfProfesseur} />
            {
              // Matieres
            }
            <SecureRoute exact path="/matieres" component={Matieres} />
            <SecureRoute exact path="/addMatiere" component={AddMatiere} />
            <SecureRoute exact path="/updateMatiere/:id" component={UpdateMatiere} />
            <SecureRoute exact path="/etudiantsOfMatiere/:id" component={EtudiantsOfMatiere} />
            <SecureRoute exact path="/professeursOfMatiere/:id" component={ProfesseursOfMatiere} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

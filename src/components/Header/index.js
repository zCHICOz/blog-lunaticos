import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

function Header() {
	return(
		<nav className="navbar navbar-expand-lg navbar-light mb-5 cabecalho">

        <Link className="navbar-brand ml-5 mr-3" to="/">
            <img className="logo" src={require('../../assets/logo.png')} width="100" alt="Logo do Rhoe Gnosis" />
        </Link>
            <Link to="/"><h1 className="text-light mr-5 title">Blog Lunáticos</h1></Link>
            

        <button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto menu">

            
            <li className="nav-item">
              <Link className="nav-link text-white ml-5 item" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white item" to="/sobrenos">Sobre nós</Link>
            </li>
          </ul>

        <div className="buttons">
          <Link to="/login"><button className="btn btn-outline-light mr-5">Entrar</button></Link>
        </div>

        </div>
      </nav>
	);
}

export default Header;
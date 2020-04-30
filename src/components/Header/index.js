import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

function Header() {
	return(
		<header id="main-header">
			<div className="header-content">

        <div className="logo">
         <Link to="/"><img src={require('../../assets/logo.png')} width="100" /></Link>
          <Link to="/">Blog Lunáticos</Link>
          <hr size={100}/>
        </div>

        <div className="info">
          <Link to="/">Home</Link>
          <Link to="/sobrenos">Sobre nós</Link>
        </div>

        <Link to="/login" className="login">Entrar</Link>
      </div>
		</header>
	);
}

export default Header;
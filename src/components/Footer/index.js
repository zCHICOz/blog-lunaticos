import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa'

import './footer.css';

function Footer() {
	return(
		<div className="container-fluid mt-5 footer">
      <div className="social-icons mt-4">
        <Link className="text-light icon mr-5" to="/"><FaFacebook /></Link>
        <Link className="text-light icon mr-0" to="/"><FaInstagram /></Link>
      </div>
      <p className="mt-4">© Copyright 2020 - Lunáticos. Todos os direitos reservados</p>
    </div>
	);
}

export default Footer;
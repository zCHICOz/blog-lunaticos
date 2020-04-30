import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

import './register.css';


class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nome: '',
			email: '',
			password: ''
		};

		this.register = this.register.bind(this);
		this.onRegister = this.onRegister.bind(this);
	}

	register(e) {
		e.preventDefault();

		this.onRegister();
	}

	onRegister = async () => {
		try {
			const { nome, email, password} = this.state;

			await firebase.register(nome, email, password);
			this.props.history.replace('/dashboard');
		}
		catch(error) {
			alert(error.message);
		}

	}


	render() {
		return(
			<div>
					<h1 className="register-h1">Novo usuário</h1>

					<form onSubmit={this.register} id="register">
						<labe>Nome:</labe><br/>
						<input type="text" value={this.state.nome} autoFocus autoComplete="off" placeholder="Seu nome!"
							onChange={(e) => {this.setState({nome: e.target.value})}}
						/><br/>

						<labe>Email:</labe><br/>
						<input type="email" value={this.state.email} autoComplete="off" placeholder="Seu email!"
							onChange={(e) => {this.setState({email: e.target.value})}}
						/><br/>

						<labe>Senha:</labe><br/>
						<input type="password" value={this.state.password} autoComplete="off" placeholder="Sua senha!"
							onChange={(e) => {this.setState({password: e.target.value})}}
						/><br/>

						<button type="submit">Cadastrar</button>
					</form>
			</div>
		);
	}
}

export default withRouter(Register);
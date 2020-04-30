import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import firebase from '../../firebase';

import './new.css';


class New extends Component {

	constructor(props) {
		super(props);
		this.state = {
			titulo: '',
			poema: [],
			integrante: '',
			autorPoema: '',
			alert: ''
		};

		this.cadastrar = this.cadastrar.bind(this);
	}

	async componentDidMount() {
    if(!firebase.getCurrent()) {
      this.props.history.replace('/');
      return null;
		}
	}

	cadastrar = async (e) =>{
		e.preventDefault();

		if(this.state.titulo !== '' 
			&& this.state.poema !== []
			&& this.state.autorPoema !== '' ){

			let posts = firebase.app.ref('posts');
			let chave = posts.push().key;

			await posts.child(chave).set({
				titulo: this.state.titulo,
				poema: this.state.poema,
				autorPoema: this.state.autorPoema,
				integrante: localStorage.nome
			});

			this.props.history.push('/dashboard');
		}
		else {
			this.setState({ alert: 'Preencha todos os campos '})
		}
	}

	render() {
		return(
			<div>
				<header id="new">
					<Link to="/dashboard">Voltar</Link>
				</header>

				<form onSubmit={this.cadastrar} id="new-post">
					<span className="alert">{this.state.alert} </span>
					
					<label>Título:</label><br/>
					<input type="text" placeholder="Título do poema!" value={this.state.titulo}  autoFocus
						onChange={(e) => {this.setState({ titulo: e.target.value })}}
					/><br/>
				
					<label>Poema:</label>
					<CKEditor
						editor={ ClassicEditor }
						value={this.state.poema} 
						onChange={(e, editor) => {
	
							const data = editor.getData()
	
							this.setState({ poema: data })
	
							console.log(ReactHtmlParser(editor.getData()))
							
						}}
					/>

					<label className="lastLabel">Autor do poema:</label><br/>
					<input type="text" placeholder="Autor!" value={this.state.autorPoema}  autoFocus
						onChange={(e) => {this.setState({ autorPoema: e.target.value })}}
					/><br/>

					<button type="submit" className="cadastrar">Cadastrar</button>
				</form>


			</div>
		);
	}
}


export default withRouter(New);
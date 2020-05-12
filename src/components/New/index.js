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
      imagem: null,
			url: '',
			integrante: '',
			autorPoema: '',
			alert: ''
		};

    this.cadastrar = this.cadastrar.bind(this);
    this.handleFile = this.handleFile.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
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
      && this.state.imagem !== '' 
      && this.state.autorPoema !== ''
      && this.state.imagem !== null
      && this.state.url !=='' 
      ){

			let posts = firebase.app.ref('posts');
			let chave = posts.push().key;

			await posts.child(chave).set({
				titulo: this.state.titulo,
        poema: this.state.poema,
        imagem: this.state.url,
				autorPoema: this.state.autorPoema,
				integrante: localStorage.nome
			});

			this.props.history.push('/dashboard');
		}
		else {
			this.setState({ alert: 'Preencha todos os campos '})
		}
  }

  handleFile = async (e) =>{

		if(e.target.files[0]) {
			
			const image = e.target.files[0];

			if(image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg') {
				await this.setState({ imagem: image});
				this.handleUpload();
			} 
			else {
				alert('Envie uma imagem do tipo PNG ou JPG!');
				this.setState({ imagem: null });
				return null;
			}
		}
  }


  handleUpload = async () => {
		const { imagem } = this.state;
		const currentUid = firebase.getCurrentUid();

		const uploadTasks = firebase.storage.ref(`images/${currentUid}/${imagem.name}`).put(imagem);

		await uploadTasks.on('state_changed', 
		(snapshot) => {
			// progress
			const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			this.setState({ progress })
		},
		(error) => {
			// error
			console.log('Error imagem: ' + error);
		},
		() => {
			// sucess
			firebase.storage.ref(`images/${currentUid}`)
			.child(imagem.name).getDownloadURL()
			.then(url => {
				this.setState({ url: url })
			})
		})
	}


	render() {
		return(
			<div>
				<header id="new">
					<Link to="/dashboard">Voltar</Link>
				</header>

				<form onSubmit={this.cadastrar} id="new-post">
					<span className="alert">{this.state.alert} </span>

				<input type="file"
						onChange={this.handleFile}
					/><br/>
					{this.state.url !== '' ?
						<img src={this.state.url} width="250" height="150" alt="Capa do post" />
					: 
					<progress value={this.state.progress} max="100" />
					}

					
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
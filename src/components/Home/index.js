import React, { Component } from 'react';
import firebase from '../../firebase';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import './home.css';


class Home extends Component {

  state = {
    posts: []
  };

  componentDidMount() {
    firebase.app.ref('posts').once('value', (snapshot) => {
      let state = this.state;
      state.posts = [];

      snapshot.forEach((childItem) => {
        state.posts.push({
          key: childItem.key,
          titulo: childItem.val().titulo,
          imagem: childItem.val().imagem,
          poema: childItem.val().poema,
          integrante: childItem.val().integrante,
          autorPoema: childItem.val().autorPoema
        })
      })
      state.posts.reverse();
      this.setState(state);
    })
  }

  render() {
    return(
      <section id="post" className="container-fluid">

        {this.state.posts.map((post) => {
          return(

            <article key={post.key} className="col-12 col-lg-10 mt-5 mb-5">
              <header>
                <div className="titles">
                  <strong>{post.titulo}</strong>
                  <span>Publicado por: {post.integrante}</span>
                </div>
              </header>

              <main>
                <div className="img">
                <p>{ReactHtmlParser(post.poema)} - {post.autorPoema}</p>
                <img src={post.imagem} className=".rounded-circle" width="20%" alt="Capa do post" />
                </div>
              </main>
            </article>

          );

        })}

      </section>
    );
  }
}
export default Home;

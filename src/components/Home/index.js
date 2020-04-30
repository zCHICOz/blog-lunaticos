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
          // imagem: childItem.val().imagem,
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
      <section id="post">

        {this.state.posts.map((post) => {
          return(

            <article key={post.key}>
              <header>
                <div className="title">
                  <strong>{post.titulo}</strong>
                  <span>Publicado por: {post.integrante}</span>
                </div>
              </header>

              <main>
                <p>{ReactHtmlParser(post.poema)}</p>
                <span>- {post.autorPoema}</span>
              </main>
            </article>

          );

        })}

      </section>
    );
  }
}
export default Home;

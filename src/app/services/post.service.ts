import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Post} from '../models/post.model';
import {EmbedService} from './embed.service';
import {ServerService} from './server.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Array<Post>;
  postsSubject = new Subject<Array<Post>>();

  constructor(private local: EmbedService, private server: ServerService) {
    this.getLocalPosts().subscribe(data => {
      this.posts = data;
      this.emitPostSubject();
    });
  }

  fetchPostsFromServer() {
    this.server.fetchPostsFromServer().subscribe(data => {
      this.posts = data;
      this.emitPostSubject();
    });
  }

  savePostsToServer() {
    this.server.savePostsToServer(this.posts);
  }

  upLikes(id: number) {
    this.posts.forEach(value => {
      if (value.id === id) {
        value.loveIts++;
      }
    });
    this.emitPostSubject();
  }

  emitPostSubject() {
    this.postsSubject.next(this.posts);
  }

  downLikes(id: number) {
    this.posts.forEach(value => {
      if (value.id === id) {
        value.loveIts--;
      }
    });
    this.emitPostSubject();
  }

  push(post: Post) {
    post.id = Math.max.apply(Math, this.posts.map((item) => item.id)) + 1;
    this.posts.push(post);
    this.emitPostSubject();
  }

  delete(post: Post) {
    const index = this.posts.indexOf(post);
    if (index > -1) {
      this.posts.splice(index, 1);
      this.emitPostSubject();
    } else {
      console.log('Post element not found in array');
    }

  }

  /**
   * Fonction de randomisation des posts
   */
  shuffle() {
    let j;
    let x;
    let i;
    for (i = this.posts.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this.posts[i];
      this.posts[i] = this.posts[j];
      this.posts[j] = x;
    }
    this.emitPostSubject();
  }

  /**
   * Fonction de trie des posts par date
   */
  sort() {
    this.posts.sort((a, b) => +new Date(a.created_at) - +new Date(b.created_at));
    this.emitPostSubject();
  }

  /**
   * Fonction de peuplement des posts en local
   */
  private getLocalPosts(): Observable<Array<Post>> {
    return this.local.fetchPosts();
  }

}

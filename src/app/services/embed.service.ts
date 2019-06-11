import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../models/post.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmbedService {

  constructor(private http: HttpClient) {
  }

  /**
   * Réccuppère des posts dans un fichier servant de base à l'affichage
   */
  fetchPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>('./assets/posts.json');
  }
}

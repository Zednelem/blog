import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../models/post.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  //TODO: Remplacer cette valeur par l'url firebase
  private serverUrl = './assets/';

  private message = 'Pour tester l\'Envoie des posts, remplacez cette variable  ' +
    '( voir la console de debugage) par l\'url ' +
    'firebase disponible dans mon message' +
    '\n    XM     :D';

  constructor(private httpClient: HttpClient) {
  }

  savePostsToServer(posts: Array<Post>) {
    this.httpClient.put(this.serverUrl + '/posts.json', posts)
      .subscribe(
        () => {
          console.log('Sauvegardé !');
        },
        () => {
          if (this.serverUrl === './assets/') {
            console.log(this.serverUrl);
            alert(this.message);
          }
          console.log('Erreur de sauvegarde lors de la sauvegarde vers "this.serveurUrl": ' + this.serverUrl);
        }
      );
  }

  fetchPostsFromServer(): Observable<Array<Post>> {
    return this.httpClient.get<Array<Post>>(this.serverUrl + '/posts.json');
  }
}

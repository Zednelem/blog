import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../models/post.model';
import {Subject} from 'rxjs';
import {PostService} from '../services/post.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Array<Post>;
  private ngUnsubscribe = new Subject();

  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.postService.postsSubject
      // permet de souscrire jusqu'au onDestroy
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
      (values) => {
        this.posts = values;
      }
    );
    this.postService.emitPostSubject();
  }

  /**
   * Logique de destruction des souscriptions avec angular
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onShuffle() {
    this.postService.shuffle();
  }

  onSort() {
    this.postService.sort();
  }

  onUpload() {
    this.postService.savePostsToServer();
  }

  onDownload() {
    this.postService.fetchPostsFromServer();
  }
}

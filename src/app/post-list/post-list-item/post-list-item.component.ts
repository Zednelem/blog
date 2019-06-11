import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../models/post.model';
import {PostService} from '../../services/post.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit, OnDestroy {

  @Input() postId: number;
  post: Post;
  private ngUnsubscribe = new Subject();

  constructor(private postsService: PostService) {}

  ngOnInit() {
    this.postsService.postsSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        values => this.post = values.filter(value => value.id === this.postId)[0]);
    this.postsService.emitPostSubject();
  }

  onUpLikes() {
    this.postsService.upLikes(this.post.id);
  }

  onDownLikes() {
    this.postsService.downLikes(this.post.id);
  }

  onDeletePost() {
    this.postsService.delete(this.post);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

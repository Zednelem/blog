import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {NgForm} from '@angular/forms';
import {Post} from '../../models/post.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  constructor(private postService: PostService, private router: Router) {
  }

  onSubmit(f: NgForm) {
    const post = new Post();
    post.title = f.value.title;
    post.content = f.value.content;
    post.created_at = new Date();
    post.loveIts = 0;
    this.postService.push(post);
    this.router.navigate(['posts']);
  }
}

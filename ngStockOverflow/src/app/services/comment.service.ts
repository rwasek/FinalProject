import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { AuthService } from './auth.service';
import { Comment } from 'src/app/models/comment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  // private url = 'http://localhost:8090'
  private url = environment.baseUrl + 'api/posts';


  constructor(private http: HttpClient, private authService: AuthService) { }


  index(postId: number) {
    // const credentials = this.authService.getCredentials();
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': `Basic ${credentials}`,
    //     'X-Requested-With': 'XMLHttpRequest'
    //   })
    // };
    return this.http.get<Comment[]>(this.url + '/' + postId + '/comments')
    .pipe(
      catchError((err : any) => {
        console.log(err);
        return throwError('Error with fetching Comments');
      })
    );
  }

  commentsForPost(postId: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Comment[]>(this.url + '/' + postId + '/comments')
    .pipe(
      catchError((err : any) => {
        console.log(err);
        return throwError('Error with fetching Comments');
      })
    );
  }



  createNewComment(newComment: Comment, postId: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.post<Comment>(this.url + '/' + postId + '/comments', newComment, httpOptions).pipe(
      catchError((err: any) => {
        console.error('Error in service to create a comment');
        return throwError('Error with creating a comment');
      })
    );
  }

  updateComment(commentId: number, commentToEdit: Comment, postId: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.put<Comment>(this.url + '/' + postId + '/comments/' + commentId, commentToEdit, httpOptions).pipe(
      catchError((err: any) => {
        console.error('error in update comment service');
        return throwError('error in update');
      })
    );
  }

  destroyComment(commentId:number, commentToDelete: Comment, postId: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.put<Comment>(this.url + '/' + postId + '/delete/' + commentId, commentToDelete, httpOptions).pipe(
      catchError((err:any) => {
        console.error('error in delete comment');
        return throwError('destroy comment for comment service not working');
      })
    );
  }

}

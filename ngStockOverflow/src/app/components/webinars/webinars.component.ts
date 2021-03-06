import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WebinarService } from 'src/app/services/webinar.service';
import { Webinar } from 'src/app/models/webinar';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-webinars',
  templateUrl: './webinars.component.html',
  styleUrls: ['./webinars.component.css']
})
export class WebinarsComponent implements OnInit {

  allWebinars: Webinar[] = [];

  selected: Webinar=null;

  loggedInUser: User = new User();

  attendees: User[] = [];

  webinarToEdit: Webinar = null;

  closeResult = '';

  constructor(
    private authServ: AuthService,
    private webinarServ: WebinarService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.loadWebinars();
    this.authServ.showUser().subscribe(
      data => {
        this.loggedInUser = data;
        console.log('logged in user found');
      },
      err => {
        console.error('no logged in user found');

      }
    )
  }

  displayWebinars() {
    this.selected = null;
  }

  loadWebinars(){
    this.webinarServ.getWebinars().subscribe(
      data => {
        this.allWebinars = data;
      },
      err => {
        console.error('error in obtaining webinars in webinar component');
      }
    )
  }

  signUpUser(webinarId: number){
    console.log(this.loggedInUser);
    console.log(this.selected.usersAttending.includes(this.loggedInUser));
    this.webinarServ.signUpUser(webinarId).subscribe(
      data => {
        window.alert('You are going to this webinar!')
        this.attendees = data;
        this.selected = null;
        this.loadWebinars();


      },
      error => {
        console.error('error in webinar component sign up');
      }
      )
    }

    withdrawUser(webinarId: number){
      this.webinarServ.withdrawUser(webinarId).subscribe(
        data => {
          window.alert('You are no longer going to this webinar.')
          this.attendees = data;
          this.selected = null;
          this.loadWebinars();
      },
      error => {
        console.error('withdraw user failure');

      }
    )
  }

  checkLogin() {
    if (localStorage.getItem('credentials')) {
      return true;
    }
    return false;
  }

  checkIfUserAlreadyAttending(webinar: Webinar){
    for(let i = 0; i < this.selected.usersAttending.length ; i++){
      if(this.selected.usersAttending[i].username === this.loggedInUser.username){
        return true;
      }
    }
    return false;
    }

    checkIfUserIsHosting(webinar: Webinar) {
      if(this.selected.userCreator.username === this.loggedInUser.username) {
        return true;
      }
      return false;
    }



    createWebinar(newWebinar: NgForm) {
        const webinar: Webinar = newWebinar.value;

        this.webinarServ.createWebinar(webinar).subscribe(
          data => {
            console.log('webinar was created success');
            this.loadWebinars();
          },
          err => {
            console.error('webinar failed to create');
          }
        )
        newWebinar.reset();
      }


      updateWebinar(webinar: NgForm) {
        const webinarUpdate: Webinar = webinar.value;
        console.log(webinarUpdate);
        console.log(webinarUpdate.id);
          this.webinarServ.updateWebinar(webinarUpdate, webinarUpdate.id).subscribe(
            data => {
              console.log('webinar was updated')
              this.selected = this.webinarToEdit;
              this.webinarToEdit = null;
              window.alert('Your webinar has successfully been updated.')
              this.loadWebinars();
            },
            err => {
              console.error('webinar was not updated');
            }
          )
          // webinar.reset();
      }

      cancelWebinar(webinarId: number) {
        this.webinarServ.deleteWebinar(webinarId).subscribe(
          data => {
            console.log('webinar delete success');
            window.alert('Your webinar has been cancelled.')
            this.loadWebinars();
          },
          err => {
            console.error('webinar deletion failure');

          }
        )
        this.selected = null;
      }

      open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }
    }







import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import "src/assets/smtp.js";
declare let Email: any;

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSend(form: NgForm) {
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "vahermihkel@gmail.com",
      Password : "8086F28474E2A1C49C54B165B4ACB33D1AA5",
      To : "vahermihkel@gmail.com",
      From : `vahermihkel@gmail.com`,
      Subject : "PEALKIRI",
      Body : `
          <i>This is sent as a feedback from my resume page.</i> <br/> <b>Name: </b>
          TESTEST <br /> 
          <b>Email: </b>test@email.com<br /> 
          <b>Subject: </b>PEALKIRI<br /> 
          <b>Message:</b> <br /> 
          SISU <br>
          <br>
          <b>~End of Message.~</b> `
      }).then( (message: any) => {
        alert(message); 
        form.resetForm(); 
        } 
      );
  }

}

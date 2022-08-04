import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  mainFormGroup = this._formBuilder.group({
    lastname: [null],
    firstname: [null],
    country: [null],
    date: [null],
    street: [null],
    city: [null],
    tel: [null],
    email: [null],
    details: [null],
    socialMedia: {
      fb: {
        active: [false],
        link: [null]
      },
      insta: {
        active: [false],
        link: [null]
      },
      tweet: {
        active: [false],
        link: [null]
      },
      yt: [false]
    },
    agreed: [false],
    aboutMe: [null]
  });



  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}

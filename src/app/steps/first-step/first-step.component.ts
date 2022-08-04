import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  myForm: FormGroup | any;
  firstForm: FormGroup | any;
  secondForm: FormGroup | any;
  thirdForm: FormGroup | any;



  selectedCountry = [
    { name: 'Germany', value: 'g', extradetails: true },
    { name: 'USA', value: 'u', extradetails: false },
    { name: 'Canada', value: 'c', extradetails: true },
    { name: 'England', value: 'e', extradetails: false }
  ];

  socialMediaSelect = [
    { name: 'Facebook', value: 'fb', checkedBox: false },
    { name: 'Instagram', value: 'insta', checkedBox: false },
    { name: 'Twitter', value: 'tweet', checkedBox: false },
    { name: 'Youtube', value: 'fb', checkedBox: false }
  ]

  isEditable = false;
  inputVisible = true;
  isFbChecked = false;
  isInstaChecked = false;
  isTweetChecked = false;
  isYtChecked = false;
  isTextAreaActive = false;

  durationInSeconds = 5;

  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.myForm = this._formBuilder.group({
      data: [{}],
      contact: [{}],
      aboutMe: [{}]
    })
    this.firstForm = this._formBuilder.group({
      gender: [null],
      surename: [null, [Validators.required, Validators.maxLength(10)]],
      firstname: [null, [Validators.required, Validators.maxLength(10)]],
      country: ['Germany', Validators.required],
      date: [null, Validators.required],
      street: [null, [Validators.required, Validators.maxLength(25)]],
      city: [null, [Validators.required, Validators.maxLength(25)]],
    });
    this.secondForm = this._formBuilder.group({
      tel: [null, [Validators.required, Validators.max(10000000000)]],
      email: [null, [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      fb: [null, [Validators.required, Validators.maxLength(30)]],
      insta: [null, [Validators.required, Validators.maxLength(20)]],
      tweet: [null, [Validators.required, Validators.maxLength(15)]],
      youtube: [false],
    });
    this.thirdForm = this._formBuilder.group({
      message: [null, Validators.maxLength(250)],
      agreed: [false]
    });
    this.initForms();
  }


  initForms() {
    this.loadFromLocalStorage();
  }

  
  loadFromLocalStorage() {
    let x = localStorage.getItem('myForm');
    if (x) {
      let loadData = JSON.parse(localStorage.getItem('myForm') || '');
      console.log(loadData, 'local storage');

      if (loadData) {
        this.firstForm.get('surename')?.setValue(loadData.surename);
        this.firstForm.get('firstname')?.setValue(loadData.firstname);
        this.firstForm.get('country')?.setValue(loadData.country);
        this.firstForm.get('date')?.setValue(loadData.date);
        this.firstForm.get('street')?.setValue(loadData.street);
        this.firstForm.get('city')?.setValue(loadData.city);
        this.secondForm.get('tel')?.setValue(loadData.tel);
        this.secondForm.get('email')?.setValue(loadData.email);
        this.thirdForm.get('message')?.setValue(loadData.message);
        this.thirdForm.get('agreed')?.setValue(loadData.agreed);
        if (!!loadData.fb) {
          this.isFbChecked = true;
          this.secondForm.get('fb').enable();
          this.secondForm.get('fb')?.setValue(loadData.fb);
        } else {
          this.secondForm.get('fb').disable();
        }
        if (!!loadData.insta) {
          this.isInstaChecked = true;
          this.secondForm.get('insta').enable();
          this.secondForm.get('insta')?.setValue(loadData.insta);
        } else {
          this.secondForm.get('insta').disable();
        }
        if (!!loadData.tweet) {
          this.isTweetChecked = true;
          this.secondForm.get('tweet').enable();
          this.secondForm.get('tweet')?.setValue(loadData.tweet);
        } else {
          this.secondForm.get('tweet').disable();
        }
        this.secondForm.get('youtube').setValue(loadData.youtube);
        if (!!loadData.message) {
          this.isTextAreaActive = true;
          this.thirdForm.get('message').enable();
          this.thirdForm.get('message')?.setValue(loadData.message);
        } else {
          this.thirdForm.get('message').disable();
        }
      }
    } else {
      this.secondForm.get('fb').disable();
      this.secondForm.get('insta').disable();
      this.secondForm.get('tweet').disable();
      this.thirdForm.get('message').disable();
    }
  }



  saveFirstForm() {
    this.myForm.get('data').setValue(this.firstForm.value);
    this.isEditable = true;
    console.log('myform', this.myForm.value)
  }

  saveSecondForm() {
    console.log('second', this.secondForm.value);
    this.myForm.get('contact').setValue(this.secondForm.value);
    this.isEditable = true;
    console.log('myform 2', this.myForm.value)
  }

  submitForm() {
    this.isEditable = true;
    this.myForm.get('aboutMe').setValue(this.thirdForm.value);
    console.log('myform 3', this.myForm.value)

    this.saveFormData();
  }


  saveFormData() {
    console.log('1', this.firstForm.valid, '2', this.secondForm.valid, '3', this.thirdForm.valid);

    if (this.firstForm.valid && this.secondForm.valid && this.thirdForm.valid) {
      this.isEditable = true;

      this._snackBar.openFromComponent(SnackbarComponent, {
        duration: this.durationInSeconds * 1000,
      });
      localStorage.setItem('myForm', JSON.stringify(this.myForm.value));
    }
    console.log(this.myForm.value);

  }


  openDialog() {
    if (this.firstForm.dirty) {
      //-----set timeout ?
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: '',
          content: 'Are you sure ? Everything will be deleted !'
        },
        width: '350px',
        height: '220px'
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.firstForm.reset();
        } else {
          //bleibt dein Form
        }
      })
    }
  }

  handleSelectedCountry(value: boolean) {
    this.inputVisible = value;
    if (this.inputVisible) {
      this.firstForm.get('street')?.enable();
      this.firstForm.get('city')?.enable();
    } else {
      this.firstForm.get('street')?.disable();
      this.firstForm.get('city')?.disable();
    }
  }

  handleFbInput(ev: any) {
    this.isFbChecked = ev.checked;
    if (!this.isFbChecked) {
      this.secondForm.get('fb')?.disable();
    } else {
      this.secondForm.get('fb')?.enable();
    }
  }

  handleInstaInput(ev: any) {
    this.isInstaChecked = ev.checked;
    if (!this.isInstaChecked) {
      this.secondForm.get('insta')?.disable();
    } else {
      this.secondForm.get('insta')?.enable();
    }
  }

  handleTweetInput(ev: any) {
    this.isTweetChecked = ev.checked;
    if (!this.isTweetChecked) {
      this.secondForm.get('tweet')?.disable();
    } else {
      this.secondForm.get('tweet')?.enable();
    }
  }

  handleYtInput(ev: any) {
    this.isYtChecked = ev.checked;
  }

  handleTextArea(ev: any) {
    // console.log('EVENT', ev);
    this.isTextAreaActive = ev.checked;

    if (!this.isTextAreaActive) {
      this.thirdForm.get('message').disable();
    } else {
      this.thirdForm.get('message').enable();
    }
  }

  handleAgree(ev: any) {
    this.thirdForm.get('agreed').setValue(ev.checked);
  }


  openSnackBar() {

  }

  // ##### CHECK SURENAME #####
  get surenameValid() {
    return this.firstForm.controls['surename'].dirty ||
      this.firstForm.controls['surename'].touched;
  }

  get maxLengthsurename() {
    return this.firstForm.controls['surename'].errors?.['maxlength'];
  }



  get surenameRequired() {
    return this.firstForm.controls['surename'].errors?.['required'];
  }

  //  ##### CHECK FIRST NAME ##### 
  get firstNameValid() {
    return this.firstForm.controls['firstname'].dirty || this.firstForm.controls['firstname'].touched;
  }

  get maxLengthFirstname() {
    return this.firstForm.controls['firstname'].errors?.['maxlength'];
  }

  get firstNameRequired() {
    return this.firstForm.controls['firstname'].errors?.['required'];
  }


  // ##### CHECK STREET #####
  get streetValid() {
    return this.firstForm.controls['street'].dirty || this.firstForm.controls['street'].touched;
  }

  get streetRequired() {
    return this.firstForm.controls['street'].errors?.['required'];
  }

  get streetMaxLength() {
    return this.firstForm.controls['street'].errors?.['maxlength'];
  }


  // ##### CHECK CITY #####
  get cityValid() {
    return this.firstForm.controls['city'].dirty || this.firstForm.controls['city'].touched;
  }

  get cityRequired() {
    return this.firstForm.controls['city'].errors?.['required'];
  }

  get cityMaxLength() {
    return this.firstForm.controls['city'].errors?.['maxlength'];
  }
}



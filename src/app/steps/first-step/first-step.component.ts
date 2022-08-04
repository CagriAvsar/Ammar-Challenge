import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  myForm: FormGroup | any;
  firstStep: FormGroup | any;
  secondStep: FormGroup | any;
  lastStep: FormGroup | any;

  isEditable = false;
  inputVisible = true;

  isMaleChecked = false;
  isFemaleChecked = false;

  isFbChecked = false;
  isInstaChecked = false;
  isTweetChecked = false;
  isYtChecked = false;
  isTextAreaActive = false;
  isAgreedChecked = false;

  //##### SNACKBAR #####
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  countries = [
    { name: 'Germany', value: 'g', extradetails: true },
    { name: 'USA', value: 'u', extradetails: false },
    { name: 'Canada', value: 'c', extradetails: true },
    { name: 'England', value: 'e', extradetails: false }
  ];

  selectedCountry = this.countries[0].name;

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
    this.firstStep = this._formBuilder.group({
      gender: [''],
      surename: [null, [Validators.required, Validators.maxLength(10)]],
      firstname: [null, [Validators.required, Validators.maxLength(10)]],
      country: [null, Validators.required],
      date: [null, Validators.required],
      street: [null, [Validators.required, Validators.maxLength(25)]],
      city: [null, [Validators.required, Validators.maxLength(25)]],
    });
    this.secondStep = this._formBuilder.group({
      tel: [null, [Validators.required, Validators.max(10000000000)]],
      email: [null, [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      fb: [null, [Validators.required, Validators.maxLength(30)]],
      insta: [null, [Validators.required, Validators.maxLength(20)]],
      tweet: [null, [Validators.required, Validators.maxLength(15)]],
      youtube: [false],
    });
    this.lastStep = this._formBuilder.group({
      message: [null, Validators.maxLength(250)],
      agreed: [false]
    });
    this.initForms();
  }


  initForms(): void {
    this.loadFromLocalStorage();
  }


  loadFromLocalStorage(): void {
    let localStorageData = localStorage.getItem('myForm');
    if (localStorageData) {
      let loadData = JSON.parse(localStorage.getItem('myForm') || '');
      if (loadData) {
        this.handleImportGender(loadData);
        this.handleImportCountry(loadData);
        this.handleImportStreet(loadData);
        this.handleImportCity(loadData);
        this.handlePersonalData(loadData);
        this.handleImportSocialMedia(loadData);
        this.handleImportMessage(loadData);
        this.handleAgreement(loadData);
      }
    } else {
      this.disableSocialMedia();
    }
  }


  disableSocialMedia() {
    this.secondStep.get('fb').disable();
    this.secondStep.get('insta').disable();
    this.secondStep.get('tweet').disable();
    this.lastStep.get('message').disable();
  }


  handleImportGender(loadData: any) {
    if (loadData.data.gender === 'Male') {
      this.isMaleChecked = true;
    } else if (loadData.data.gender === 'Female') {
      this.isFemaleChecked = true;
    }
    this.firstStep.get('gender').setValue(loadData.data.gender);
  }


  handleImportCountry(loadData: any) {
    this.firstStep.get('country')?.setValue(loadData.data.country);
    this.selectedCountry = loadData.data.country;
  }


  handleImportStreet(loadData: any) {
    if (!!loadData.data.street) {
      this.firstStep.get('street').enable();
      this.firstStep.get('street')?.setValue(loadData.data.street);
    } else {
      this.firstStep.get('street').disable();
      this.inputVisible = false;
    }
  }


  handleImportCity(loadData: any) {
    if (!!loadData.data.city) {
      this.firstStep.get('city').enable();
      this.firstStep.get('city')?.setValue(loadData.data.city);
    } else {
      this.firstStep.get('city').disable();
      this.inputVisible = false;
    }
    this.firstStep.get('city')?.setValue(loadData.data.city);
  }


  handleImportSocialMedia(loadData: any) {
    if (!!loadData.contact.fb) {
      this.isFbChecked = true;
      this.secondStep.get('fb').enable();
      this.secondStep.get('fb')?.setValue(loadData.contact.fb);
    } else {
      this.secondStep.get('fb').disable();
    }
    if (!!loadData.contact.insta) {
      this.isInstaChecked = true;
      this.secondStep.get('insta').enable();
      this.secondStep.get('insta')?.setValue(loadData.contact.insta);
    } else {
      this.secondStep.get('insta').disable();
    }
    if (!!loadData.contact.tweet) {
      this.isTweetChecked = true;
      this.secondStep.get('tweet').enable();
      this.secondStep.get('tweet')?.setValue(loadData.contact.tweet);
    } else {
      this.secondStep.get('tweet').disable();
    }
    this.secondStep.get('youtube').setValue(loadData.contact.youtube);
  }


  handlePersonalData(loadData: any) {
    this.firstStep.get('surename')?.setValue(loadData.data.surename);
    this.firstStep.get('firstname')?.setValue(loadData.data.firstname);
    this.firstStep.get('date')?.setValue(loadData.data.date);
    this.secondStep.get('tel')?.setValue(loadData.contact.tel);
    this.secondStep.get('email')?.setValue(loadData.contact.email);
  }


  handleImportMessage(loadData: any) {
    if (!!loadData.aboutMe.message) {
      this.isTextAreaActive = true;
      this.lastStep.get('message').enable();
      this.lastStep.get('message')?.setValue(loadData.aboutMe.message);
    } else {
      this.isTextAreaActive = false;
      this.lastStep.get('message').disable();
    }
  }


  handleAgreement(loadData: any) {
    if (loadData.aboutMe.agreed) {
      this.isAgreedChecked = true;
      this.lastStep.get('agreed')?.setValue(loadData.aboutMe.agreed);
    } else {
      this.isAgreedChecked = false;
      this.lastStep.get('agreed')?.setValue(loadData.aboutMe.agreed);
    }
  }


  saveFirstForm() {
    this.myForm.get('data').setValue(this.firstStep.value);
    this.isEditable = true;
  }


  saveSecondForm(): void {
    this.myForm.get('contact').setValue(this.secondStep.value);
    this.isEditable = true;
  }


  submitForm() {
    this.myForm.get('aboutMe').setValue(this.lastStep.value);
    this.isEditable = true;
    this.saveFormData();
  }


  saveFormData() {
    if (this.firstStep.valid && this.secondStep.valid && this.lastStep.valid) {
      this.isEditable = true;
      // SNACKBAR
      this._snackBar.open('Data saved successfully!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      localStorage.setItem('myForm', JSON.stringify(this.myForm.value));
    }
    console.log('Your Data', this.myForm.value);
  }


  openDialog() {
    if (this.firstStep.dirty) {
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
          this.firstStep.reset();
        }
      })
    }
  }


  handleGender(ev: any) {
    let gender = ev.value;
    if (gender === 'Male') {
      this.isMaleChecked = true;
      this.isFemaleChecked = false;
    } else if (gender === 'Female') {
      this.isMaleChecked = false;
      this.isFemaleChecked = true;
    }

    this.firstStep.get('gender').setValue(gender);

    console.log('EVENT', ev);
    console.log('MAle', this.isMaleChecked);
    console.log('Female', this.isFemaleChecked);
  }


  handleSelectedCountry(name: string, value: boolean) {
    this.firstStep.get('country').setValue(name);

    this.inputVisible = value;
    if (this.inputVisible) {
      this.firstStep.get('street')?.enable();
      this.firstStep.get('city')?.enable();
    } else {
      this.firstStep.get('street')?.disable();
      this.firstStep.get('city')?.disable();
    }
  }


  handleFbInput(ev: any) {
    this.isFbChecked = ev.checked;
    if (!this.isFbChecked) {
      this.secondStep.get('fb')?.disable();
    } else {
      this.secondStep.get('fb')?.enable();
    }
  }


  handleInstaInput(ev: any) {
    this.isInstaChecked = ev.checked;
    if (!this.isInstaChecked) {
      this.secondStep.get('insta')?.disable();
    } else {
      this.secondStep.get('insta')?.enable();
    }
  }


  handleTweetInput(ev: any) {
    this.isTweetChecked = ev.checked;
    if (!this.isTweetChecked) {
      this.secondStep.get('tweet')?.disable();
    } else {
      this.secondStep.get('tweet')?.enable();
    }
  }


  handleYtInput(ev: any) {
    this.isYtChecked = ev.checked;
  }


  handleTextArea(ev: any) {
    this.isTextAreaActive = ev.checked;
    if (!this.isTextAreaActive) {
      this.lastStep.get('message').disable();
    } else {
      this.lastStep.get('message').enable();
    }
  }


  handleAgree(ev: any) {
    this.isAgreedChecked = ev.checked;
    this.lastStep.get('agreed').setValue(ev.checked);
  }


  // ##### CHECK SURENAME #####
  get surenameValid() {
    return this.firstStep.controls['surename'].dirty ||
      this.firstStep.controls['surename'].touched;
  }

  get maxLengthsurename() {
    return this.firstStep.controls['surename'].errors?.['maxlength'];
  }

  get surenameRequired() {
    return this.firstStep.controls['surename'].errors?.['required'];
  }

  //  ##### CHECK FIRST NAME ##### 
  get firstNameValid() {
    return this.firstStep.controls['firstname'].dirty || this.firstStep.controls['firstname'].touched;
  }

  get maxLengthFirstname() {
    return this.firstStep.controls['firstname'].errors?.['maxlength'];
  }

  get firstNameRequired() {
    return this.firstStep.controls['firstname'].errors?.['required'];
  }

  // ##### CHECK STREET #####
  get streetValid() {
    return this.firstStep.controls['street'].dirty || this.firstStep.controls['street'].touched;
  }

  get streetRequired() {
    return this.firstStep.controls['street'].errors?.['required'];
  }

  get streetMaxLength() {
    return this.firstStep.controls['street'].errors?.['maxlength'];
  }

  // ##### CHECK CITY #####
  get cityValid() {
    return this.firstStep.controls['city'].dirty || this.firstStep.controls['city'].touched;
  }

  get cityRequired() {
    return this.firstStep.controls['city'].errors?.['required'];
  }

  get cityMaxLength() {
    return this.firstStep.controls['city'].errors?.['maxlength'];
  }
}



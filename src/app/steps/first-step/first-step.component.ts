import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    lastname: [null, [Validators.required, Validators.maxLength(10)]],
    firstname: [null, [Validators.required, Validators.maxLength(10)]],
    country: ['Germany', Validators.required],
    date: [null, Validators.required],
    street: [null, [Validators.required, Validators.maxLength(25)]],
    city: [null, [Validators.required, Validators.maxLength(25)]],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  selectedCountry = [
    {
      name: 'Germany',
      value: 'g',
      extradetails: true
    },
    {
      name: 'USA',
      value: 'u',
      extradetails: false
    },
    {
      name: 'Canada',
      value: 'c',
      extradetails: true
    },
    {
      name: 'England',
      value: 'e',
      extradetails: false
    }
  ];
  isEditable = false;
  inputVisible = true;
  countryVal!: any;

  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    // private dialogRef: MatDialogRef<DialogComponent>
  ) {

  }

  ngOnInit(): void {
    this.saveFormData();
  }

  saveFormData() {
    if (this.firstFormGroup.valid) {
      console.log(this.firstFormGroup);
      this.isEditable = true;
    }
  }

  openDialog() {
    if (this.firstFormGroup.dirty) {
      //-----set timeout ?
        const dialogRef = this.dialog.open(DialogComponent, {
          data: {
            title: '',
            content: 'Are you sure ? Everything will be deleted !'
          },
          width: '300px',
          height: '220px'
        });

        dialogRef.afterClosed().subscribe((result:boolean)=>{
          if(result){
            // deine Funktion beim Bestätigen
            this.firstFormGroup.reset();
          } else {
            //bleibt dein Form
          }
        })
    }
  }

  handleSelectedCountry(value: boolean) {
    this.inputVisible = value;
    if (this.inputVisible) {
      this.firstFormGroup.get('street')?.enable();
      this.firstFormGroup.get('city')?.enable();
    } else {
      this.firstFormGroup.get('street')?.disable();
      this.firstFormGroup.get('city')?.disable();
    }
  }


  // ##### CHECK LAST NAME #####
  get lastNameValid() {
    return this.firstFormGroup.controls['lastname'].dirty ||
      this.firstFormGroup.controls['lastname'].touched;
  }

  get maxLengthLastName() {
    return this.firstFormGroup.controls['lastname'].errors?.['maxlength'];
  }



  get lastNameRequired() {
    return this.firstFormGroup.controls['lastname'].errors?.['required'];
  }

  //  ##### CHECK FIRST NAME ##### 
  get firstNameValid() {
    return this.firstFormGroup.controls['firstname'].dirty || this.firstFormGroup.controls['firstname'].touched;
  }

  get maxLengthFirstname() {
    return this.firstFormGroup.controls['firstname'].errors?.['maxlength'];
  }

  get firstNameRequired() {
    return this.firstFormGroup.controls['firstname'].errors?.['required'];
  }


  // ##### CHECK STREET #####
  get streetValid() {
    return this.firstFormGroup.controls['street'].dirty || this.firstFormGroup.controls['street'].touched;
  }

  get streetRequired() {
    return this.firstFormGroup.controls['street'].errors?.['required'];
  }

  get streetMaxLength() {
    return this.firstFormGroup.controls['street'].errors?.['maxlength'];
  }


  // ##### CHECK CITY #####
  get cityValid() {
    return this.firstFormGroup.controls['city'].dirty || this.firstFormGroup.controls['city'].touched;
  }

  get cityRequired() {
    return this.firstFormGroup.controls['city'].errors?.['required'];
  }

  get cityMaxLength() {
    return this.firstFormGroup.controls['city'].errors?.['maxlength'];
  }
}


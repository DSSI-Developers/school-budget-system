import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroupDirective,NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

interface Position {
  viewValue: string,
  value: string
}

interface Department {
  viewValue: string,
  value: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  durationInSeconds = 3;
  posite: Position[] = [
    {value: 'ครู', viewValue: 'ครู'},
    {value: 'หัวหน้ากลุ่มสาระการเรียนรู้', viewValue: 'หัวหน้ากลุ่มสาระการเรียนรู้'}
  ];

  departments: Department[] = [
    {value: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์', viewValue: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์'},
    {value: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์', viewValue: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์'},
    {value: 'กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี', viewValue: 'กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี'},
    {value: 'กลุ่มสาระการเรียนรู้', viewValue: 'กลุ่มสาระการเรียนรู้ภาษาไทย'},
    {value: 'กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา', viewValue: 'กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา'},
    {value: 'กลุ่มสาระการเรียนรู้', viewValue: 'กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม'},
    {value: 'กลุ่มสาระการเรียนรู้ศิลปะ', viewValue: 'กลุ่มสาระการเรียนรู้ศิลปะ'},
    {value: 'กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ', viewValue: 'กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ'},
  ]

  formUserData = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    position: ['', [Validators.required]],
    department: ['', [Validators.required]],
    role: ['user'],
    avatar: [''],
    permission: ['anonymous']
  })
  constructor(public fb: FormBuilder, private _snackBar: MatSnackBar, private rout:Router) { }

  ngOnInit(): void {
  }


  userRegister() {
    if (this.formUserData.value.phone.length < 10) {
      window.alert('หมายเลขโทรศัพท์ไม่ครบ 10 หลัก');
    }
    const user = {
      data: this.formUserData.value
    };
    console.log(user);
    console.log(this.formUserData.value);
    console.log(`Data from form register :${this.formUserData.value}`);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegisterComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}

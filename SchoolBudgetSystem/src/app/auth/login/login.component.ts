import { ActivatedRoute,Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface UserProfile {
 firstName: string;
 lastName: string;
 email: string;
 password: string;
 phone: string;
 position: string;
 role: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // email: string;
  // password: string;
  // login = new FormGroup ({
  //   email: new FormControl(''),
  //   password: new FormControl('')
  // })
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  userProfile: UserProfile[] = [
    {firstName: 'Kritsana', lastName: 'Prasit', email: 'admin@gmail.com', password: 'admin', phone: '0987654321', position: 'admin', role: 'admin'},
    {firstName: 'Prasit', lastName: 'Kritsana', email: 'kritsana.pr.60@ubu.ac.th', password: '1234567890', phone: '0987654321', position: 'user', role: 'user'},
  ];

  login = this.fb.group({
    email:['', Validators.email],
    password: ['', Validators.required]
  })

  constructor(private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    // const user = this.userProfile.forEach(data => {
    //   console.log(data);
    // })

    // console.log(this.userProfile[0]['firstName']);
  }

  onLogin() {
    // console.log(this.login.value);
    // const user = this.userProfile.forEach(data => {
    //   console.log(data);
    // });
    if (this.login.value) {
      if (this.login.value.email === this.userProfile[0]['email'] && this.login.value.password === this.userProfile[0]['password']) {
        this.router.navigate(['/home']);
        this._snackBar.open(`Welcom Mr. ${this.login.value.email}`, 'ปิด', {
          duration: 1000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      // tslint:disable-next-line: max-line-length
      } else if ( this.login.value.email === this.userProfile[1]['email'] && this.login.value.password === this.userProfile[1]['password']) {
        console.log(this.login.value.email, this.login.value.password);
        this.router.navigate(['/home']);
        this._snackBar.open(`Welcom Mr. ${this.login.value.email}`, 'ปิด', {
          duration: 1000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      } else {
        // window.alert(`Email and Password is ivalid !`)
        this._snackBar.open('Password or email invalid!!', 'ปิด', {
          duration: 50000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    } else {
      window.alert(`${this.login.value}`)
    }
  }

}

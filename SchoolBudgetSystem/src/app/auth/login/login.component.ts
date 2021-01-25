import { Subscription } from 'rxjs/Subscription';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  styleUrls: ['./login.component.css'],
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
    {
      firstName: 'Kritsana',
      lastName: 'Prasit',
      email: 'admin@gmail.com',
      password: 'admin',
      phone: '0987654321',
      position: 'admin',
      role: 'admin',
    },
    {
      firstName: 'Prasit',
      lastName: 'Kritsana',
      email: 'kritsana.pr.60@ubu.ac.th',
      password: '1234567890',
      phone: '0987654321',
      position: 'user',
      role: 'user',
    },
  ];

  login = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  // private authSub: Subscription;
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.usersService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onLogin() {
    this.isLoading = true;
    this.usersService.userLogin(
      this.login.value.email,
      this.login.value.password
    );

    // if (this.login.value) {
    //   if (
    //     this.login.value.email === this.userProfile[0]['email'] &&
    //     this.login.value.password === this.userProfile[0]['password']
    //   ) {
    //     this.router.navigate(['/home']);
    //     this._snackBar.open(`Welcom Mr. ${this.login.value.email}`, 'ปิด', {
    //       duration: 1000,
    //       horizontalPosition: 'right',
    //       verticalPosition: 'bottom',
    //     });
    //   } else if (
    //     this.login.value.email === this.userProfile[1]['email'] &&
    //     this.login.value.password === this.userProfile[1]['password']
    //   ) {
    //     console.log(this.login.value.email, this.login.value.password);
    //     this.router.navigate(['/home']);
    //     this._snackBar.open(`Welcom Mr. ${this.login.value.email}`, 'ปิด', {
    //       duration: 1000,
    //       horizontalPosition: 'right',
    //       verticalPosition: 'bottom',
    //     });
    //   } else {

    //     this._snackBar.open('Password or email invalid!!', 'ปิด', {
    //       duration: 50000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //   }
    // } else {
    //   window.alert(`${this.login.value}`);
    // }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}

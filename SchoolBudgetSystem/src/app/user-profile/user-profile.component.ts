import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { ManageProfileComponent } from "app/user-profile/manage-profile/manage-profile.component";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { UsersService } from "./../services/users.service";
import { mimeType } from "./mime-type.validator";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  position: string;
}

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userData: UserData[] = [
    {
      firstName: "กฤษณะ",
      lastName: "ประสิทธิ์",
      email: "kritsana.pr.60@ubu.ac.th",
      phone: "09876543221",
      gender: "ชาย",
      age: "22",
      position: "ผู้ดูแลระบบ",
    },
  ];

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private userId;

  /**
   *  ตัวแปลที่รับค่าข้อมูลจาก Database ที่ Subscrip มา
   *
   * @memberof UserProfileComponent
   */
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  position: string;
  avatar: string;
  department: string;
  role: string;
  /**
   * Form Group for read and edit user datea
   *
   * @type {FormGroup}
   * @memberof UserProfileComponent
   */
  profile: FormGroup;
  imagePreview: string;

  constructor(public dialog: MatDialog, private userServices: UsersService) {}

  ngOnInit() {
    // Section user detail
    this.profile = new FormGroup({
      firstName: new FormControl(null, { validators: [Validators.required] }),
      lastName: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
      phone: new FormControl(null, { validators: [Validators.required] }),
      position: new FormControl(null, { validators: [Validators.required] }),
      department: new FormControl(null, { validators: [Validators.required] }),
      avatar: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
    });
    // Section user
    this.userServices.autoAuthUser();
    this.userId = this.userServices.getUserId();
    console.log(this.userId);
    this.userServices.getUserDetail(this.userId).subscribe((oneUserDetail) => {
      console.log(`Personal data : ${oneUserDetail.data}`);
      this.id = oneUserDetail.data._id;
      this.firstName = oneUserDetail.data.firstName;
      this.lastName = oneUserDetail.data.lastName;
      this.email = oneUserDetail.data.email;
      this.password = oneUserDetail.data.password;
      this.phone = oneUserDetail.data.phone;
      this.position = oneUserDetail.data.position;
      this.avatar  = oneUserDetail.data.avatar,
      this.department = oneUserDetail.data.department,
      this.role = oneUserDetail.data.role,
      console.log(this.avatar);
      this.imagePreview = this.avatar;

      // Set data value in profile form control
      this.profile.setValue({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phone: this.phone,
        position: this.position,
        department: this.department,
        avatar: this.avatar
      });
    });

    this.userIsAuthenticated = this.userServices.getIsAuth();
    this.authListenerSubs = this.userServices
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profile.patchValue({ avatar: file });
    this.profile.get('avatar').updateValueAndValidity();
    console.log(file);
    console.log(this.profile);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  editUser() {
    if (this.profile.invalid) {
      return;
    }
    const dialogRef = this.dialog.open(ManageProfileComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSavePost() {
    console.log(this.userId);
    console.log(this.profile.value.firstName);
    this.userServices.userEditData(
      this.userId,
      this.profile.value.firstName,
      this.profile.value.lastName,
      this.profile.value.email,
      this.profile.value.password,
      this.profile.value.phone,
      this.profile.value.position,
      this.profile.value.department,
      this.role,
      this.profile.value.avatar
    );
    // console.log(this.profile.value.avatar);
    // console.log(typeof this.profile.value.avatar);
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}

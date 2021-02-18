import { Validators, FormBuilder, FormGroup , FormControl} from "@angular/forms";
import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Users } from "./../../../models/users.model";
import { UsersService } from "./../../services/users.service";

interface Position {
  viewValue: string;
  value: string;
}

interface Department {
  viewValue: string;
  value: string;
}

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  userData = [
    {
      id: 2,
      firstName: "Prasit",
      lastName: "Kritsana",
      email: "kritsana.pr.60@ubu.ac.th",
      password: "1234567890",
      phone: "0987654321",
      position: "user",
      role: "user",
      permission: "Anonymous",
    },
  ];

  posite: Position[] = [
    { value: "ครู", viewValue: "ครู" },
    {
      value: "หัวหน้ากลุ่มสาระการเรียนรู้",
      viewValue: "หัวหน้ากลุ่มสาระการเรียนรู้",
    },
    { value: "ผู้ดูแลระบบ", viewValue: "ผู้ดูแลระบบ" },
  ];

  departments: Department[] = [
    {
      value: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์",
      viewValue: "กลุ่มสาระการเรียนรู้วิทยาศาสตร์",
    },
    {
      value: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
      viewValue: "กลุ่มสาระการเรียนรู้คณิตศาสตร์",
    },
    {
      value: "กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี",
      viewValue: "กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี",
    },
    { value: "กลุ่มสาระการเรียนรู้", viewValue: "กลุ่มสาระการเรียนรู้ภาษาไทย" },
    {
      value: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
      viewValue: "กลุ่มสาระการเรียนรู้สุขศึกษาและพลศึกษา",
    },
    {
      value: "กลุ่มสาระการเรียนรู้",
      viewValue: "กลุ่มสาระการเรียนรู้สังคมศึกษา ศาสนา และวัฒนธรรม",
    },
    {
      value: "กลุ่มสาระการเรียนรู้ศิลปะ",
      viewValue: "กลุ่มสาระการเรียนรู้ศิลปะ",
    },
    {
      value: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
      viewValue: "กลุ่มสาระการเรียนรู้ภาษาต่างประเทศ",
    },
  ];

  // formUserData: FormGroup;

  formUserData = this.fb.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required]],
    position: ["", [Validators.required]],
    department: ["", [Validators.required]],
    role: ["user"],
    avatar: [""],
    permission: ["anonymous"],
  });
  dataUser;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  role: string;
  avatar: any;
  permission: any;
  // @Input("passingData") passingData: Array<any>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: string },
    public dialog: MatDialog,
    public fb: FormBuilder,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    const userID =  this.usersService.getUserId();
    console.log(userID);
    this.usersService.getUserDetail(userID).subscribe((userDetail) => {
      console.log(userDetail);
      this.firstName = userDetail.data.firstName;
      this.lastName = userDetail.data.lastName;
      this.email = userDetail.data.email;
      this.phone = userDetail.data.phone;
      this.position = userDetail.data.position;
      this.department = userDetail.data.department;
      this.avatar = userDetail.data.avatar;
      this.permission = userDetail.data.permission;
    });
    // this.formUserData.setValue({
    //   firstName: this.firstName,
    //   lastName: this.lastName,
    //   email: this.email,
    //   phone: this.phone,
    //   position: this.position,
    //   department: this.department
    // });
    this.dataUser = this.data.user;
    console.log(`User ID in dialog component: ${this.data.user}`);
  }

  ondeleteUser(id, userName) {
    const valueConfirm = window.confirm(
      `ต้องการลบผู้ใช้งาน ${id} ${userName} คนนี้หรือไม่ ?`
    );
    console.log(valueConfirm);
    this.dialog.closeAll();
  }

  editUser() {
    console.log(this.formUserData.value);
    window.alert(this.formUserData.value);
  }

  // editUser(id: string, firstName: string) {
  //   const valueConfirm = window.confirm(
  //     `ต้องการ verified ${firstName} หรือไม่`
  //   );
  //   if (valueConfirm === true) {
  //     this.dataUser.forEach((fied) => {
  //       console.log(fied);
  //       this.usersService.editUser(
  //         fied._id,
  //         fied.firstName,
  //         fied.lastName,
  //         fied.email,
  //         fied.password,
  //         fied.phone,
  //         fied.position,
  //         fied.department,
  //         fied.role,
  //         fied.avatar,
  //         fied.permission
  //       );
  //     });
  //     console.log('Verified');
  //   } else {
  //     console.log('Cancle verified');
  //   }
  // }

}

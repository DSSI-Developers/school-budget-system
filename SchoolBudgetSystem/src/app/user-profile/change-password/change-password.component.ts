import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  editPassword: FormGroup;
  // Password hide
  hide_old_pwd = true;
  hide_new_pwd = true;
  hide_confirm_pwd = true;

  error_messages = {
    'ole_password': [
      { type: 'required', message: 'กรุณากรอกรหัวผ่านเดิม' },
      { type: 'minlength', message: 'รหัสผ่านต้องมี 8 ตัวขึ้นไป' },
      { type: 'maxlength', message: 'รหัสผ่านต้องไม่เกิน 30 ตัว' },
      // { type: 'required', message: 'please enter a valid Password.' }
    ],

    'new_password': [
      { type: 'required', message: 'กรอกรหัวผ่านใหม่' },
      { type: 'minlength', message: 'รหัสผ่านต้องมี 8 ตัวขึ้นไป' },
      { type: 'maxlength', message: 'รหัสผ่านต้องไม่เกิน 30 ตัว' }
    ],
    'confirm_password': [
      { type: 'required', message: 'ยังไม่กรอกข้อมูลการยืทยันรหัสผ่าน.' },
      { type: 'minlength', message: 'รหัสผ่านต้องมี 8 ตัวขึ้นไป' },
      { type: 'maxlength', message: 'รหัสผ่านต้องไม่เกิน 30 ตัว' }
    ],
  }
  constructor(public formBuilder: FormBuilder) {
    this.editPassword = this.formBuilder.group({
      old_password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])),
      new_password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])),
      confirm_password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ])),
    }, { 
      validators: this.password.bind(this)
    });
  }

  get passwordInput() {
    return this.editPassword.get("password");
  }

  ngOnInit(): void {
    // this.editPassword = new FormGroup({
    //   old_password: new FormControl({
    //     validators: [Validators.required],
    //   }),
    //   new_password: new FormControl({
    //     validators: [
    //       Validators.required,
    //       Validators.minLength(6),
    //       Validators.maxLength(30),
    //     ],
    //   }),
    //   confirm_password: new FormControl({
    //     validators: [
    //       Validators.required,
    //       Validators.minLength(6),
    //       Validators.maxLength(30),
    //     ],
    //   }),
    // });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('new_password');
    const { value: confirmPassword } = formGroup.get('confirm_password');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  saveChangePassword() {
    console.log(this.editPassword.value.old_password);
    console.log(this.editPassword.value.new_password);
    console.log(this.editPassword.value.confirm_password);
  }
}

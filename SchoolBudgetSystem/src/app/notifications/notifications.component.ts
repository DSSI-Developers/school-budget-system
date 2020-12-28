import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
declare var $: any;

export interface Notification {
  dateTime: string;
  type: string;
  status: string;
  icon: string;
  detail: string;
  note: string;
}



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {

  notification: Notification[] = [
    { dateTime: '05 ธ.ค. 2563 - 16:11', type: 'โครงการ', status: 'กำลังดำเนินการ', icon: '', detail: 'โครงการของท่านกำลังอยู่ในช่วงดำเนินการ', note: ''},
    { dateTime: '01 ธ.ค. 2563 - 10:18', type: 'ครุภัณฑ์', status: 'สำเร็จ', icon: '', detail: 'โครงการผ่านการอนุมัติเรียบร้อยแล้ว', note: ''},
    { dateTime: '02 ธ.ค. 2563 - 20:54', type: 'โครงการ', status: 'กำลังดำเนินการ', icon: '', detail: 'โครงการของท่านกำลังอยู่ในช่วงดำเนินการ', note: ''},
    { dateTime: '27 พ.ย. 2563 - 09:59', type: 'ครุภัณฑ์', status: 'ไม่สำเร็จ', icon: '', detail: 'โครงการไม่ผ่านการอนุมัติเนื่องจาก มีอุปกรณ์ที่สามารถใช้ทดอทนกันได้', note: ''}
  ];

  constructor() { }

  ngOnInit() {
  }

  closeNitification(id) {
    window.confirm('ต้องการลบการแจ้งเตือนนี้หรือไม่');
    console.log(id);
    const index = this.notification.indexOf(id);
  //   for( var i = 0; i < this.notification.length; i++) {
  //     if ( this.notification[i] === id) {
  //       this.notification.splice(i, 0);
  //         i--;
  //     }
  // }
    // this.notification.forEach(data => {
    //   console.log(data);
    //   this.notification.slice()
    // })
  }

}
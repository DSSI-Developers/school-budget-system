import { UserData } from './../../user-profile/user-profile.component';
import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/allproject', title: 'โครงการทั้งหมด',  icon: 'content_paste', class: '' },
    { path: '/allproject', title: 'ประวัติการได้รับจัดสรร',  icon: 'content_paste', class: '' },
    { path: '/requestEquipment', title: 'เพิ่มคําขอครุภัณฑ์หลัก',  icon: 'library_books', class: '' },
    { path: '/addRequestEquip', title: 'เพิ่มคำขอจัดตั้งครุภัณฑ์ใหม่',  icon: 'library_books', class: '' }, // ไม่ได้อยู่ใน Sidebar
    { path: '/manageSubQuipment', title: 'จัดการครุภัณฑ์หรือรายการย่อย',  icon: 'chrome_reader_mode', class: '' }, // ไม่ได้อยู่ใน Sidebar
    { path: '/notifications', title: 'การเเจ้งเตือนโครงการ',  icon:'notifications', class: '' },
    { path: '/user-profile', title: 'โปรไฟล์',  icon: 'person', class: '' },
    { path: '/readForm', title: 'ตรวจสอบโครงการ',  icon: 'folder_open', class: '' },
    { path: '/readDetailForm', title: 'อ่านรายละเอียดโครงการ',  icon: 'chrome_reader_mode', class: '' },   // ไม่แสดงใน Sidebar
    { path: '/manageUser', title: 'จัดการผู้ใช้งาน',  icon: 'supervised_user_circle', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

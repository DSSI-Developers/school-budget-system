import { Subscription } from 'rxjs/Subscription';

import { Equipments } from './../../models/equipments.model';
import { EquipmentsService } from './../services/equipments.service';
import { MoreDetailComponent } from './more-detail/more-detail.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';


// Export PDF 
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { UsersService } from 'app/services/users.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  equipments: Equipments[] = [];
  successEquipments: Equipments[] = [];
  pendingEquipments: Equipments[] = [];
  failedEquipments: Equipments[] = [];

  isLoading = false;
  private authStatusSub: Subscription;
  private getEquipmentsData: Subscription;
  countSuccess: number;
  countPending: number;
  countFailed: number;
  userId: string;
  statusDetail;
  document: any;

  searchEquipment: string;
  constructor(public dialog: MatDialog, private equipmentServices: EquipmentsService, private userServices: UsersService) { }

  ngOnInit() {
    this.authStatusSub = this.userServices.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false
    });
    // Get data totable
    this.userId = this.userServices.getUserId();
    this.equipmentServices.getAllEquipments();
    this.getEquipmentsData = this.equipmentServices.getEquipmentUpdateListener()
    .subscribe((objectData: Equipments[]) => {
      this.equipments = objectData;
      this.document = this.equipments.filter(data => data.creator === this.userId);
      this.pendingEquipments = this.document.filter((status) => status.status === 'กำลังดำเนินการ');
      this.successEquipments = this.document.filter((status) => status.status === 'ผ่านการอนุมัติ');
      this.failedEquipments = this.document.filter((status) => status.status === 'ไม่ผ่านการอนุมัติ');

      this.countSuccess = this.successEquipments.length;
      this.countPending = this.pendingEquipments.length;
      this.countFailed = this.failedEquipments.length;
      
    });
  }

  generatePdf() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf',
      },
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf',
      },
    };
    const dd = {
      header: {
        
      },
      footer(currentPage, pageCount) {
        return {
          columns: [
            { text: 'โครงการจัดตั้งครุภัณฑ์', fontSize: 14, alignment: 'center' },
            {
              text:
                'หน้าที่ ' +
                currentPage.toString() +
                ' จาก ' +
                pageCount +
                'หน้า',
              margin: [5, 5, 15, 5],
              alignment: 'right',
            },
          ],
        };
      },
      
      content: [
        { text: 'โครงการจัดตั้งครุภัณฑ์', fontSize: 18, alignment: 'center' ,bold: true },
        {
          columns: [
            {
              width: '20%',
              text: 'ชื่อโครงการ', 
              fontSize: 16,
              bold: true
            },
            {
              width: '*',
              text: 'ครุภัณฑ์คอมพิวเตอร์',
              fontSize: 16
            }
          ],
          columnGap: 10
        },
        {
          columns: [
            {
              width: '20%',
              text: 'กลุ่มงานที่รับผิดชอบ', 
              fontSize: 16,
              bold: true
            },
            {
              width: '*',
              text: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์',
              fontSize: 16
            }
          ],
          columnGap: 10
        },
        {
          columns: [
            {
              width: '20%',
              text: 'ผู้รับผิดชอบ', 
              fontSize: 16,
              bold: true
            },
            {
              width: '*',
              text: 'กฤษณะ  ประสิทธิ์',
              fontSize: 16
            }
          ],
          columnGap: 10
        },
      ],
      defaultStyle: {
        font: 'THSarabunNew',
      },
    };
    pdfMake.createPdf(dd).open();
  }

  moreDetail(status: any) {
    this.statusDetail = status;
    console.log('Status : ', this.statusDetail);
    const dialogRef = this.dialog.open(MoreDetailComponent, {
      data: {
        data: this.statusDetail
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  ngOnDestroy(): void {

  }

}

import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { Equipments } from './../../models/equipments.model';
import { EquipmentsService } from './../services/equipments.service';
import { MoreDetailComponent } from './more-detail/more-detail.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Chartist from 'chartist';
import {MatDialog} from '@angular/material/dialog';
import { Subject } from 'rxjs';


// Export PDF 
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface DurableArticles {
  no: string;
  list: string;
  unit: number;
  unitMany: number;
  priceUnit: number;
  projectStatus: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  allProject: DurableArticles[] = [
  {no: '1', list: 'Project', unit: 2, unitMany: 2, priceUnit: 2000, projectStatus: 'สำเร็จ'},
  ];

  equipments: Equipments[] = [];
  private getEquipmentsData: Subscription;
  constructor(public dialog: MatDialog, private equipmentServices: EquipmentsService) { }

  ngOnInit() {
    this.equipmentServices.getAllEquipments();
    this.getEquipmentsData = this.equipmentServices.getEquipmentUpdateListener()
    .subscribe((objectData: Equipments[]) => {
      this.equipments = objectData;
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
      header: {},
      footer(currentPage, pageCount) {
        return {
          columns: [
            { text: 'ท้ายกระดาษ’, fontSize: 15, alignment: ‘center' },
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
        { text: 'ทดสอบการสร้าง pdf ', fontSize: 18, alignment: 'center' },
      ],
      defaultStyle: {
        font: 'THSarabunNew',
      },
      // watermark: {
      //   text: 'ลายน้ำแบบคาด',
      //   color: 'blue',
      //   opacity: 0.1,
      //   bold: true,
      // },
    };
    pdfMake.createPdf(dd).open();
  }
  
  moreDetail() {
    const dialogRef = this.dialog.open(MoreDetailComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnDestroy(): void {

  }

  

}

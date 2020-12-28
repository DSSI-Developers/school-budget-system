import { Component, OnInit,  } from '@angular/core';


export interface Type {
  value: string;
  valueView: string;
}
@Component({
  selector: 'app-request-equipment',
  templateUrl: './request-equipment.component.html',
  styleUrls: ['./request-equipment.component.css']
})
export class RequestEquipmentComponent implements OnInit {

  listOfProject = [
    {no: '1', type: 'โครงการ', list: 'เด็กดีมีคุณธรรม', unit: '20', budget: '20000', note: ' ', subEquipment: ''},
    {no: '2', type: 'ครุภัณฑ์', list: 'การ์ดจอ RTX 8080', unit: '10', budget: '1000000', note: 'คำขอไม่สมบูรณ์', subEquipment: ''}
  ]
  typeOfProject: Type[] = [
    {value: 'ครุภัณฑ์การศึกษา', valueView: 'ครุภัณฑ์การศึกษา'},
    {value: 'โครงการ', valueView: 'โครงการ'}
  ];
  constructor() { }
// Route manageSubQuipment
  ngOnInit(): void {
  }
  manageSubQuipments() {

  }

}

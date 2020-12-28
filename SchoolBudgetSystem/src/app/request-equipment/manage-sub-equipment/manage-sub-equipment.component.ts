import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
export interface SubEquipment {
  no: number;  // ลำดับ
  list: string; // รายการ
  price: number; // ราคาต่อหน่วย
  unit: number;   // จำนวนหน่วย
  budget: number;
  edit: string;
  delete: string;
}

@Component({
  selector: 'app-manage-sub-equipment',
  templateUrl: './manage-sub-equipment.component.html',
  styleUrls: ['./manage-sub-equipment.component.css']
})
export class ManageSubEquipmentComponent implements OnInit {
  listOfProject = [
    {no: '1', type: 'โครงการ', list: 'วงโยธวาทิต', unit: '20', budget: 900000, subEquipment: 900000}
  ]
  listOfSubProject = [
    {no: 1, list: 'กลองสเเนร์', price: 50000, unit: 4, budget: 200000, edit: 'edit', delete: 'delete'},
    {no: 2, list: 'เซคโซโฟน', price: 25000, unit: 12, budget: 300000, edit: 'edit',delete: 'delete'},
    {no: 3, list: 'กลองใหญ่', price: 50000, unit: 2, budget: 100000, edit: 'edit',delete: 'delete'},
    {no: 4, list: 'ทอมโบน', price: 100000, unit: 3, budget: 300000, edit: 'edit',delete: 'delete'},
  ].sort();

  subEquipment = this.fb.group({
    equimentName: [''],
    pricePerunit: [''],
    unit: [''],
    budget: ['']
  });

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
  }


  daleteEquip() {
    window.confirm('ต้องการลบข้อมูลนี้หรือไม่');
  }
}

import { Type } from './../request-equipment.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
export interface SubEquipment {
  no: number; // ลำดับ
  list: string; // รายการ
  price: number; // ราคาต่อหน่วย
  unit: number; // จำนวนหน่วย
  budget: number;
  edit: string;
  delete: string;
}

@Component({
  selector: 'app-manage-sub-equipment',
  templateUrl: './manage-sub-equipment.component.html',
  styleUrls: ['./manage-sub-equipment.component.css'],
})
export class ManageSubEquipmentComponent implements OnInit {
  subEquipment = this.fb.group({
    equipmentName: [''],
    pricePerunit: [''],
    unit: [''],
    budget: [''],
  });

  listOfProject = [
    {
      no: '1',
      type: 'โครงการ',
      list: 'วงโยธวาทิต',
      unit: '20',
      budget: 900000,
      subEquipment: 900000,
    },
  ];


  listOfSubProject: SubEquipment[] = [

    // {
    //   no: 1,
    //   list: this.subEquipment.value.equipment,
    //   price: this.subEquipment.value.pricePerunit,
    //   unit: this.subEquipment.value.unit,
    //   budget: this.subEquipment.value.budget,
    //   edit: 'edit',
    //   delete: 'delete'
    // }
    // {no: 1, list: 'กลองสเเนร์', price: 50000, unit: 4, budget: 200000, edit: 'edit', delete: 'delete'},
    // {no: 2, list: 'เซคโซโฟน', price: 25000, unit: 12, budget: 300000, edit: 'edit',delete: 'delete'},
    // {no: 3, list: 'กลองใหญ่', price: 50000, unit: 2, budget: 100000, edit: 'edit',delete: 'delete'},
    // {no: 4, list: 'ทอมโบน', price: 100000, unit: 3, budget: 300000, edit: 'edit',delete: 'delete'},
  ];


  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(typeof this.listOfSubProject);
  }

  addSubEupqment() {
    let index: number = 1;
    this.listOfSubProject.push(
      // tslint:disable-next-line: max-line-length
      {
        no: index + this.listOfSubProject.length,
        list: this.subEquipment.value.equipmentName,
        price: this.subEquipment.value.pricePerunit,
        unit: this.subEquipment.value.unit,
        budget: this.subEquipment.value.budget,
        edit: 'edit',
        delete: 'delete',
      }
    );
  }

  deleteEquipment(id: any) {
    console.log(id);
  }
  saveSubEupqment() {
    console.log(this.listOfSubProject);
  }
  daleteEquip() {
    window.confirm('ต้องการลบข้อมูลนี้หรือไม่');
  }
}

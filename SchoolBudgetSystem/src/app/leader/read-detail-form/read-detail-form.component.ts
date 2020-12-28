import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-detail-form',
  templateUrl: './read-detail-form.component.html',
  styleUrls: ['./read-detail-form.component.css']
})
export class ReadDetailFormComponent implements OnInit {
  listOfProject = [
    {no: '1', type: 'โครงการ', list: 'วงโยธวาทิต', unit: '20', budget: 900000, subEquipment: 900000}
  ]
  
  listOfSubProject = [
    {no: 1, list: 'กลองสเเนร์', price: 50000, unit: 4, budget: 200000, edit: 'edit', delete: 'delete'},
    {no: 2, list: 'เซคโซโฟน', price: 25000, unit: 12, budget: 300000, edit: 'edit',delete: 'delete'},
    {no: 3, list: 'กลองใหญ่', price: 50000, unit: 2, budget: 100000, edit: 'edit',delete: 'delete'},
    {no: 4, list: 'ทอมโบน', price: 100000, unit: 3, budget: 300000, edit: 'edit',delete: 'delete'},
  ].sort();
  constructor() { }

  ngOnInit(): void {
  }

}

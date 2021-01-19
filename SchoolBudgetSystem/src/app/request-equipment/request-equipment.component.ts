import { EquipmentsService } from './../services/equipments.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Equipments } from './../../models/equipments.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

export interface Type {
  value: string;
  valueView: string;
}
@Component({
  selector: 'app-request-equipment',
  templateUrl: './request-equipment.component.html',
  styleUrls: ['./request-equipment.component.css'],
})
export class RequestEquipmentComponent implements OnInit, OnDestroy {
  listOfProject = [
    {
      no: '1',
      type: 'โครงการ',
      list: 'เด็กดีมีคุณธรรม',
      unit: '20',
      budget: '20000',
      note: ' ',
      subEquipment: '',
    },
    {
      no: '2',
      type: 'ครุภัณฑ์',
      list: 'การ์ดจอ RTX 8080',
      unit: '10',
      budget: '1000000',
      note: 'คำขอไม่สมบูรณ์',
      subEquipment: '',
    },
  ];
  typeOfProject: Type[] = [
    { value: 'ครุภัณฑ์การศึกษา', valueView: 'ครุภัณฑ์การศึกษา' },
    { value: 'โครงการ', valueView: 'โครงการ' },
  ];
  equipments: Equipments[] = [];
  private allEquipment$: Subscription;

  constructor(
    private equipmentsService: EquipmentsService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    // this.equipmentsService.getAllEquipments().subscribe((equipment) => {
    //   this.allEquipment$ = equipment.data;
    //   console.log(this.allEquipment$);
    // });
    this.equipmentsService.getAllEquipments();
    this.allEquipment$ = this.equipmentsService.getEquipmentUpdateListener()
      .subscribe((equipments: Equipments[]) => {
        this.equipments = equipments;
      });
  }
  manageSubQuipments() {}

  deleteEquipment(equipmentId: string) {
    console.log(equipmentId);
    const confirm = window.confirm('ต้องการลบข้อมูลหรือไม่');
    if (confirm === true) {
      this.equipmentsService.deleteEquipment(equipmentId);
    } else {
      window.alert('บักขี้ตั๋ว');
    }
  }
  ngOnDestroy(): void {
    this.allEquipment$.unsubscribe();
  }
}

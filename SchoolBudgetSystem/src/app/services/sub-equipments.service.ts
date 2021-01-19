import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubEquipments } from './../../models/sub-equipments.model';

@Injectable({
  providedIn: 'root'
})
export class SubEquipmentsService {
  subEquipments: SubEquipments;

  constructor(private http: HttpClient) { }

  getSubEquipments() {

  }

  getOneSubEquipment(id: string) {

  }

  addSubEquipments() {

  }

  editSubEQuipment(
    id: string,
    subEquipmentName: string,
    pricePerunit: string,
    number: number,
    budget: number
  ) {

  }

  deleteSubEquipment(id: string) {

  }
}

import { Equipments } from './../../models/equipments.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {
  private equipments: Equipments[] = [];

  constructor(private http:HttpClient) { }

  getAllEquipments() {

  }

  getOneEquipment() {

  }


  addEquipment() {

  }

  editEquipment() {

  }

  deleteEquipment() {

  }


  deleteAllEquipments() {

  }

}

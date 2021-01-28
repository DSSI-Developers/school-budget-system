import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { stringify } from "@angular/compiler/src/util";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SubEquipments } from "./../../models/sub-equipments.model";

@Injectable({
  providedIn: "root",
})
export class SubEquipmentsService {
  subEquipments: SubEquipments[] = [];
  private subEquipmentUpdate = new Subject<SubEquipments[]>();

  constructor(private http: HttpClient, public router: Router) {}

  getEquipmentBySunId(mainId: string) {
    return this.http.get<{ message: string; response: any }>(
      "http://localhost:8080/subEquipment/getSubId/" + mainId
    );
  }

  getSubEquipments() {
    return this.http
      .get<{ message: string; response: any }>(
        "http://localhost:8080/subEquipment/getAllSubEquip"
      )
      .subscribe((data) => {
        this.subEquipments = data.response;
      });
  }

  // subEquipmentListenUpdate() {
  //   return this.subEquipmentUpdate.asObservable();
  // }

  // getSubEquipmentUpdate(id: string) {
  //   return { ...this.subEquipments.filter((data) => data._id === id) };
  // }

  getOneSubEquipment(id: string) {}

  addSubEquipments(
    mainId: string,
    mainEquipmentsName: string,
    subEquipmentName: string,
    pricePerunit: string,
    number: number,
    budget: number
  ) {
    const subEquipment = {
      mainId: mainId,
      mainEquipmentsName: mainEquipmentsName,
      subEquipmentName: subEquipmentName,
      pricePerunit: pricePerunit,
      number: number,
      budget: budget,
    };
    this.http
      .post<{ message: string; response: any }>(
        "http://localhost:8080/subEquipment/addSubEquipment",
        subEquipment
      )
      .subscribe((response) => {
        console.log("This is response : ", response);
      });
    // console.log(`Data of sub equipment :${mainId}, ${mainEquipmentsName} ,${subEquipmentName},${pricePerunit},${number}, ${budget}`);
  }

  editSubEQuipment(
    id: string,
    subEquipmentName: string,
    pricePerunit: string,
    number: number,
    budget: number
  ) {}

  deleteSubEquipment(id: string) {
    // console.log('Delete data at id : ' + id);
    this.http.delete('http://localhost:8080/subEquipment/deleteSubEquipment/' + id).subscribe(result => {
      console.log('DElete Successful!');
    });
  }
}

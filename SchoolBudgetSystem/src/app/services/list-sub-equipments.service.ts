import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListSubEquipmentsService {
  url = "http://localhost:8080/subEquipmentList/subEquipmentList/";
  constructor(private http:HttpClient) { }

  addList() {}

  getList() {
    return this.http.get<{message: string, response: any}>(this.url);
  }

  getListByName(main: string) {
    console.log(main);
    return this.http.get<{message: string, response: any}>(this.url + main );
  }
}

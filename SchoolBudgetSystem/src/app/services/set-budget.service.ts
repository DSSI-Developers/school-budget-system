import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { SetBudget } from '../../models/setBudget.model';
import { Subject } from 'rxjs';

const API_URL = 'http://localhost:8080/setbudget/setbudget'
@Injectable({
  providedIn: 'root'
})
export class SetBudgetService {
  dataSet: SetBudget[] = [];
  dataSetUpdate = new Subject<SetBudget[]>();

  constructor(private http: HttpClient) { }
  getAllDataBudget() {
    return this.http.get<{data: any}>(API_URL).subscribe(result => {
      this.dataSet = result.data;
      this.dataSetUpdate.next([...this.dataSet]);
    });
  }

  updateListener() {
    return this.dataSetUpdate.asObservable();
  }

  setBudget(
    budget: number,
    date: Date,
    learningGroup: string
  ) {
    const setBudget = {
      budget,
      date,
      learningGroup
    };

    this.http.post(API_URL, setBudget).subscribe(res => {
      console.log(res);
      this.getAllDataBudget();
        Swal.fire('เพิ่มข้อมูลสำเร็จ', 'เพิ่มงบประมาณที่ได้ระบการจัดสรรแล้ว', 'success')
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'เพิ่มข้อมูลไม่สำเร็จ',
        text: 'มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้ง',
      })
    });
  }

  getDataBudget() {
    return this.http.get<{data: any}>(API_URL);
  }

  editDataBudget(id: string, budget: number, date: Date, learningGroup: string) {
    const dataSet = {
      budget,
      date,
      learningGroup
    }
    console.log(dataSet);
    this.http.put(API_URL + '/' + id, dataSet).subscribe(result => {
      console.log(result);
      Swal.fire('แก้ไขข้อมูลสำเร็จ', 'แก้ไขงบประมาณที่ได้ระบการจัดสรรแล้ว', 'success')
    }, (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'แก้ไขข้อมูลไม่สำเร็จ',
        text: 'มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้ง',
      })
    });
  }

  deleteBudget(id: string) {
    console.log(id);
    this.http.delete(API_URL + '/' + id).subscribe(data => {
      this.getAllDataBudget();
      console.log('Delete Successful !');
      window.alert('Deleted !')
    }, (error) => {
      console.log(error);
    });
  }
}

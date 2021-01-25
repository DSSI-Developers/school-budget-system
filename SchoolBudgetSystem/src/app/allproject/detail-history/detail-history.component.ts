import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'app/services/users.service';

export interface PeriodicElement {
  name: string;
  position: number;
  unit: number;
  budget: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'อุปกรณ์ต่อพ่วงสาย VGA', unit: 1, budget: '200'},
  {position: 2, name: 'อุปกรณ์ต่อพ่วงสาย HDMI', unit: 2, budget: '300'},
  {position: 3, name: 'Microsoft Windown เเท้ ยำ้ว่าเเท้ 100%', unit: 1, budget: '10000'},
  {position: 4, name: 'Adobe เเท้ ยำว่าเเท้ 100%', unit: 1, budget: '5000'},
];

@Component({
  selector: 'app-detail-history',
  templateUrl: './detail-history.component.html',
  styleUrls: ['./detail-history.component.css']
})
export class DetailHistoryComponent implements OnInit {
  detailTitle = 'ครุภัณฑ์เเละอุปกรณ์ต่อพ่วง โครงการ : DLIT';
  statusProject = 'สำเร็จ';
  statusColor = 'success';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  isLoading = false;
  private authStatusSub: Subscription;
  constructor(public router: Router, private userServices: UsersService) { }

  ngOnInit(): void {
    this.authStatusSub = this.userServices.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false
    });
  }

  exportPDF() {
    this.router.navigate(['/exportFile']);
  }

}

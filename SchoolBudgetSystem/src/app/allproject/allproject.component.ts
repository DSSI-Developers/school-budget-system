import { DetailHistoryComponent } from "./detail-history/detail-history.component";
import { Component, OnInit, Inject } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { UsersService } from "app/services/users.service";
import { Subscription } from "rxjs";
import { Equipments } from "models/equipments.model";
import { EquipmentsService } from "app/services/equipments.service";
import { data } from "jquery";


@Component({
  selector: "app-allproject",
  templateUrl: "./allproject.component.html",
  styleUrls: ["./allproject.component.css"],
})
export class AllprojectComponent implements OnInit {
  isLoading = false;
  private authStatusSub: Subscription;

  equipments: Equipments[] = [];
  private getEquipmentsData: Subscription;
  dataDetail;
  userId: string;
  history;
  constructor(
    public dialog: MatDialog,
    private userServices: UsersService,
    private equipmentServices: EquipmentsService
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.userServices
    .getAuthStatusListener()
    .subscribe((authStatus) => {
      this.isLoading = false;
    });

    // Get data totable
    this.userId = this.userServices.getUserId();
    this.equipmentServices.getAllEquipments();
    this.getEquipmentsData = this.equipmentServices
      .getEquipmentUpdateListener()
      .subscribe((objectData: Equipments[]) => {
        this.equipments = objectData;
        console.log('History : ', this.equipments);
        this.history = this.equipments.filter((data) => data.creator === this.userId)
        // console.log('Creator Id:', this.equipments.filter(data => data.creator === this.userId));
      });
  }

  openDialog(id: string) {
    this.dataDetail = this.equipments.filter((data) => data._id === id);
    const dialogRef = this.dialog.open(DetailHistoryComponent, {
      data: {
        detail: this.dataDetail,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderTitleService } from 'src/app/services/header-title/header-title.service';
import { FestivalService } from '../services/festival/festival.service';
import { UpdateFestivalComponent } from './dialogs/update/update-festival.component';
import {environment} from "../../environments/environment";
import { DeleteFestivalComponent } from './dialogs/delete/delete-festival.component';
import { NewFestivalComponent } from './dialogs/new/new-festival.component';
import { DatePipe } from '@angular/common';

export class FormFieldHintExample { }

@Component({
  selector: 'app-festival',
  templateUrl: './festival.component.html',
  styleUrls: ['./festival.component.css']
})
export class FestivalComponent implements OnInit {

  endpoint: string = environment.apiUrl;
  err: any;
  festivals: any;
  displayedColumns = ["id", "name", "description", "type", "dateStart", "dateEnd", "cancelled", "color", "user", "options"];
  oneFestival: any;
  newDialogRef?: MatDialogRef<NewFestivalComponent>;
  updateDialogRef?: MatDialogRef<UpdateFestivalComponent>;
  deleteDialogRef?: MatDialogRef<DeleteFestivalComponent>;
  isLoading = false;
  festivalLength?: number;

  constructor(
    private headerTitleService: HeaderTitleService,
    public festivalService: FestivalService,
    public dialog: MatDialog,
    public datePipe: DatePipe
  ) {

    this.headerTitleService.setTitle("Liste des festival");

    // Get all festivals
      this.festivalService.getAllFestivals().subscribe(
      data => { this.festivals = data },
      err => { console.log(err.status) }
    );
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  loadData() {

      this.festivalService.getAllFestivals().subscribe((res) => {
      this.isLoading = true;
      this.festivals = res;
      this.festivals = new MatTableDataSource(this.festivals);
      this.festivals.paginator = this.paginator;   
      this.festivalLength = this.festivals.data.length;
      this.isLoading = false;
    });

  }
  refreshTable() {
    this.paginator?._changePageSize(this.paginator?.pageSize);
  }

  // Open a dialog that processes the festival POST (new)
  newDialog(){
    this.newDialogRef = this.dialog.open(NewFestivalComponent, { disableClose: true });
    this.newDialogRef.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if ( result === 'none' ) {

        this.newDialogRef?.componentInstance.returnedFestival.subscribe(id => {

            this.festivalService.getOneFestival(id).subscribe( final => {

            this.newDialogRef?.componentInstance.closeDialog()
            this.newDialogRef?.afterClosed().subscribe( result => {

              this.festivals.data.push(final);
              this.festivalLength = this.festivals.data.length;
              this.refreshTable();
              this.isLoading = false;

            })
          })
        })
      }
    })
  }
  // Open a dialog that processes the organisme PUT
  updateDialog(id: number, name: string, description: string, type: string, image: string, dateStart: string, dateEnd: string, cancelled: boolean, color:string) {
    this.oneFestival = [id, name, description, type, image, dateStart, dateEnd, cancelled, color]
    this.updateDialogRef = this.dialog.open(UpdateFestivalComponent, {
      data: {
        id: id,
        name: name,
        description: description,
        type: type,
        image: image,
        dateStart: dateStart,
        dateEnd: dateEnd,
        cancelled: cancelled,
        color: color,
      }, disableClose: true
    })
    this.updateDialogRef?.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if (result === 'none'){
          this.festivalService.getOneFestival(id).subscribe(
          returnedFestival => {
            this.updateDialogRef?.componentInstance.closeDialog()
            this.updateDialogRef?.afterClosed().subscribe( result => {
              const foundIndex = this.festivals.data.findIndex((x: { id: any; }) => x.id === id);
              this.festivals.data[foundIndex] = returnedFestival;
              this.refreshTable();
              this.isLoading = false;
            });
          },
          err => { console.log(err) }
        );
      }
    })
  }

  // Open a dialog that processes the festival DELETE
  deleteDialog(id: number, name: string) {
    this.oneFestival = [id, name];
    this.deleteDialogRef = this.dialog.open(DeleteFestivalComponent, {
      data: {
        id: id,
        name: name
      }
    })
    this.deleteDialogRef?.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if (result === 'none') {
        this.deleteDialogRef?.componentInstance.closeDialog()
        this.deleteDialogRef?.afterClosed().subscribe(result => {
          const foundIndex = this.festivals.data.findIndex((x: { id: any; }) => x.id === id);
          this.festivals.data.splice(foundIndex, 1);
          this.festivalLength = this.festivals.data.length;
          this.refreshTable();
          this.isLoading = false;
        });
      }
    })
  }



  ngOnInit(): void {
    this.loadData()
  }



}

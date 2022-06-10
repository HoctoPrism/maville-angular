import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderTitleService } from 'src/app/services/header-title/header-title.service';
import {environment} from "../../environments/environment";
import {NewPlaceComponent} from "./dialogs/new/new-place.component";
import {UpdatePlaceComponent} from "./dialogs/update/update-place.component";
import {DeletePlaceComponent} from "./dialogs/delete/delete-place.component";
import { PlaceService } from '../services/place/tag.service';

export class FormFieldHintExample { }

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  endpoint: string = environment.apiUrl;
  err: any;
  places: any;
  displayedColumns = ["id", "name", "lat", "lng", "options"];
  onePlace: any;
  newDialogRef?: MatDialogRef<NewPlaceComponent>;
  updateDialogRef?: MatDialogRef<UpdatePlaceComponent>;
  deleteDialogRef?: MatDialogRef<DeletePlaceComponent>;
  isLoading = false;
  placeLength?: number;

  constructor(
    private headerTitleService: HeaderTitleService,
    public placeService: PlaceService,
    public dialog: MatDialog,
  ) {

    this.headerTitleService.setTitle("Liste des lieux");

    // Get all places
    this.placeService.getAllPlaces().subscribe(
      data => { this.places = data },
      err => { console.log(err.status) }
    );
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  loadData() {

    this.placeService.getAllPlaces().subscribe((res) => {
      this.isLoading = true;
      this.places = res;
      this.places = new MatTableDataSource(this.places);
      this.places.paginator = this.paginator;
      this.placeLength = this.places.data.length;
      this.isLoading = false;
    });

  }
  refreshTable() {
    this.paginator?._changePageSize(this.paginator?.pageSize);
  }

  // Open a dialog that processes the place POST (new)
  newDialog(){
    this.newDialogRef = this.dialog.open(NewPlaceComponent, { disableClose: true });
    this.newDialogRef.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if ( result === 'none' ) {

        this.newDialogRef?.componentInstance.returnedPlace.subscribe(id => {

          this.placeService.getOnePlace(id).subscribe( final => {

            this.newDialogRef?.componentInstance.closeDialog()
            this.newDialogRef?.afterClosed().subscribe( result => {

              this.places.data.push(final);
              this.placeLength = this.places.data.length;
              this.refreshTable();
              this.isLoading = false;

            })
          })
        })
      }
    })
  }
  // Open a dialog that processes the place PUT
  updateDialog(id: number, name: string, lat: string, lng: string) {
    this.onePlace = [id, name, lat, lng]
    this.updateDialogRef = this.dialog.open(UpdatePlaceComponent, {
      data: {
        id: id,
        name: name,
        lat: lat,
        lng: lng
      }, disableClose: true
    })
    this.updateDialogRef?.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if (result === 'none'){
        this.placeService.getOnePlace(id).subscribe(
          returnedPlace => {
            this.updateDialogRef?.componentInstance.closeDialog()
            this.updateDialogRef?.afterClosed().subscribe( result => {
              const foundIndex = this.places.data.findIndex((x: { id: any; }) => x.id === id);
              this.places.data[foundIndex] = returnedPlace;
              this.refreshTable();
              this.isLoading = false;
            });
          },
          err => { console.log(err) }
        );
      }
    })
  }

  // Open a dialog that processes the place DELETE
  deleteDialog(id: number, name: string) {
    this.onePlace = [id, name];
    this.deleteDialogRef = this.dialog.open(DeletePlaceComponent, {
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
          const foundIndex = this.places.data.findIndex((x: { id: any; }) => x.id === id);
          this.places.data.splice(foundIndex, 1);
          this.placeLength = this.places.data.length;
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

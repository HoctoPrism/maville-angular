import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PlaceService} from "../../../services/place/tag.service";

@Component({
  selector: 'app-delete-place',
  templateUrl: './delete-place.component.html',
  styleUrls: ['./delete-place.component.css']
})
export class DeletePlaceComponent implements OnInit {

  @Output() errorSend = new EventEmitter<any>();
  onePlace:any;
  isLoading?:boolean;

  constructor(public userService:PlaceService,
    @Inject (MAT_DIALOG_DATA)  public data: any,
    private _snackBar: MatSnackBar ,
    public dialogRef: MatDialogRef<DeletePlaceComponent>,) { }

    // Delete an place
  deletePlace(id:number){
    this.isLoading = true;
   this.userService.deletePlace(id).subscribe(
      data => {
        this.errorSend.emit('none'); // To send 'none' to parent
        this._snackBar.open("Vous avez supprimé un lieu !", 'fermer', {duration : 5000});
      },
      err => {
        this.isLoading = false;
        this.errorSend.emit(err); // To send the error object to parent
        console.log(err.status);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.onePlace = this.data;
    this.isLoading = false;
  }

}

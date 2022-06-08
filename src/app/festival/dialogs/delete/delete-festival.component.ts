import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FestivalService } from 'src/app/services/festival/festival.service';

@Component({
  selector: 'app-delete-festival',
  templateUrl: './delete-festival.component.html',
  styleUrls: ['./delete-festival.component.css']
})
export class DeleteFestivalComponent implements OnInit {

  @Output() errorSend = new EventEmitter<any>();
  oneFestival:any;
  isLoading?:boolean;

  constructor(public festivalService:FestivalService, 
    @Inject (MAT_DIALOG_DATA)  public data: any,
    private _snackBar: MatSnackBar ,
    public dialogRef: MatDialogRef<DeleteFestivalComponent>,) { }

    // Delete an festival
  deleteFestival(id:number){
    this.isLoading = true;
   this.festivalService.deleteFestival(id).subscribe(
      data => { 
        this.errorSend.emit('none'); // To send 'none' to parent
        this._snackBar.open("Vous avez supprimé un festival !", 'fermer', {duration : 5000});
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
    this.oneFestival = this.data;
    this.isLoading = false;
  }

}
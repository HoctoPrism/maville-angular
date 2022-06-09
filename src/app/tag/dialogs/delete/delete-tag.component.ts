import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-delete-tag',
  templateUrl: './delete-tag.component.html',
  styleUrls: ['./delete-tag.component.css']
})
export class DeleteTagComponent implements OnInit {

  @Output() errorSend = new EventEmitter<any>();
  oneTag:any;
  isLoading?:boolean;

  constructor(public tagService:TagService, 
    @Inject (MAT_DIALOG_DATA)  public data: any,
    private _snackBar: MatSnackBar ,
    public dialogRef: MatDialogRef<DeleteTagComponent>,) { }

    // Delete an tag
  deleteTag(id:number){
    this.isLoading = true;
   this.tagService.deleteTag(id).subscribe(
      data => { 
        this.errorSend.emit('none'); // To send 'none' to parent
        this._snackBar.open("Vous avez supprimé un tag !", 'fermer', {duration : 5000});
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
    this.oneTag = this.data;
    this.isLoading = false;
  }

}
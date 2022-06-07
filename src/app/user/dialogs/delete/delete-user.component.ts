import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Output() errorSend = new EventEmitter<any>();
  oneUser:any;
  isLoading?:boolean;

  constructor(public userService:UserService, 
    @Inject (MAT_DIALOG_DATA)  public data: any,
    private _snackBar: MatSnackBar ,
    public dialogRef: MatDialogRef<DeleteUserComponent>,) { }

    // Delete an user
  deleteUser(id:number){
    this.isLoading = true;
   this.userService.deleteUser(id).subscribe(
      data => { 
        this.errorSend.emit('none'); // To send 'none' to parent
        this._snackBar.open("Vous avez supprimé un utilisateur !", 'fermer', {duration : 5000});
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
    this.oneUser = this.data;
    this.isLoading = false;
  }

}
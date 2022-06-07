import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  @Output() errorSend = new EventEmitter<any>();
  updateUserForm: FormGroup;
  err:any;
  oneUser:any;
  isLoading?:boolean;
  
  constructor( public userService: UserService, 
    public router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject (MAT_DIALOG_DATA)  public data: any,
    public dialogRef: MatDialogRef<UpdateUserComponent>) { 
      this.updateUserForm = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', [Validators.required, Validators.email]],
        roles: ['']
      });

      this.updateUserForm.get('firstname')?.setValue(data.firstname);
      this.updateUserForm.get('lastname')?.setValue(data.lastname);
      this.updateUserForm.get('username')?.setValue(data.username);
      this.updateUserForm.get('roles')?.setValue(data.roles.toString())
    }

    closeDialog() {
      this.dialogRef.close();
    }

    UpdateUser(){
      this.isLoading = true;
      this.err = null; 
      this.userService.updateUser(this.updateUserForm.value, this.data['id']).subscribe(
        data => { 
          data = data,
          this.errorSend.emit('none'); // To send 'none' to parent
          this._snackBar.open("Vous avez mise à jour un user !", 'fermer', {duration : 5000})
        }, 
        err => { 
          this.isLoading = false;
          this.errorSend.emit(err); // To send the error object to parent
          this.err = err
         }
      );
    }

  ngOnInit(): void {
    this.isLoading = false;
  }

}

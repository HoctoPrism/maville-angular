import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  @Output() returnedUser = new EventEmitter<any>();
  @Output() errorSend = new EventEmitter<any>();
  newUserForm: FormGroup;
  endpoint: string = environment.apiUrl;
  err: any;
  isLoading?:boolean;

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    public userService: UserService,
    public dialogRef: MatDialogRef<NewUserComponent>) {

    this.newUserForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      roles: ['', Validators.required]
    });

  }
  ngOnInit(): void {
    this.isLoading = false;
  }
  closeDialog() {
    this.dialogRef.close();
  }

  // Get and set the value for color (based on "hex" value), POST the new organisme via the API
  newUser() {
    this.isLoading = true;
    this.err = null;
    this.userService.newUser(this.newUserForm.value).subscribe(
      data => {
        this.errorSend.emit('none'); // To send 'none' to parent
        this.returnedUser.emit(data.data[0].id); // to send the id to parent
        this._snackBar.open("Vous avez créé un utilisateur !", 'fermer', { duration: 5000 });
      },
      err => {
        this.isLoading = false;
        this.errorSend.emit(err); // To send the error object to parent
        console.log(err);
        
        this.err = err // to send the error object to the template
      }
    );
  }

}

import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.css']
})
export class ModifyPasswordComponent implements OnInit {

  @Output() errorSend = new EventEmitter<any>();
  modifyPassForm: FormGroup;
  err:any;
  oneUser:any;
  minlength:number = 8;
  minuscule:string = '(?=.*[a-z])'; // allow to test lowercase
  majuscule:string = '(?=.*[A-Z])'; // allow to test uppercase
  number:string = '(?=.*[0-9])'; // allow to test number
  special:string = '(?=.*[!@#:$%^&])'; // allow to test special character
  hide = true;

  constructor(
    public userService: UserService,
    public router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject (MAT_DIALOG_DATA)  public data: any,
    public dialogRef: MatDialogRef<ModifyPasswordComponent>
    ) {
      this.modifyPassForm = this.fb.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', [ Validators.required, Validators.minLength(this.minlength), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&]).{8,}')] ],
        confirmPassword: ['', Validators.required]
      });

    }

    closeDialog() {
      this.dialogRef.close();
    }

    onRegex(value:string){ // get in param, the value of "newPassword"
      // test if the value of newPassword does not contain a lowercase
      if (value.match(this.minuscule)) {
        document.getElementById('min')!.style.backgroundColor = "#4F9747"; // if yes, bg green
      } else {
        document.getElementById('min')!.style.backgroundColor = "#ce0033"; // if not, bg red
      }
      // test if the value of newPassword does not contain a uppercase
      if (value.match(this.majuscule)) {
        document.getElementById('maj')!.style.backgroundColor = "#4F9747"; // if yes, bg green
      } else {
        document.getElementById('maj')!.style.backgroundColor = "#ce0033"; // if not, bg red
      }
      // test if the value of newPassword does not contain a number
      if (value.match(this.number)) {
        document.getElementById('num')!.style.backgroundColor = "#4F9747"; // if yes, bg green
      } else {
        document.getElementById('num')!.style.backgroundColor = "#ce0033"; // if not, bg red
      }
      // test if the value of newPassword does not contain a special character
      if (value.match(this.special)) {
        document.getElementById('spec')!.style.backgroundColor = "#4F9747"; // if yes, bg green
      } else {
        document.getElementById('spec')!.style.backgroundColor = "#ce0033"; // if not, bg red
      }
    }

    modifyPassword(){
      this.err = null;
      this.userService.modifyPassword(this.data.id, this.modifyPassForm.value).subscribe(
        data => {
          data = data,
          this.errorSend.emit('none'); // To send 'none' to parent
          this._snackBar.open("Vous avez mise à jour votre mot de passe !", 'fermer', {duration : 5000})
        },
        err => {
          this.errorSend.emit(err); // To send the error object to parent
          this.err = err
         }
      );
    }



  ngOnInit(): void {
  }

}

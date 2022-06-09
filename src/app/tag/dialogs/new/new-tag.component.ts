import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TagService } from 'src/app/services/tag/tag.service';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-new-tag',
  templateUrl: './new-tag.component.html',
  styleUrls: ['./new-tag.component.css']
})
export class NewTagComponent implements OnInit {

  @Output() returnedTag = new EventEmitter<any>();
  @Output() errorSend = new EventEmitter<any>();
  newTagForm: FormGroup;
  endpoint: string = environment.apiUrl;
  err: any;
  isLoading?:boolean;

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    public tagService: TagService,
    public dialogRef: MatDialogRef<NewTagComponent>) {

    this.newTagForm = this.fb.group({
      name: ['', Validators.required],
    });

  }
  ngOnInit(): void {
    this.isLoading = false;
  }
  closeDialog() {
    this.dialogRef.close();
  }

  newTag() {
    this.isLoading = true;
    this.err = null;
    this.tagService.newTag(this.newTagForm.value).subscribe(
      data => {
        this.errorSend.emit('none'); // To send 'none' to parent
        this.returnedTag.emit(data.data[0].id); // to send the id to parent
        this._snackBar.open("Vous avez créé un tag !", 'fermer', { duration: 5000 });
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

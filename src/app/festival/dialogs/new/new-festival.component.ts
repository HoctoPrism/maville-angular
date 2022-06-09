import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FestivalService } from 'src/app/services/festival/festival.service';
import { TagService } from 'src/app/services/tag/tag.service';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-new-festival',
  templateUrl: './new-festival.component.html',
  styleUrls: ['./new-festival.component.css']
})
export class NewFestivalComponent implements OnInit {

  @Output() returnedFestival = new EventEmitter<any>();
  @Output() errorSend = new EventEmitter<any>();
  newFestivalForm: FormGroup;
  endpoint: string = environment.apiUrl;
  err: any;
  isLoading?:boolean;
  tagList:any;

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    public festivalService: FestivalService,
    public tagService: TagService, 
    public dialogRef: MatDialogRef<NewFestivalComponent>) {

    this.newFestivalForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      type: [''],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      cancelled: [''],
      color:['', Validators.required],
      tag:['']
    });

    this.tagService.getAllTags().subscribe(
      data => { this.tagList = data },
      err => { console.log(err)
    });
  }
  ngOnInit(): void {
    this.isLoading = false;
  }
  closeDialog() {
    this.dialogRef.close();
  }

  newFestival() {
    this.isLoading = true;
    this.err = null;
    this.festivalService.newFestival(this.newFestivalForm.value).subscribe(
      data => {
        this.errorSend.emit('none'); // To send 'none' to parent
        this.returnedFestival.emit(data.data[0].id); // to send the id to parent
        this._snackBar.open("Vous avez créé un festival !", 'fermer', { duration: 5000 });
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

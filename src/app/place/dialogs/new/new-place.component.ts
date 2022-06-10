import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import {environment} from "../../../../environments/environment";
import {PlaceService} from "../../../services/place/tag.service";

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.css']
})
export class NewPlaceComponent implements OnInit {

  @Output() returnedPlace = new EventEmitter<any>();
  @Output() errorSend = new EventEmitter<any>();
  newPlaceForm: FormGroup;
  endpoint: string = environment.apiUrl;
  err: any;
  isLoading?:boolean;

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    public userService: PlaceService,
    public dialogRef: MatDialogRef<NewPlaceComponent>) {

    this.newPlaceForm = this.fb.group({
      name: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.isLoading = false;
  }
  closeDialog() {
    this.dialogRef.close();
  }

  // Get and set the value for color (based on "hex" value), POST the new place via the API
  newPlace() {
    this.isLoading = true;
    this.err = null;
    this.userService.newPlace(this.newPlaceForm.value).subscribe(
      data => {
        this.errorSend.emit('none'); // To send 'none' to parent
        this.returnedPlace.emit(data.data[0].id); // to send the id to parent
        this._snackBar.open("Vous avez créé un lieu !", 'fermer', { duration: 5000 });
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

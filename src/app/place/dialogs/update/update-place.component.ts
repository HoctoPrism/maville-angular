import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {PlaceService} from "../../../services/place/tag.service";

@Component({
  selector: 'app-update-place',
  templateUrl: './update-place.component.html',
  styleUrls: ['./update-place.component.css']
})
export class UpdatePlaceComponent implements OnInit {
  @Output() errorSend = new EventEmitter<any>();
  updatePlaceForm: FormGroup;
  err:any;
  onePlace:any;
  isLoading?:boolean;

  constructor( public userService: PlaceService,
    public router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject (MAT_DIALOG_DATA)  public data: any,
    public dialogRef: MatDialogRef<UpdatePlaceComponent>) {
      this.updatePlaceForm = this.fb.group({
        name: ['', Validators.required],
        lat: ['', Validators.required],
        lng: ['', [Validators.required]],
      });

      this.updatePlaceForm.get('name')?.setValue(data.name);
      this.updatePlaceForm.get('lat')?.setValue(data.lat);
      this.updatePlaceForm.get('lng')?.setValue(data.lng);
    }

    closeDialog() {
      this.dialogRef.close();
    }

    UpdatePlace(){
      this.isLoading = true;
      this.err = null;
      this.userService.updatePlace(this.updatePlaceForm.value, this.data['id']).subscribe(
        data => {
          data = data,
          this.errorSend.emit('none'); // To send 'none' to parent
          this._snackBar.open("Vous avez mise à jour un place !", 'fermer', {duration : 5000})
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

import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FestivalService } from 'src/app/services/festival/festival.service';

@Component({
  selector: 'app-update-festival',
  templateUrl: './update-festival.component.html',
  styleUrls: ['./update-festival.component.css']
})
export class UpdateFestivalComponent implements OnInit {
  @Output() errorSend = new EventEmitter<any>();
  updateFestivalForm: FormGroup;
  err:any;
  oneFestival:any;
  isLoading?:boolean;
  
  constructor( public festivalService: FestivalService, 
    public router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject (MAT_DIALOG_DATA)  public data: any,
    public dialogRef: MatDialogRef<UpdateFestivalComponent>) { 
      this.updateFestivalForm = this.fb.group({
        name: ['', Validators.required],
        description: [''],
        type: [''],
        image: [''],
        dateStart: ['', Validators.required],
        dateEnd: ['', Validators.required],
        cancelled: [''],
        color: ['']
      });

      this.updateFestivalForm.get('name')?.setValue(data.name);
      this.updateFestivalForm.get('description')?.setValue(data.description);
      this.updateFestivalForm.get('type')?.setValue(data.type);
      this.updateFestivalForm.get('image')?.setValue(data.image);
      this.updateFestivalForm.get('dateStart')?.setValue(data.dateStart);
      this.updateFestivalForm.get('dateEnd')?.setValue(data.dateEnd);
      this.updateFestivalForm.get('cancelled')?.setValue(data.cancelled);
      this.updateFestivalForm.get('color')?.setValue(data.color);
    }

    closeDialog() {
      this.dialogRef.close();
    }

    UpdateFestival(){
      this.isLoading = true;
      this.err = null; 
      this.festivalService.updateFestival(this.updateFestivalForm.value, this.data['id']).subscribe(
        data => { 
          data = data,
          this.errorSend.emit('none'); // To send 'none' to parent
          this._snackBar.open("Vous avez mise à jour un festival !", 'fermer', {duration : 5000})
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

import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-update-tag',
  templateUrl: './update-tag.component.html',
  styleUrls: ['./update-tag.component.css']
})
export class UpdateTagComponent implements OnInit {
  @Output() errorSend = new EventEmitter<any>();
  updateTagForm: FormGroup;
  err:any;
  oneTag:any;
  isLoading?:boolean;
  
  constructor( public tagService: TagService, 
    public router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject (MAT_DIALOG_DATA)  public data: any,
    public dialogRef: MatDialogRef<UpdateTagComponent>) { 
      this.updateTagForm = this.fb.group({
        name: ['', Validators.required],
      });

      this.updateTagForm.get('name')?.setValue(data.name);
    }

    closeDialog() {
      this.dialogRef.close();
    }

    UpdateTag(){
      this.isLoading = true;
      this.err = null; 
      this.tagService.updateTag(this.updateTagForm.value, this.data['id']).subscribe(
        data => { 
          data = data,
          this.errorSend.emit('none'); // To send 'none' to parent
          this._snackBar.open("Vous avez mise à jour un tag !", 'fermer', {duration : 5000})
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

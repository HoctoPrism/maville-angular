import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderTitleService } from 'src/app/services/header-title/header-title.service';
import {environment} from "../../environments/environment";
import { DatePipe } from '@angular/common';
import { NewTagComponent } from './dialogs/new/new-tag.component';
import { UpdateTagComponent } from './dialogs/update/update-tag.component';
import { DeleteTagComponent } from './dialogs/delete/delete-tag.component';
import { TagService } from '../services/tag/tag.service';

export class FormFieldHintExample { }

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  endpoint: string = environment.apiUrl;
  err: any;
  tags: any;
  displayedColumns = ["id", "name", "options"];
  oneTag: any;
  newDialogRef?: MatDialogRef<NewTagComponent>;
  updateDialogRef?: MatDialogRef<UpdateTagComponent>;
  deleteDialogRef?: MatDialogRef<DeleteTagComponent>;
  isLoading = false;
  tagLength?: number;

  constructor(
    private headerTitleService: HeaderTitleService,
    public tagService: TagService,
    public dialog: MatDialog,
    public datePipe: DatePipe
  ) {

    this.headerTitleService.setTitle("Liste des tag");

    // Get all tags
      this.tagService.getAllTags().subscribe(
      data => { this.tags = data },
      err => { console.log(err.status) }
    );
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  loadData() {

      this.tagService.getAllTags().subscribe((res) => {
      this.isLoading = true;
      this.tags = res;
      this.tags = new MatTableDataSource(this.tags);
      this.tags.paginator = this.paginator;   
      this.tagLength = this.tags.data.length;
      this.isLoading = false;
    });

  }
  refreshTable() {
    this.paginator?._changePageSize(this.paginator?.pageSize);
  }

  // Open a dialog that processes the tag POST (new)
  newDialog(){
    this.newDialogRef = this.dialog.open(NewTagComponent, { disableClose: true });
    this.newDialogRef.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if ( result === 'none' ) {

        this.newDialogRef?.componentInstance.returnedTag.subscribe(id => {

            this.tagService.getOneTag(id).subscribe( final => {

            this.newDialogRef?.componentInstance.closeDialog()
            this.newDialogRef?.afterClosed().subscribe( result => {

              this.tags.data.push(final);
              this.tagLength = this.tags.data.length;
              this.refreshTable();
              this.isLoading = false;

            })
          })
        })
      }
    })
  }
  // Open a dialog that processes the organisme PUT
  updateDialog(id: number, name: string) {
    this.oneTag = [id, name]
    this.updateDialogRef = this.dialog.open(UpdateTagComponent, {
      data: {
        id: id,
        name: name
      }, disableClose: true
    })
    this.updateDialogRef?.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if (result === 'none'){
          this.tagService.getOneTag(id).subscribe(
          returnedTag => {
            this.updateDialogRef?.componentInstance.closeDialog()
            this.updateDialogRef?.afterClosed().subscribe( result => {
              const foundIndex = this.tags.data.findIndex((x: { id: any; }) => x.id === id);
              this.tags.data[foundIndex] = returnedTag;
              this.refreshTable();
              this.isLoading = false;
            });
          },
          err => { console.log(err) }
        );
      }
    })
  }

  // Open a dialog that processes the tag DELETE
  deleteDialog(id: number, name: string) {
    this.oneTag = [id, name];
    this.deleteDialogRef = this.dialog.open(DeleteTagComponent, {
      data: {
        id: id,
        name: name
      }
    })
    this.deleteDialogRef?.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if (result === 'none') {
        this.deleteDialogRef?.componentInstance.closeDialog()
        this.deleteDialogRef?.afterClosed().subscribe(result => {
          const foundIndex = this.tags.data.findIndex((x: { id: any; }) => x.id === id);
          this.tags.data.splice(foundIndex, 1);
          this.tagLength = this.tags.data.length;
          this.refreshTable();
          this.isLoading = false;
        });
      }
    })
  }



  ngOnInit(): void {
    this.loadData()
  }



}

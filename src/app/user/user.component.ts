import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderTitleService } from 'src/app/services/header-title/header-title.service';
import { UserService } from '../services/user/user.service';
import { DeleteUserComponent } from './dialogs/delete/delete-user.component';
import { NewUserComponent } from './dialogs/new/new-user.component';
import { UpdateUserComponent } from './dialogs/update/update-user.component';
import {environment} from "../../environments/environment";

export class FormFieldHintExample { }

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  endpoint: string = environment.apiUrl;
  err: any;
  users: any;
  displayedColumns = ["id", "lastname", "firstname", "username", "roles", "options"];
  oneUser: any;
  newDialogRef?: MatDialogRef<NewUserComponent>;
  updateDialogRef?: MatDialogRef<UpdateUserComponent>;
  deleteDialogRef?: MatDialogRef<DeleteUserComponent>;
  isLoading = false;
  userLength?: number;

  constructor(
    private headerTitleService: HeaderTitleService,
    public userService: UserService,
    public dialog: MatDialog,
  ) {

    this.headerTitleService.setTitle("Liste des utilisateurs");

    // Get all users
    this.userService.getAllUsers().subscribe(
      data => { this.users = data },
      err => { console.log(err.status) }
    );
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  loadData() {

    this.userService.getAllUsers().subscribe((res) => {
      this.isLoading = true;
      this.users = res;
      this.users = new MatTableDataSource(this.users);
      this.users.paginator = this.paginator;
      this.userLength = this.users.data.length;
      this.isLoading = false;
    });

  }
  refreshTable() {
    this.paginator?._changePageSize(this.paginator?.pageSize);
  }

  // Open a dialog that processes the user POST (new)
  newDialog(){
    this.newDialogRef = this.dialog.open(NewUserComponent, { disableClose: true });
    this.newDialogRef.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if ( result === 'none' ) {

        this.newDialogRef?.componentInstance.returnedUser.subscribe(id => {

          this.userService.getOneUser(id).subscribe( final => {

            this.newDialogRef?.componentInstance.closeDialog()
            this.newDialogRef?.afterClosed().subscribe( result => {

              this.users.data.push(final);
              this.userLength = this.users.data.length;
              this.refreshTable();
              this.isLoading = false;

            })
          })
        })
      }
    })
  }
  // Open a dialog that processes the organisme PUT
  updateDialog(id: number, firstname: string, lastname: string, username: string, roles: any) {
    this.oneUser = [id, firstname, lastname, username, roles]
    this.updateDialogRef = this.dialog.open(UpdateUserComponent, {
      data: {
        id: id,
        firstname: firstname,
        lastname: lastname,
        username: username,
        roles: roles
      }, disableClose: true
    })
    this.updateDialogRef?.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if (result === 'none'){
        this.userService.getOneUser(id).subscribe(
          returnedUser => {
            this.updateDialogRef?.componentInstance.closeDialog()
            this.updateDialogRef?.afterClosed().subscribe( result => {
              const foundIndex = this.users.data.findIndex((x: { id: any; }) => x.id === id);
              this.users.data[foundIndex] = returnedUser;
              this.refreshTable();
              this.isLoading = false;
            });
          },
          err => { console.log(err) }
        );
      }
    })
  }

  // Open a dialog that processes the user DELETE
  deleteDialog(id: number, username: string) {
    this.oneUser = [id, username];
    this.deleteDialogRef = this.dialog.open(DeleteUserComponent, {
      data: {
        id: id,
        username: username
      }
    })
    this.deleteDialogRef?.componentInstance.errorSend.subscribe(result => {
      this.isLoading = true;
      if (result === 'none') {
        this.deleteDialogRef?.componentInstance.closeDialog()
        this.deleteDialogRef?.afterClosed().subscribe(result => {
          const foundIndex = this.users.data.findIndex((x: { id: any; }) => x.id === id);
          this.users.data.splice(foundIndex, 1);
          this.userLength = this.users.data.length;
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

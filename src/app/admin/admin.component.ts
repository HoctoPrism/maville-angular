import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../services/header-title/header-title.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService) {
    this.headerTitleService.setTitle("Admin")
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../services/header-title/header-title.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService) {
    this.headerTitleService.setTitle("Accueil")
  }

  ngOnInit(): void {
  }

}

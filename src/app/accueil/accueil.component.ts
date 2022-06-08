import { Component, OnInit } from '@angular/core';
import { sample } from 'rxjs/internal/operators/sample';
import { FestivalService } from '../services/festival/festival.service';
import { HeaderTitleService } from '../services/header-title/header-title.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  festivals:any = [];
  isLoading = false;
  colors = ['#63cf72', '#63bdcf', '#b763cf', '#cfce63', '#cf9163', '#8ccf63', '#cf6363'];
  colorsTab = [];

  constructor(
    private headerTitleService: HeaderTitleService,
    private festivalService: FestivalService
  ) {
    this.headerTitleService.setTitle("Accueil")
  }

  loadData() {
    this.festivalService.getAllFestivals().subscribe((res) => {
      this.isLoading = true;
      this.festivals = res;
      // défini comme clé l'id d'un festival et pioche dans le tableau de couleur de manière random
      this.colorsTab = this.festivals.map((value: any) => ({['color'+value.id]: this.colors[Math.floor(Math.random() * this.colors.length)]}))
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.loadData()
  }

}

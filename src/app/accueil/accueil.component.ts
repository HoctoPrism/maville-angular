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
      this.isLoading = false;
      console.log(this.festivals[0]);
      
    });
  }

  myStyle(color:string){
    let styles = {
      'background':'linear-gradient(145deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.7) 35%,' + color + ' 100%), url("./assets/img/image.jpg")',
      'background-repeat':'no-repeat',
      'background-size': '6px, auto, contain'
    };
    return styles;
  }

  myStyleColor(color:string){
    let styles = {
      'color': color,
      'font-weight': 'bold'
    };
    return styles;
  }

  ngOnInit(): void {
    this.loadData()
  }

}

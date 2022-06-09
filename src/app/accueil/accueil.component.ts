import { Component, OnInit } from '@angular/core';
import { sample } from 'rxjs/internal/operators/sample';
import { FestivalService } from '../services/festival/festival.service';
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { MapService } from '../services/map/map.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  festivals:any = [];
  places:any = [];
  isLoading = false;

  constructor(
    private headerTitleService: HeaderTitleService,
    private festivalService: FestivalService,
    private mapService: MapService
  ) {
    this.headerTitleService.setTitle("Accueil")
  }

  loadData() {
    this.festivalService.getAllFestivals().subscribe((res) => {
      this.isLoading = true;
      this.festivals = res;
      this.isLoading = false;
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

  ngAfterViewInit(): void {
      this.mapService.getAllPlaces().subscribe((res) => {
      this.places = res;
      this.isLoading = true;
      this.mapService.initMap();
      res.forEach((element: { name: string; lat: string; lng:string; }) => {
        this.mapService.setData(element.name, element.lat, element.lng)
      });
      this.isLoading = false;
    });
  }

}

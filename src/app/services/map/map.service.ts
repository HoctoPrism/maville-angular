import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/img/map-marker.svg';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  iconSize: [25, 37],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault;


@Injectable({
  providedIn: 'root'
})
export class MapService {

    endpoint: string = environment.apiUrl;
    geojsonFeature: any;

    constructor(private http: HttpClient) {
    }

    // Get all places
    getAllPlaces(): Observable<any> {
        return this.http.get<any>(`${this.endpoint}/places.json`).pipe(
            catchError(this.handleError)
        )
    }

    map:any;
    initMap(): void {
      this.map = L.map('map', {
            center: [ 45.042768, 3.882936 ],
            zoom: 15
        });
        const tiles = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        tiles.addTo(this.map);
    }

    setData(name: string, lat:string, lng:string): void {
        this.geojsonFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [lng, lat]
            },
            "properties": {
                "name": name
            }
        };
        L.geoJSON(this.geojsonFeature).addTo(this.map).bindPopup(name);
    }


    // Error
    handleError(error: HttpErrorResponse) {
        let msg = "";
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = error.error;
        }
        return throwError(msg);
    }
}

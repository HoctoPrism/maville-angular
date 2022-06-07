import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, concat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleService {

  constructor(private titleService: Title) { }

  pre = 'Ma Ville - ';
  title = new BehaviorSubject('Ma Ville - ');

  // Set the title which can be called in the HEAD and in the page
  setTitle(title: string) {
    this.title.next(this.pre.concat(title));
    this.titleService.setTitle(this.pre.concat(title))
  }
}

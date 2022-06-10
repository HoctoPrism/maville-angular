import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeModeService {

  checked:any;

  constructor() { }

  // Put 'isDark' in the localstorage if the theme is set to dark, if not, remove it
  onSwitch(){
    let theme:any = document.getElementById('darkMode-input');
    if(theme.getAttribute('aria-checked') == 'true'){
      localStorage.removeItem('isDark');
      theme.setAttribute('aria-checked', 'false');
    } else {
      localStorage.setItem('isDark', "true");
      theme.setAttribute('aria-checked', "true");
    }
    this.themeSlideChecked();
  }

  // Allow to change the theme color depending of the mode, set the slide toggle to the correct position
  themeSlideChecked(){
    if (localStorage.getItem('isDark')) {
      this.checked = true;
      document.querySelector('body')?.classList.remove('mat-app-background-light', 'lightMode');
      document.querySelector('body')?.classList.add('mat-app-background-dark', 'darkMode');
    } else {
      this.checked = false
      document.querySelector('body')?.classList.remove('mat-app-background-dark', 'darkMode');
      document.querySelector('body')?.classList.add('mat-app-background-light', 'lightMode');
    }
  }

  // Get the value of checked, needed to position of the toggle
  getSlideChecked(){
    return this.checked
  }
}


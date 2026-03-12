import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  getLang(): string {
    return localStorage.getItem('lang') || 'it';
  }

  setLang(lang: string) {
    localStorage.setItem('lang', lang);
  }

}
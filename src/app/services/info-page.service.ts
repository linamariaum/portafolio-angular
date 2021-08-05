import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPage } from '../interfaces/info-page.interface';
import { InfoTeam } from '../interfaces/info-team.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {
  info: InfoPage = {};
  equipo: InfoTeam[] = []
  load = false;

  constructor( private http: HttpClient) {
    this.cargarInfoPrincipal();
    this.cargarEquipo();
  }

  private cargarInfoPrincipal() {
    //Leer archivo JSON
    this.http.get('assets/data/data-page.json')
      .subscribe( (result: InfoPage) => {
        this.load = true;
        this.info = result;
      });
  }

  private cargarEquipo() {
    this.http.get('https://portafolio-angular-aa8a8-default-rtdb.firebaseio.com/equipo.json')
      .subscribe(result => {
        let aux = <InfoTeam[]>result;
        this.equipo = aux;
      });
  }

}

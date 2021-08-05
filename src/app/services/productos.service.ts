import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoItem } from '../interfaces/info-item.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: InfoItem[] = [];
  cargando = true;

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://portafolio-angular-aa8a8-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( result => {
        this.productos = [];
        let aux = <InfoItem[]>result;
        this.productos = aux
        this.cargando = false;
        console.log(this.productos)
      });
  }
}

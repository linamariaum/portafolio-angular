import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoItem } from '../interfaces/info-item.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: InfoItem[] = [];
  cargando = true;
  productoFiltrado: InfoItem[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( (resolve, reject) => {
      this.http.get('https://portafolio-angular-aa8a8-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( result => {
        this.productos = [];
        let aux = <InfoItem[]>result;
        this.productos = aux
        this.cargando = false;
        resolve(true);
      });
    });    
  }

  public cargarProductoPorId(id: string) {
    return this.http.get(`https://portafolio-angular-aa8a8-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  public buscarProducto( termino: string ) {
    this.productoFiltrado = [];
    if ( this.productos.length === 0 ) {
      //Cargar productos
      this.cargarProductos().then( () => {
        this.filtrarProductos(termino);
      });
    } else {
      //Hacer filtro
      this.filtrarProductos(termino);      
    }    
  }

  private filtrarProductos( termino: string) {
    // this.productoFiltrado = this.productos.filter( producto => {
      //   return true;
      // });
    this.productos.forEach ( producto => {
      const tituloLower = producto.titulo.toLocaleLowerCase();
      if ( producto.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productoFiltrado.push( producto )
      }
    });
  }

}

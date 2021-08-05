import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DescrItem } from 'src/app/interfaces/desc-item.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  producto: DescrItem = {};
  id: string = "";

  constructor(private route: ActivatedRoute, public _infoItems: ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe( parametros => {
      this.id = parametros['id'];
      this._infoItems.cargarProductoPorId(this.id)
        .subscribe( producto => {
          this.producto = producto;
        });
    });
  }

}

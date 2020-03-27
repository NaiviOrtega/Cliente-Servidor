import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private ruta: Router ) { }

  private _nombre = "";

  public get nombre() {
    return this._nombre;
  }

  public set nombre(value) {
    this._nombre = value;
  }

  private _imagen = "";

  public get imagen() {
    return this._imagen;
  }

  public set imagen(value) {
    this._imagen = value;
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    if (AppComponent.inicio === true) {
      this.nombre = AppComponent.nombre;
    }
  }

  cerrarSesion() {
    localStorage.setItem('inicio', 'false');
    AppComponent.inicio = false;
    console.log(AppComponent.inicio);
    this.ruta.navigate(['login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor( private ruta: Router ) {
        this.ruta.events.subscribe( event => {
            if (event instanceof NavigationEnd) {
              if (event.url == '/login') {
                this.elemento = true;
              } else if (event.url == '/register') {
                this.elemento = true;
              } else {
                this.elemento = false;
              }
            }
          });

        if (localStorage.getItem('inicio') != null) {
            if (localStorage.getItem('inicio') === 'true') {
              AppComponent.inicio = true;
            } else {
              AppComponent.inicio = false;
            }
          }

        if (localStorage.getItem('nombre') != null) {
            AppComponent.nombre = localStorage.getItem('nombre');
        }

    }

    static get inicio(): boolean {
        return AppComponent._inicio;
    }

    static set inicio(value: boolean) {
        AppComponent._inicio = value;
    }

    private static _inicio: boolean = false;

    static get nombre(): string {
        return AppComponent._nombre;
    }

    static set nombre(value: string) {
        AppComponent._nombre = value;
    }

    private static _nombre: string = '';

    public elemento = false;

    inicio: boolean = AppComponent.inicio;

    ngOnInit(): void {

    }
}


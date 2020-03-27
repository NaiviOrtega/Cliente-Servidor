import { Component, OnInit, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../services/data.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  @ViewChild('error') public error2: ElementRef;

  nombreU: string;
  correoU: string;
  contraU: string;
  imagenU: string;

  constructor( private dataService: DataService, private ruta: Router ) { }

  ngOnInit(): void {
    console.log(AppComponent.inicio);
  }

  guardarUsuario() {
    let alU = document.getElementById('alertaGuardarU');
    alU.innerHTML = '';
    console.log(this.nombreU, this.correoU, this.contraU, this.imagenU);
    this.dataService.agregarUsuario(this.nombreU, this.correoU, this.contraU, this.imagenU)
    .subscribe((resultado) => {
      console.log(resultado);
      localStorage.setItem('nombre', this.nombreU);
      AppComponent.nombre = this.nombreU;
      this.nombreU = "";
      this.correoU = "";
      this.contraU = "";
      this.imagenU = "";
      localStorage.setItem('inicio', 'true');
      AppComponent.inicio = true;
      console.log(AppComponent.inicio);
      this.ruta.navigate(['dashboard']);
    }, (error) => {
        console.log(error);
        alU.innerHTML = alU.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>"+
                "<strong>" + error.error.mensajeErrorU +"</strong>" +
                "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+
                "</button>"+
                "</div>";
        });
  }
}

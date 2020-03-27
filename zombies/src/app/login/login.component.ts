import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombreU: string;
  contraU: string;

  constructor( private dataService: DataService, private ruta: Router ) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    let alU = document.getElementById('alertaGuardarU');
    alU.innerHTML = '';
    console.log(this.nombreU, this.contraU);
    this.dataService.iniciarSesion(this.nombreU, this.contraU)
    .subscribe((resultado) => {
      console.log(resultado);
      localStorage.setItem('nombre', this.nombreU);
      AppComponent.nombre = this.nombreU;
      this.nombreU = "";
      this.contraU = "";
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

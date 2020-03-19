import { Component, OnInit, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { CerebrosComponent } from 'src/app/cerebros/cerebros.component';

@Component({
  selector: 'modal-cerebros',
  templateUrl: './cerebrosmodals.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class CerebrosmodalsComponent implements OnInit {
    @ViewChild('modal') public modal: ElementRef;
    @ViewChild('error') public error2: ElementRef;

    sabor: string;
    descripcion: string;
    iq: number;
    imagen: string;
    ID: string;

    saborE: string;
    descripcionE: string;
    iqE: string;
    imagenE: string;
    IDE: string;

    cerebros: any;
    error: string;

    constructor( private dataService: DataService, private _renderer: Renderer2) { }

    ngOnInit(): void {
    }

    actualizarTabla() {
        this.dataService.cerebrosObservable
        .subscribe((resultadoC) => {
        this.cerebros = resultadoC;
        });

        this.dataService.obtenerCerebros();
    }

    guardarCerebro() {
        let al = document.getElementById('alertaGuardar');
        al.innerHTML = '';
        console.log(this.sabor, this.descripcion, this.iq, this.imagen);
        this.dataService.agregarCerebro(this.sabor, this.descripcion, this.iq, this.imagen)
        .subscribe((resultado) => {
        console.log(resultado);
        this._renderer.selectRootElement(this.modal.nativeElement, true).click();
        this.dataService.obtenerCerebros();
        this.sabor = '';
        this.descripcion = '';
        this.iq = 0;
        this.imagen = '';
        localStorage.removeItem('_id');
        }, (error) => {
            console.log(error);
            if (error.error.mensajeError != 0) {
                (error.error.mensajeError).forEach(function(mensajeError) {
                al.innerHTML = al.innerHTML + "<div class='alert alert-danger alert-dismissible fade show' role='alert'>"+
                "<strong>" + mensajeError.mensaje +"</strong>" +
                "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                    "<span aria-hidden='true'>&times;</span>"+
                "</button>"+
                "</div>";
                });
            }
        });
    }

    actualizarCerebros(ID) {
        console.log(ID);
        this.dataService.actualizarCerebro(ID)
        .subscribe((resultado: any) => console.log(resultado));
        this.actualizarTabla();
    }

    obtenerValor() {
        this.saborE = CerebrosComponent.sabor;
        this.descripcionE = CerebrosComponent.descripcion;
        this.iqE = CerebrosComponent.iq;
        this.imagenE = CerebrosComponent.imagen;
        this.IDE = CerebrosComponent.id;
        console.log(this.IDE);
    }

}

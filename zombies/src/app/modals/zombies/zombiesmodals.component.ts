import { Component, OnInit, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'modal-zombies',
    templateUrl: './zombiesmodals.component.html',
    styles: ['./zombies-modals.css'],
    encapsulation: ViewEncapsulation.None
})
export class ZombiesModalsComponent implements OnInit {
    @ViewChild('modal') public modal: ElementRef;
    @ViewChild('error') public error2: ElementRef;

    nombre: string;
    email: string;
    tipo: string;

    zombies: any;
    error: string;

    constructor(private dataService: DataService, private _renderer: Renderer2) { }

    ngOnInit(): void {
    }

    actualizarTabla() {
      this.dataService.zombiesObservable
      .subscribe((resultadoZ) => {
        this.zombies = resultadoZ;
      });

      this.dataService.obtenerZombies();
    }

    guardarZombie() {
        console.log(this.nombre, this.email, this.tipo);
        this.dataService.agregarZombie(this.nombre, this.email, this.tipo)
        .subscribe((resultado) => {
            console.log(resultado);
            this._renderer.selectRootElement(this.modal.nativeElement, true).click();
            this.dataService.obtenerZombies();
        }, (error) => {
            console.log(error);
        });
        this.actualizarTabla();
    }

}

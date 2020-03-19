import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-zombies',
    templateUrl: './zombies.component.html',
    styleUrls: ['./zombies.component.css']
})
export class ZombiesComponent implements OnInit {
    zombies: any;

    constructor(private _dataService: DataService) { }

    ngOnInit(): void {
        console.log('Actualizando tabla');
        this.actualizarTabla();
    }

    actualizarTabla() {
      this._dataService.zombiesObservable
      .subscribe((resultadoZ) => {
        this.zombies = resultadoZ;
      });

      this._dataService.obtenerZombies();
    }

    eliminarZombies(ID) {
      console.log(ID);
      this._dataService.eliminarZombie(ID)
      .subscribe((resultado) => console.log(resultado));
      this.actualizarTabla();
    }

}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InfoPagina } from "../interfaces/info-page.interfaces";

@Injectable({
  providedIn: "root"
})
export class InfoPageService {
  info: InfoPagina = {};
  cargada: boolean = false;

  equipo: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    console.log("Servicio Listo viejo");

    this.http
      .get("assets/data/data-pagina.json")
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo() {
    this.http
      .get("https://angular-html-ef905.firebaseio.com/equipo.json")
      .subscribe((resp: any[]) => {
        this.equipo = resp;
      });
  }
}

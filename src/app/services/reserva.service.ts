import { Injectable } from "@angular/core";
import { Reserva } from "../models/alojamiento";

// Guarda y consulta las reservas en el localStorage del navegador
@Injectable({ providedIn: "root" })
export class ReservaService {
  private clave = "marketplace_reservas";

  obtener(): Reserva[] {
    const datos = localStorage.getItem(this.clave);
    return datos ? JSON.parse(datos) : [];
  }

  guardar(reserva: Reserva): void {
    const reservas = this.obtener();
    reservas.push(reserva);
    localStorage.setItem(this.clave, JSON.stringify(reservas));
  }
}

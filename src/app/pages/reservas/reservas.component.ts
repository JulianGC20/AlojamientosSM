import { Component } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Reserva } from "../../models/alojamiento";
import { ReservaService } from "../../services/reserva.service";

@Component({
  selector: "app-reservas",
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: "./reservas.component.html",
  styleUrl: "./reservas.component.css",
})
export class ReservasComponent {
  reservas: Reserva[] = [];
  constructor(private service: ReservaService) {
    this.reservas = this.service.obtener();
  }
}

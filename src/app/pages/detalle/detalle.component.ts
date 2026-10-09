import { ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Alojamiento, Resena, Reserva } from "../../models/alojamiento";
import { AlojamientoService } from "../../services/alojamiento.service";
import { ReservaService } from "../../services/reserva.service";

@Component({
  selector: "app-detalle",
  imports: [CommonModule, FormsModule, RouterLink, CurrencyPipe],
  templateUrl: "./detalle.component.html",
  styleUrl: "./detalle.component.css",
})
export class DetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private alojamientoService = inject(AlojamientoService);
  private reservaService = inject(ReservaService);

  alojamiento?: Alojamiento;
  resenas: Resena[] = [];
  imagenSeleccionada = "";
  cargando = true;

  // Datos de la cotización
  hoy = "";
  llegada = "";
  salida = "";
  huespedes = 1;
  noches = 0;
  subtotal = 0;
  servicio = 0;
  total = 0;
  cotizacionValida = false;
  erroresCotizacion: string[] = [];

  // Datos de la reserva
  mostrarReserva = false;
  nombre = "";
  correo = "";
  erroresReserva: string[] = [];

  ngOnInit() {
    this.hoy = this.fechaHoy();
    const id = Number(this.route.snapshot.paramMap.get("id"));

    this.alojamientoService.getById(id).subscribe({
      next: (alojamiento) => {
        this.alojamiento = alojamiento;
        if (alojamiento) {
          this.imagenSeleccionada = alojamiento.imagenPrincipal;
        }
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });

    this.alojamientoService.getResenas(id).subscribe((resenas) => {
      this.resenas = resenas;
      this.cdr.detectChanges();
    });
  }

  // Fecha de hoy como AAAA-MM-DD (hora local)
  private fechaHoy(): string {
    const f = new Date();
    const mes = String(f.getMonth() + 1).padStart(2, "0");
    const dia = String(f.getDate()).padStart(2, "0");
    return `${f.getFullYear()}-${mes}-${dia}`;
  }

  // Convierte "AAAA-MM-DD" en fecha local a las 00:00 (evita problemas de zona horaria)
  private aFecha(texto: string): Date {
    const [anio, mes, dia] = texto.split("-").map(Number);
    return new Date(anio, mes - 1, dia);
  }

  // Si el usuario cambia algún dato, la cotización anterior ya no sirve
  invalidar() {
    this.cotizacionValida = false;
    this.mostrarReserva = false;
    this.erroresReserva = [];
  }

  // Botón "Calcular cotización": valida las reglas y calcula los valores
  calcular() {
    if (!this.alojamiento) return;
    this.invalidar();
    this.erroresCotizacion = [];

    if (!this.llegada || !this.salida) {
      this.erroresCotizacion.push("Seleccione las fechas de llegada y salida.");
    } else {
      const inicio = this.aFecha(this.llegada);
      const fin = this.aFecha(this.salida);
      if (inicio < this.aFecha(this.hoy)) {
        this.erroresCotizacion.push("La fecha de llegada no puede ser anterior a hoy.");
      }
      if (fin <= inicio) {
        this.erroresCotizacion.push("La fecha de salida debe ser posterior a la fecha de llegada.");
      }
    }

    if (!this.huespedes || this.huespedes < 1) {
      this.erroresCotizacion.push("El número de huéspedes debe ser mayor que cero.");
    } else if (this.huespedes > this.alojamiento.capacidad) {
      this.erroresCotizacion.push(
        "Los huéspedes superan la capacidad del alojamiento (máximo " +
          this.alojamiento.capacidad +
          ").",
      );
    }

    if (this.alojamiento.precioNoche <= 0) {
      this.erroresCotizacion.push("El precio por noche debe ser mayor que cero.");
    }

    // Si hay errores no se genera la cotización
    if (this.erroresCotizacion.length > 0) return;

    const dias = this.aFecha(this.salida).getTime() - this.aFecha(this.llegada).getTime();
    this.noches = Math.round(dias / 86400000);
    this.subtotal = this.noches * this.alojamiento.precioNoche;
    this.servicio = this.subtotal * 0.1;
    this.total = this.subtotal + this.alojamiento.tarifaLimpieza + this.servicio;
    this.cotizacionValida = true;
  }

  // Botón "Reservar": solo aparece cuando hay una cotización válida
  abrirReserva() {
    if (this.cotizacionValida) {
      this.mostrarReserva = true;
    }
  }

  // Botón "Confirmar reserva": valida nombre y correo y guarda la reserva
  confirmar() {
    if (!this.alojamiento || !this.cotizacionValida) return;

    this.erroresReserva = [];
    if (this.nombre.trim() === "") {
      this.erroresReserva.push("El nombre es obligatorio.");
    }
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(this.correo.trim())) {
      this.erroresReserva.push("Escriba un correo electrónico válido.");
    }
    if (this.erroresReserva.length > 0) return;

    const reserva: Reserva = {
      id: "RES-" + Date.now(),
      alojamientoId: this.alojamiento.id,
      alojamiento: this.alojamiento.nombre,
      ciudad: this.alojamiento.ciudad,
      llegada: this.llegada,
      salida: this.salida,
      huespedes: this.huespedes,
      noches: this.noches,
      total: this.total,
      nombreHuesped: this.nombre.trim(),
      correo: this.correo.trim(),
      estado: "CONFIRMADA",
    };

    this.reservaService.guardar(reserva);
    this.router.navigate(["/mis-reservas"]);
  }
}

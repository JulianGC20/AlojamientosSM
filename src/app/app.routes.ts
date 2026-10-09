import { Routes } from "@angular/router";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { AlojamientosComponent } from "./pages/alojamientos/alojamientos.component";
import { DetalleComponent } from "./pages/detalle/detalle.component";
import { ReservasComponent } from "./pages/reservas/reservas.component";

export const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "alojamientos", component: AlojamientosComponent },
  { path: "alojamientos/:id", component: DetalleComponent },
  { path: "mis-reservas", component: ReservasComponent },
  { path: "**", redirectTo: "" },
];

import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Alojamiento, MarketplaceData, Resena } from "../models/alojamiento";

// Único lugar donde se consulta el archivo JSON
@Injectable({ providedIn: "root" })
export class AlojamientoService {
  private http = inject(HttpClient);
  private url = "assets/data/marketplace-data.json";

  getData(): Observable<MarketplaceData> {
    return this.http.get<MarketplaceData>(this.url);
  }

  // Solo alojamientos activos (los inactivos no se muestran)
  getDisponibles(): Observable<Alojamiento[]> {
    return this.getData().pipe(map((data) => data.alojamientos.filter((a) => a.activo)));
  }

  // Destacados: los primeros 3 disponibles
  getDestacados(): Observable<Alojamiento[]> {
    return this.getDisponibles().pipe(map((lista) => lista.slice(0, 3)));
  }

  // Busca un alojamiento activo por id
  getById(id: number): Observable<Alojamiento | undefined> {
    return this.getDisponibles().pipe(map((lista) => lista.find((a) => a.id === id)));
  }

  getResenas(id: number): Observable<Resena[]> {
    return this.getData().pipe(map((data) => data.resenas.filter((r) => r.alojamientoId === id)));
  }
}

# Componentes y navegación

## Componentes
| Componente | Responsabilidad |
|---|---|
| AppComponent | Estructura general (navbar + contenido) |
| NavbarComponent | Navegación |
| InicioComponent | Página inicial y destacados |
| AlojamientosComponent | Listado y filtros |
| DetalleComponent | Detalle, formulario de cotización y formulario de reserva |
| ReservasComponent | Consulta de reservas |

## Servicios
- AlojamientoService: consulta el JSON con HttpClient y descarta los inactivos.
- ReservaService: guarda y consulta reservas en localStorage.

## Modelos
Alojamiento, Resena, MarketplaceData y Reserva (`src/app/models/alojamiento.ts`).

## Rutas
| Ruta | Pantalla |
|---|---|
| `/` | Inicio |
| `/alojamientos` | Listado y filtros |
| `/alojamientos/:id` | Detalle |
| `/mis-reservas` | Mis reservas |

Flujo: Inicio → Alojamientos → Detalle → Cotizar → Reservar → Mis reservas.

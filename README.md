Alojamientos SM - Marketplace de Alojamientos

Proyecto de curso de Desarrollo de Sistemas de Información 3 - Ingeniería de Sistemas, Universidad El Bosque.

Descripción
Aplicación web (solo frontend) hecha con Angular para explorar alojamientos temporales de Inversiones LR.
El usuario puede ver alojamientos, filtrarlos, consultar su detalle, cotizar una estadía y simular una reserva.


Integrantes
- Julian Andres Guerrero Castiblanco

Tecnologías utilizadas
- Angular 22 
- TypeScript
- HTML y CSS
- RxJS
- JSON y localStorage
- Git y GitHub

Requisitos
- Angular CLI 22 (se instala junto con las dependencias del proyecto)
- npm

Instalación
bash
git clone <https://github.com/JulianGC20/AlojamientosSM.git>
cd <carpeta-del-proyecto>
npm install


Ejecución
bash
npm start

Luego abrir http://localhost:4200/ en el navegador.

Principales funcionalidades
- Página inicial con logo, descripción, alojamientos destacados y acceso a la búsqueda.
- Listado de alojamientos activos (los inactivos no se muestran).
- Filtros por ciudad, huéspedes, tipo y precio máximo, con botón para limpiarlos y mensaje cuando no hay resultados.
- Detalle del alojamiento con información, imágenes, servicios, reglas y reseñas.
- Cotización con noches, subtotal, tarifa de limpieza, tarifa de servicio (10%) y total, con validación de fechas y huéspedes.
- Reserva simulada (nombre y correo) con estado CONFIRMADA.
- Mis reservas, guardadas en localStorage (siguen disponibles al recargar).

Rutas
| Ruta | Pantalla |
sit s
| `/` | Inicio |
| `/alojamientos` | Listado y filtros |
| `/alojamientos/:id` | Detalle, cotización y reserva |
| `/mis-reservas` | Mis reservas |

Estructura general del proyecto

src/
├── assets/
│   ├── data/marketplace-data.json   datos de la aplicación
│   └── images/                      fotos de los alojamientos y logo
└── app/
    ├── models/                      interfaces TypeScript
    ├── services/                    alojamiento.service (JSON) y reserva.service (localStorage)
    ├── components/navbar/           navegación
    ├── pages/inicio/                página inicial
    ├── pages/alojamientos/          listado y filtros
    ├── pages/detalle/               detalle, cotización y reserva
    ├── pages/reservas/              Mis reservas
    ├── app.routes.ts                rutas
    └── app.config.ts                configuración
docs/                                requerimientos, reglas de negocio, prototipos, componentes y navegación

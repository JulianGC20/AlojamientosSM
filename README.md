# Alojamientos SM - Marketplace de Alojamientos

Proyecto de la materia Desarrollo de Sistemas de Información 3, Ingeniería de Sistemas, Universidad El Bosque.

## Descripción
Esta es una página web hecha con Angular para ver alojamientos de la empresa Inversiones LR. Se pueden buscar alojamientos, ver el detalle de cada uno, cotizar y hacer una reserva de prueba.

## Integrantes
- Julian Andres Guerrero Castiblanco

## Tecnologías utilizadas
- Angular 22
- TypeScript
- HTML y CSS
- JSON y localStorage
- Git y GitHub

## Requisitos
- Angular 
- npm

## Instalación
```bash
git clone https://github.com/JulianGC20/AlojamientosSM.git
cd AlojamientosSM
npm install
```

## Ejecución
```bash
npm start
```
Después se abre http://localhost:4200/ en el navegador.

## Principales funcionalidades
- Página de inicio con la descripción y los alojamientos destacados.
- Listado de alojamientos (los inactivos no se muestran).
- Filtros por ciudad, huéspedes, tipo y precio máximo, con un botón para limpiarlos.
- Mensaje cuando la búsqueda no tiene resultados.
- Detalle del alojamiento con servicios, reglas, imágenes y reseñas.
- Cotización con noches, subtotal, tarifa de limpieza, tarifa de servicio (10%) y total.
- Validación de fechas y número de huéspedes.
- Reserva con nombre y correo, con estado CONFIRMADA.
- Mis reservas, que se siguen viendo aunque se recargue la página.

## Rutas
- `/` inicio
- `/alojamientos` listado y filtros
- `/alojamientos/:id` detalle, cotización y reserva
- `/mis-reservas` reservas realizadas

## Prototipos
El enlace de los prototipos en Figma está en `docs/prototipos-figma.md`.

## Estructura general del proyecto
```
src/
├── assets/
│   ├── data/        archivo JSON con los datos
│   └── images/      fotos de los alojamientos y el logo
└── app/
    ├── models/      interfaces de TypeScript
    ├── services/    servicio del JSON y servicio de reservas
    ├── components/  navbar
    └── pages/       inicio, alojamientos, detalle y reservas
docs/                documentos del proyecto
```
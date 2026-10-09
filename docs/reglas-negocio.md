# Reglas de negocio

| Código | Regla | Dónde se aplica |
|---|---|---|
| RN1 | La fecha de salida debe ser posterior a la de llegada | `calcular()` en detalle |
| RN2 | La fecha de llegada no puede ser anterior a hoy | `calcular()` en detalle |
| RN3 | Los huéspedes deben ser mayores que cero | `calcular()` en detalle |
| RN4 | Los huéspedes no pueden superar la capacidad | `calcular()` en detalle |
| RN5 | El precio por noche debe ser mayor que cero | `calcular()` en detalle |
| RN6 | Solo se cotiza con fechas válidas | `calcular()` no calcula si hay errores |
| RN7 | Solo se reserva después de una cotización válida | El botón Reservar solo aparece con cotización válida; si se cambia un dato la cotización se invalida |
| RN8 | La tarifa de servicio es el 10% del subtotal | `calcular()` |
| RN9 | No se muestran alojamientos inactivos | `AlojamientoService.getDisponibles()` y `getById()` |
| RN10 | Si la búsqueda no tiene resultados se informa | Listado de alojamientos |

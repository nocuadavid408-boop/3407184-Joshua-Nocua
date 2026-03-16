// ============================================
// PROYECTO SEMANA 03: Calculadora de Dominio
// ============================================
// Dominio: Meditación y Mindfulness
// Autor: Joshua Nocua
// Fecha: Marzo 2026
//
// Sistema de gestión financiera y operativa del
// Centro de Meditación Zen
// ============================================
 
// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================
 
// Constantes de precios por sesión
const SESION_INDIVIDUAL = 25_000;      // Precio sesión individual
const SESION_GRUPAL = 15_000;          // Precio sesión grupal
const PAQUETE_MENSUAL = 200_000;       // Paquete 10 sesiones al mes
 
// Capacidades y límites
const CAPACIDAD_SALA_GRUPAL = 20;      // Máximo de participantes por sesión grupal
const CAPACIDAD_SALA_INDIVIDUAL = 1;   // Sesiones 1 a 1
 
// Costos operativos
const SALARIO_INSTRUCTOR_DIA = 80_000; // Salario diario del instructor
const COSTO_INCIENSO_SESION = 2_000;   // Costo materiales por sesión
 
console.log('====================================');
console.log('CENTRO DE MEDITACIÓN ZEN');
console.log('Calculadora Financiera y Operativa');
console.log('====================================');
console.log('');
 
// ============================================
// SECCIÓN 2: Operaciones aritméticas
// ============================================
console.log("=== Operaciones básicas ===");
 
// Ingresos del día - Sesiones realizadas
const sesionesIndividualesHoy = 3;
const sesionesGrupalesHoy = 2;
const participantesPorGrupo = 12;
 
// Cálculo de ingresos
const ingresoIndividuales = SESION_INDIVIDUAL * sesionesIndividualesHoy;
console.log('Ingresos sesiones individuales: $', ingresoIndividuales);
 
const ingresoGrupales = SESION_GRUPAL * sesionesGrupalesHoy * participantesPorGrupo;
console.log('Ingresos sesiones grupales:     $', ingresoGrupales);
 
const ingresosTotalesDia = ingresoIndividuales + ingresoGrupales;
console.log('Total ingresos del día:         $', ingresosTotalesDia);
console.log('');
 
// Capacidad disponible
const espaciosDisponibles = CAPACIDAD_SALA_GRUPAL - participantesPorGrupo;
console.log('Espacios disponibles próxima sesión grupal:', espaciosDisponibles);
console.log('');
 
// Cálculo de costos operativos
const totalInstructores = 2;
const totalSesiones = sesionesIndividualesHoy + sesionesGrupalesHoy;
 
const costoSalarios = SALARIO_INSTRUCTOR_DIA * totalInstructores;
const costoMateriales = COSTO_INCIENSO_SESION * totalSesiones;
const costosTotales = costoSalarios + costoMateriales;
 
console.log('Costos del día:');
console.log('  - Salarios instructores: $', costoSalarios);
console.log('  - Materiales (incienso):  $', costoMateriales);
console.log('  - Total costos:           $', costosTotales);
console.log('');
 
// Utilidad del día
const utilidadDia = ingresosTotalesDia - costosTotales;
console.log('Utilidad neta del día:          $', utilidadDia);
console.log('');
 
// Promedio de ingresos por sesión
const promedioIngresoSesion = ingresosTotalesDia / totalSesiones;
console.log('Promedio ingreso por sesión:    $', promedioIngresoSesion);
console.log('');
 
// Potencia: Proyección mensual (30 días)
const proyeccionMensual = utilidadDia ** 1 * 30;  // Usando ** para demostrar
console.log('Proyección utilidad mensual:    $', proyeccionMensual);
console.log('');
 
// Módulo: Verificar si los ingresos son múltiplo de 1000
const residuo = ingresosTotalesDia % 1000;
console.log('Residuo al dividir entre 1000:  ', residuo);
console.log('');
 
// ============================================
// SECCIÓN 3: Asignación compuesta
// ============================================
console.log("=== Asignación compuesta ===");
 
// Contador de sesiones acumuladas en la semana
let sesionesSemanales = 0;
 
console.log('Sesiones semanales iniciales:   ', sesionesSemanales);
 
// Lunes
sesionesSemanales += 5;
console.log('Tras Lunes (+5):                ', sesionesSemanales);
 
// Martes
sesionesSemanales += 6;
console.log('Tras Martes (+6):               ', sesionesSemanales);
 
// Miércoles
sesionesSemanales += 4;
console.log('Tras Miércoles (+4):            ', sesionesSemanales);
 
// Jueves - cancelaron 2 sesiones
sesionesSemanales -= 2;
console.log('Tras Jueves (-2 canceladas):    ', sesionesSemanales);
 
// Viernes
sesionesSemanales += 7;
console.log('Tras Viernes (+7):              ', sesionesSemanales);
console.log('');
 
// Acumulado de ingresos semanal
let acumuladoSemanal = 0;
 
acumuladoSemanal += 320_000;  // Lunes
console.log('Ingresos Lunes:                 $', acumuladoSemanal);
 
acumuladoSemanal += 285_000;  // Martes
console.log('Ingresos Lunes-Martes:          $', acumuladoSemanal);
 
acumuladoSemanal += 410_000;  // Miércoles
console.log('Ingresos Lunes-Miércoles:       $', acumuladoSemanal);
 
// Descuento por promoción de fin de semana (15%)
acumuladoSemanal *= 0.85;
console.log('Con descuento promocional 15%:  $', acumuladoSemanal);
console.log('');
 
// División compuesta: Calcular promedio diario
let promedioSemanal = acumuladoSemanal;
promedioSemanal /= 3;  // 3 días registrados
console.log('Promedio de ingresos por día:   $', promedioSemanal);
console.log('');
 
// ============================================
// SECCIÓN 4: Comparación estricta
// ============================================
console.log("=== Validaciones con === ===");
 
// Validaciones de capacidad
const participantesRegistrados = 20;
const capacidadCompleta = participantesRegistrados === CAPACIDAD_SALA_GRUPAL;
console.log('¿Capacidad completa?:           ', capacidadCompleta);
 
const hayEspacios = participantesRegistrados < CAPACIDAD_SALA_GRUPAL;
console.log('¿Hay espacios disponibles?:     ', hayEspacios);
console.log('');
 
// Validaciones de instructores
const instructoresNecesarios = 2;
const instructoresDisponibles = 2;
const personalCompleto = instructoresNecesarios === instructoresDisponibles;
console.log('¿Personal completo?:            ', personalCompleto);
console.log('');
 
// Validación de meta financiera
const metaDiaria = 400_000;
const cumplioMeta = ingresosTotalesDia >= metaDiaria;
console.log('Meta diaria:                    $', metaDiaria);
console.log('Ingresos del día:               $', ingresosTotalesDia);
console.log('¿Cumplió meta?:                 ', cumplioMeta);
console.log('');
 
// Validación de rentabilidad
const esRentable = utilidadDia > 0;
console.log('¿El día fue rentable?:          ', esRentable);
 
const utilidadPositiva = utilidadDia === Math.abs(utilidadDia);
console.log('¿Utilidad positiva (sin pérdidas)?:', utilidadPositiva);
console.log('');
 
// Validación de asistencia
const asistenciaMinima = 10;
const totalParticipantes = participantesPorGrupo * sesionesGrupalesHoy + sesionesIndividualesHoy;
const superaMinimo = totalParticipantes > asistenciaMinima;
console.log('Total participantes del día:    ', totalParticipantes);
console.log('¿Supera mínimo de', asistenciaMinima + '?:          ', superaMinimo);
console.log('');
 
// ============================================
// SECCIÓN 5: Operadores lógicos
// ============================================
console.log("=== Condiciones lógicas ===");
 
// Validación para descuento premium
const esMiembro = true;
const sesionesMinimas = 10;
const sesionesRealizadas = 12;
 
const calificaDescuentoPremium = esMiembro && sesionesRealizadas >= sesionesMinimas;
console.log('¿Es miembro?:                   ', esMiembro);
console.log('Sesiones realizadas:            ', sesionesRealizadas);
console.log('¿Califica para descuento?:      ', calificaDescuentoPremium);
console.log('');
 
// Validación para sesión especial
const esFinDeSemana = true;
const hayInstructorEspecializado = true;
 
const ofrecerSesionEspecial = esFinDeSemana && hayInstructorEspecializado;
console.log('¿Es fin de semana?:             ', esFinDeSemana);
console.log('¿Hay instructor especializado?: ', hayInstructorEspecializado);
console.log('¿Ofrecer sesión especial?:      ', ofrecerSesionEspecial);
console.log('');
 
// Validación para aceptar nuevos participantes
const salaDisponible = espaciosDisponibles > 0;
const horarioDisponible = true;
 
const puedeRecibirNuevos = salaDisponible || horarioDisponible;
console.log('¿Sala tiene espacios?:          ', salaDisponible);
console.log('¿Hay horarios disponibles?:     ', horarioDisponible);
console.log('¿Puede recibir nuevos?:         ', puedeRecibirNuevos);
console.log('');
 
// Negación: Verificar si NO está lleno
const salaLlena = participantesRegistrados >= CAPACIDAD_SALA_GRUPAL;
const aceptaReservas = !salaLlena;
console.log('¿Sala llena?:                   ', salaLlena);
console.log('¿Acepta reservas?:              ', aceptaReservas);
console.log('');
 
// Condición compleja combinada
const diaExitoso = cumplioMeta && esRentable && personalCompleto;
console.log('¿Día exitoso? (meta + rentable + personal):', diaExitoso);
console.log('');
 
// Otra condición con OR
const necesitaPromocion = !cumplioMeta || totalParticipantes < asistenciaMinima;
console.log('¿Necesita promoción?:           ', necesitaPromocion);
console.log('');
 
// ============================================
// SECCIÓN 6: Resumen final
// ============================================
console.log("=== Resumen ===");
console.log('');
console.log('FINANCIERO:');
console.log('  Total ingresos:               $', ingresosTotalesDia);
console.log('  Total costos:                 $', costosTotales);
console.log('  Utilidad neta:                $', utilidadDia);
console.log('  Proyección mensual:           $', proyeccionMensual);
console.log('');
 
console.log('OPERATIVO:');
console.log('  Sesiones realizadas:          ', totalSesiones);
console.log('  Participantes atendidos:      ', totalParticipantes);
console.log('  Espacios disponibles:         ', espaciosDisponibles);
console.log('  Instructores activos:         ', totalInstructores);
console.log('');
 
console.log('VALIDACIONES:');
console.log('  ¿Cumplió meta?:               ', cumplioMeta);
console.log('  ¿Fue rentable?:               ', esRentable);
console.log('  ¿Día exitoso?:                ', diaExitoso);
console.log('  ¿Acepta reservas?:            ', aceptaReservas);
console.log('');
 
console.log('====================================');
console.log('🧘‍♀️ Fin del análisis - Namaste');
console.log('====================================');
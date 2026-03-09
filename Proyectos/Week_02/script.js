// ============================================
// PROYECTO SEMANA 02: Ficha de Datos del Dominio
// ============================================
//
// 🎯 OBJETIVO: Crear una ficha de datos en consola
//    usando variables, tipos y conversiones.
//
// 📋 DOMINIO: Meditación y Mindfulness
//
// ⚠️  POLÍTICA ANTICOPIA: Tu implementación debe ser
//    única y coherente con tu dominio asignado.
//
// Autor: [Joshua Nocua]
// Fecha: Marzo 2026
// ============================================

// ============================================
// SECCIÓN 1: DATOS PRINCIPALES
// ============================================

// Nombre del dominio
const DOMAIN_NAME = "Meditación y Mindfulness";

// Nombre de la sesión de meditación
const itemName = "Meditación Matutina Energizante";

// Categoría o tipo de práctica
const itemCategory = "Meditación Guiada - Nivel Principiante";

// Duración de la sesión en minutos
const itemQuantity = 30;

// ¿La sesión está disponible para reservar?
const isItemAvailable = true;

// Instructor asignado (aún no se ha asignado)
const assignedInstructor = null;


// ============================================
// SECCIÓN 2: MOSTRAR FICHA DE DATOS
// ============================================
console.log("===========================");
console.log(`FICHA DE DATOS: ${DOMAIN_NAME}`);
console.log("===========================");
console.log("");

// Muestra los datos principales del dominio
console.log(`Nombre:       ${itemName}`);
console.log(`Categoría:    ${itemCategory}`);
console.log(`Duración:     ${itemQuantity} minutos`);
console.log(`Disponible:   ${isItemAvailable}`);
console.log(`Instructor:   ${assignedInstructor}`);
console.log("");


// ============================================
// SECCIÓN 3: VERIFICACIÓN DE TIPOS CON typeof
// ============================================
console.log("--- Tipos de datos ---");

// Verifica el tipo de las variables
console.log("typeof itemName:          ", typeof itemName);
console.log("typeof itemQuantity:      ", typeof itemQuantity);
console.log("typeof isItemAvailable:   ", typeof isItemAvailable);
console.log("typeof assignedInstructor:", typeof assignedInstructor);
console.log("");


// ============================================
// SECCIÓN 4: CONVERSIONES EXPLÍCITAS
// ============================================
console.log("--- Conversiones ---");

// Conversión de number a String para mostrar con formato
const durationAsText = String(itemQuantity);
console.log("Duración como texto:     ", durationAsText);
console.log("typeof (convertido):     ", typeof durationAsText);

// Conversión de String a Number para calcular calorías
const caloriesPerMinute = "3";  // string
const totalCalories = Number(caloriesPerMinute) * itemQuantity;
console.log("Calorías quemadas:       ", totalCalories, "kcal");
console.log("typeof caloriesPerMinute:", typeof caloriesPerMinute);
console.log("typeof (convertido):     ", typeof Number(caloriesPerMinute));

// Conversión a Boolean
const availabilityCheck = Boolean(isItemAvailable);
console.log("Verificación disponible: ", availabilityCheck);
console.log("");


// ============================================
// SECCIÓN 5: VALOR NULL
// ============================================
console.log("--- Valor nulo ---");

// Muestra el valor null y verifica
console.log("Instructor asignado:     ", assignedInstructor);
console.log("typeof assignedInstructor:", typeof assignedInstructor);  // "object" ← bug histórico de JavaScript
console.log("¿Es null?:               ", assignedInstructor === null);  // true
console.log("");


// ============================================
// CIERRE
// ============================================
console.log("===========================");
console.log("FIN DE FICHA - 🧘‍♀️ Namaste");
console.log("===========================");

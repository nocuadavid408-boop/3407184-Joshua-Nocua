// ============================================
// PROYECTO SEMANA 05: Clasificador
// Condicionales — if/else, ternario, switch, ??, ?.
// ============================================
//
// Dominio: Meditación y Mindfulness
// Autor: Joshua Nocua
// Fecha: Marzo 2026
//
// Sistema de clasificación de sesiones de meditación
// según duración, estado, tipo y nivel de participantes
//
// ============================================
 
// ============================================
// SECCIÓN 1: Datos del elemento de tu dominio
// ============================================
 
// Datos de la sesión de meditación
const elementName = "Mindfulness Profundo";                    // Nombre de la sesión
const elementStatus = "active";                                 // Estado: "active", "inactive", "full"
const elementValue = 75;                                        // Duración en minutos (para clasificar)
const elementType = "meditacion-guiada";                       // Tipo de sesión
const elementInfo = {                                           // Información adicional
    instructor: "María González",
    location: "Sala Zen Principal",
    capacity: 20,
    currentParticipants: 15,
    level: "intermedio",
    includesMusic: true
};
 
// ============================================
// SECCIÓN 2: Clasificación con if / else if / else
// ============================================
 
// Clasificación por duración de la sesión
let classification;
 
if (elementValue >= 90) {
    classification = "Sesión Extendida";
} else if (elementValue >= 60) {
    classification = "Sesión Estándar";
} else if (elementValue >= 30) {
    classification = "Sesión Corta";
} else if (elementValue >= 15) {
    classification = "Sesión Express";
} else {
    classification = "Micro-sesión";
}
 
// ============================================
// SECCIÓN 3: Estado binario con operador ternario
// ============================================
 
// Determinar si la sesión está disponible
const statusLabel = elementStatus === "active" ? "✅ Disponible" : "❌ No Disponible";
 
// Verificar si hay espacios disponibles
const hasSpace = elementInfo.currentParticipants < elementInfo.capacity 
    ? "Acepta reservas" 
    : "Sala llena";
 
// Determinar si incluye música
const musicStatus = elementInfo.includesMusic 
    ? "🎵 Con música ambiente" 
    : "🔇 En silencio";
 
// ============================================
// SECCIÓN 4: Tipo con switch
// ============================================
 
// Clasificación por tipo de sesión
let typeLabel;
 
switch (elementType) {
    case "meditacion-guiada":
        typeLabel = "🧘 Meditación Guiada";
        break;
    case "yoga":
        typeLabel = "🤸 Yoga";
        break;
    case "respiracion":
        typeLabel = "💨 Ejercicios de Respiración";
        break;
    case "mindfulness":
        typeLabel = "🌟 Práctica de Mindfulness";
        break;
    case "zen":
        typeLabel = "☯️ Meditación Zen";
        break;
    case "visualizacion":
        typeLabel = "🎨 Visualización Guiada";
        break;
    default:
        typeLabel = "📿 Tipo desconocido";
}
 
// ============================================
// SECCIÓN 5: Valor por defecto con ??
// ============================================
 
// Operador Nullish Coalescing (??)
// Proporciona valor por defecto SOLO si es null o undefined
// (NO considera false, 0, "" como valores a reemplazar)
 
const displayName = elementName ?? "Sin nombre asignado";
const infoDetail = elementInfo?.instructor ?? "Sin instructor asignado";
 
// Más ejemplos de ??
const locationName = elementInfo?.location ?? "Ubicación no especificada";
const sessionLevel = elementInfo?.level ?? "Nivel no definido";
 
// ============================================
// SECCIÓN 6: Acceso seguro con ?.
// ============================================
 
// Optional Chaining (?.)
// Accede de forma segura a propiedades que pueden no existir
 
const instructorName = elementInfo?.instructor ?? "Instructor no especificado";
const roomLocation = elementInfo?.location ?? "Ubicación no especificada";
const participantCount = elementInfo?.currentParticipants ?? 0;
const maxCapacity = elementInfo?.capacity ?? 0;
 
// Acceso a propiedad anidada (aunque no exista en este caso)
const extraDetail = elementInfo?.equipment?.mat ?? "No especificado";
 
// Calcular ocupación (usando ?. para seguridad)
const occupancyRate = elementInfo?.capacity && elementInfo?.currentParticipants
    ? Math.round((elementInfo.currentParticipants / elementInfo.capacity) * 100)
    : 0;
 
// ============================================
// SECCIÓN 7: Condicionales adicionales
// ============================================
 
// Determinar nivel de urgencia para inscribirse
let urgencyMessage;
 
if (elementStatus !== "active") {
    urgencyMessage = "⛔ Sesión no disponible";
} else if (participantCount >= maxCapacity) {
    urgencyMessage = "🚫 Sesión completa - Lista de espera";
} else if (occupancyRate >= 80) {
    urgencyMessage = "⚠️ Últimos lugares disponibles";
} else if (occupancyRate >= 50) {
    urgencyMessage = "✅ Plazas disponibles";
} else {
    urgencyMessage = "🎯 Muchos espacios disponibles";
}
 
// Clasificación por nivel de experiencia
let levelDescription;
 
switch (sessionLevel) {
    case "principiante":
        levelDescription = "Ideal para comenzar tu práctica";
        break;
    case "intermedio":
        levelDescription = "Para quienes ya tienen experiencia básica";
        break;
    case "avanzado":
        levelDescription = "Requiere práctica previa significativa";
        break;
    case "mixto":
        levelDescription = "Adaptable a todos los niveles";
        break;
    default:
        levelDescription = "Nivel no especificado";
}
 
// Recomendación basada en duración y tipo
let recommendation;
 
if (elementType === "meditacion-guiada" && elementValue >= 60) {
    recommendation = "Perfecta para inmersión profunda";
} else if (elementType === "yoga" && elementValue >= 45) {
    recommendation = "Sesión completa de yoga con todas las fases";
} else if (elementValue <= 20) {
    recommendation = "Ideal para pausas durante el día";
} else {
    recommendation = "Equilibrio perfecto para tu práctica diaria";
}
 
// ============================================
// SECCIÓN 8: Ficha de salida
// ============================================
 
console.log("=".repeat(50));
console.log("📋 FICHA DE CLASIFICACIÓN DE SESIÓN");
console.log("=".repeat(50));
console.log("");
 
console.log("INFORMACIÓN GENERAL");
console.log("-".repeat(50));
console.log(`Nombre:           ${displayName}`);
console.log(`Estado:           ${statusLabel}`);
console.log(`Duración:         ${elementValue} minutos`);
console.log(`Clasificación:    ${classification}`);
console.log(`Tipo:             ${typeLabel}`);
console.log("");
 
console.log("DETALLES DE LA SESIÓN");
console.log("-".repeat(50));
console.log(`Instructor:       ${infoDetail}`);
console.log(`Ubicación:        ${locationName}`);
console.log(`Nivel:            ${sessionLevel.toUpperCase()} - ${levelDescription}`);
console.log(`Música:           ${musicStatus}`);
console.log("");
 
console.log("DISPONIBILIDAD");
console.log("-".repeat(50));
console.log(`Capacidad:        ${participantCount}/${maxCapacity} personas`);
console.log(`Ocupación:        ${occupancyRate}%`);
console.log(`Espacios:         ${hasSpace}`);
console.log(`Urgencia:         ${urgencyMessage}`);
console.log("");
 
console.log("RECOMENDACIÓN");
console.log("-".repeat(50));
console.log(`💡 ${recommendation}`);
console.log("");
 
console.log("INFORMACIÓN ADICIONAL");
console.log("-".repeat(50));
console.log(`Equipo requerido: ${extraDetail}`);
console.log("");
 
console.log("=".repeat(50));
console.log("🧘‍♀️ Sistema de Clasificación - Centro Zen");
console.log("=".repeat(50));
// ============================================
// PROYECTO SEMANA 04: Generador de Mensajes
// ============================================
//
// 🎯 OBJETIVO: Construir un generador de mensajes
//    en consola usando métodos de string y
//    template literals.
//
// 📋 DOMINIO: Meditación y Mindfulness
// 
// Autor: Joshua Nocua
// Fecha: Marzo 2026
//
// ============================================
 
// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================
 
// Nombre del dominio
const DOMAIN_NAME = "Meditación y Mindfulness";
 
// Nombre de la sesión con espacios y mayúsculas/minúsculas
// (se limpiará después con trim)
const rawEntityName = "  Yoga Restaurativo Nocturno  ";
 
// Categoría o tipo de sesión
const entityCategory = "Práctica de Relajación - Nivel Intermedio";
 
// Código identificador de la sesión
const entityCode = "1525";
 
// Descripción de la sesión
const entityDescription = "Sesión de yoga restaurativo diseñada para liberar tensiones del dominio físico y mental mediante posturas suaves y respiración consciente.";
 
// Duración en minutos
const mainValue = 45;
 
// Estado de disponibilidad
const isActive = true;
 
 
// ============================================
// SECCIÓN 2: Transformaciones de string
// ============================================
 
// Limpia el nombre eliminando espacios al inicio y final
const entityName = rawEntityName.trim();
 
// Convierte a mayúsculas para el encabezado
const entityNameUpper = entityName.toUpperCase();
 
// Convierte a minúsculas para referencias
const entityNameLower = entityName.toLowerCase();
 
// Extrae el prefijo del código (primeros 3 caracteres)
const codePrefix = entityCode.slice(0, 3);
 
// Extrae el año del código (caracteres 4-8)
const codeYear = entityCode.slice(4, 8);
 
// Extrae el número de sesión (últimos 3 caracteres)
const sessionNumber = entityCode.slice(-3);
 
 
// ============================================
// SECCIÓN 3: Validaciones con búsqueda
// ============================================
 
// Verifica si el código empieza con "MED"
const hasValidPrefix = entityCode.startsWith("MED");
 
// Verifica si la descripción contiene la palabra "dominio"
const descriptionIsRelevant = entityDescription.includes("dominio");
 
// Verifica si el código termina con "25"
const hasValidSuffix = entityCode.endsWith("25");
 
// Verifica si la descripción menciona "respiración"
const mentionsBreathing = entityDescription.includes("respiración");
 
// Verifica si el nombre contiene "Yoga"
const isYogaSession = entityName.includes("Yoga");
 
// Verifica si la categoría contiene "Relajación"
const isRelaxation = entityCategory.includes("Relajación");
 
 
// ============================================
// SECCIÓN 4: Generación de la ficha principal
// ============================================
 
const separator = "=".repeat(50);
const subSeparator = "-".repeat(50);
 
// Construye la ficha multilínea usando template literals
const mainCard = `
${separator}
  ${DOMAIN_NAME.toUpperCase()} — FICHA DE SESIÓN
${separator}
 
INFORMACIÓN GENERAL
${subSeparator}
Nombre:      ${entityNameUpper}
Categoría:   ${entityCategory}
Código:      ${entityCode}
Prefijo:     ${codePrefix}
Año:         ${codeYear}
Sesión Nº:   ${sessionNumber}
Duración:    ${mainValue} minutos
Estado:      ${isActive ? "✅ Activa" : "❌ Inactiva"}
 
${subSeparator}
DESCRIPCIÓN
${subSeparator}
${entityDescription}
 
${subSeparator}
CARACTERÍSTICAS
${subSeparator}
• Tipo de sesión:    ${isYogaSession ? "Yoga" : "Meditación"}
• Enfoque:           ${isRelaxation ? "Relajación y bienestar" : "Concentración"}
• Incluye respiración: ${mentionsBreathing ? "Sí" : "No"}
${separator}
`;
 
console.log(mainCard);
 
 
// ============================================
// SECCIÓN 5: Validaciones
// ============================================
 
console.log("--- Validaciones del Código ---");
console.log(`¿Código empieza con '${codePrefix}'?:        ${hasValidPrefix}`);
console.log(`¿Código termina con '${sessionNumber}'?:     ${hasValidSuffix}`);
console.log(`¿Año del código es ${codeYear}?:             ${entityCode.includes(codeYear)}`);
console.log("");
 
console.log("--- Validaciones de Contenido ---");
console.log(`¿Descripción contiene 'dominio'?:      ${descriptionIsRelevant}`);
console.log(`¿Descripción menciona 'respiración'?:  ${mentionsBreathing}`);
console.log(`¿Es sesión de Yoga?:                   ${isYogaSession}`);
console.log(`¿Es de Relajación?:                    ${isRelaxation}`);
console.log("");
 
 
// ============================================
// SECCIÓN 6: Mensajes de notificación
// ============================================
 
console.log("--- Notificaciones ---");
 
// Mensaje de nueva sesión disponible
const notification = `📢 Nueva sesión disponible: ${entityName} (${entityCode})`;
console.log(notification);
 
// Mensaje con duración
const durationMessage = `⏱️  Duración estimada: ${mainValue} minutos de práctica`;
console.log(durationMessage);
 
// Mensaje de estado
const statusMessage = `${isActive ? "✅ Esta sesión está activa y acepta reservas" : "❌ Sesión no disponible"}`;
console.log(statusMessage);
 
// Mensaje personalizado usando transformaciones
const customMessage = `🧘‍♀️ ${entityNameUpper} - Ideal para relajación profunda`;
console.log(customMessage);
 
console.log("");
 
 
// ============================================
// SECCIÓN 7: Generación de URL amigable
// ============================================
 
console.log("--- URL Generada ---");
 
// Crea una URL amigable reemplazando espacios por guiones
const urlSlug = entityNameLower.replace(/ /g, "-");
const fullURL = `https://centrozen.com/sesiones/${urlSlug}`;
 
console.log(`URL de la sesión: ${fullURL}`);
console.log("");
 
 
// ============================================
// SECCIÓN 8: Resumen ejecutivo
// ============================================
 
console.log("--- Resumen Ejecutivo ---");
 
// Extrae primeras 50 caracteres de la descripción
const shortDescription = entityDescription.slice(0, 50) + "...";
 
const executiveSummary = `
RESUMEN: ${entityName}
CÓDIGO:  ${entityCode}
TIPO:    ${entityCategory}
BREVE:   ${shortDescription}
ESTADO:  ${isActive ? "DISPONIBLE" : "NO DISPONIBLE"}
`;
 
console.log(executiveSummary);
 
 
// ============================================
// SECCIÓN 9: Validación de formato
// ============================================
 
console.log("--- Análisis del Código ---");
 
// Verifica longitud del código
const codeLength = entityCode.length;
console.log(`Longitud del código: ${codeLength} caracteres`);
 
// Cuenta cuántos guiones tiene
const dashCount = entityCode.split("-").length - 1;
console.log(`Número de guiones:   ${dashCount}`);
 
// Verifica formato completo MED-XXXX-XXX
const hasValidFormat = entityCode.startsWith("MED-") && dashCount === 2 && codeLength === 12;
console.log(`¿Formato válido?:    ${hasValidFormat}`);
 
console.log("");
 
 
// ============================================
// CIERRE
// ============================================
 
console.log("=".repeat(50));
console.log("  🧘‍♀️ Generador de Mensajes - Namaste");
console.log("=".repeat(50));
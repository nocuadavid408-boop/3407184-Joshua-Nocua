// ============================================
// PROYECTO SEMANA 07 — Librería de Funciones
// Dominio: Meditación y Mindfulness
// ============================================
//
// Autor: Joshua Nocua
// Fecha: Marzo 2026
//
// Sistema de gestión de sesiones de meditación
// usando funciones modulares y reutilizables
//
// ============================================

"use strict"; // activa el modo estricto — mejores errores

// ============================================
// SECCIÓN 1: Constantes y datos del dominio
// ============================================

// Constantes globales del dominio
const DOMAIN_NAME = "Centro de Meditación Zen";
const VALUE_LABEL = "duración";
const CURRENCY = "COP";
const PRICE_PER_MINUTE = 500; // Precio por minuto de sesión
const MIN_PARTICIPANTS = 5;   // Mínimo de participantes para abrir sesión
const MAX_CAPACITY = 20;      // Capacidad máxima por sesión

// Array de sesiones de meditación
const sessions = [
  { 
    id: 1, 
    name: "Meditación Matutina", 
    category: "mindfulness", 
    duration: 30, 
    active: true,
    instructor: "Ana García",
    participants: 12,
    price: 15000
  },
  { 
    id: 2, 
    name: "Yoga Restaurativo", 
    category: "yoga", 
    duration: 60, 
    active: true,
    instructor: "Carlos Ruiz",
    participants: 18,
    price: 30000
  },
  { 
    id: 3, 
    name: "Respiración Consciente", 
    category: "respiracion", 
    duration: 20, 
    active: false,
    instructor: "María López",
    participants: 3,
    price: 10000
  },
  { 
    id: 4, 
    name: "Meditación Zen", 
    category: "meditacion-guiada", 
    duration: 45, 
    active: true,
    instructor: "Jorge Mendoza",
    participants: 15,
    price: 22000
  },
  { 
    id: 5, 
    name: "Yoga Vinyasa", 
    category: "yoga", 
    duration: 75, 
    active: true,
    instructor: "Laura Pérez",
    participants: 20,
    price: 35000
  },
  { 
    id: 6, 
    name: "Mindfulness Nocturno", 
    category: "mindfulness", 
    duration: 40, 
    active: true,
    instructor: "Ana García",
    participants: 8,
    price: 18000
  },
  { 
    id: 7, 
    name: "Visualización Guiada", 
    category: "meditacion-guiada", 
    duration: 35, 
    active: false,
    instructor: "Pedro Sánchez",
    participants: 2,
    price: 16000
  }
];

// ============================================
// SECCIÓN 2: Función de formato
// ============================================

// Arrow function para formatear una sesión
// Recibe un objeto session y devuelve un string formateado
const formatSession = (session) => 
  `🧘 ${session.name} [${session.category}] — ${session.duration} min — $${session.price.toLocaleString('es-CO')} COP`;

// Función alternativa con más detalles
const formatSessionDetailed = (session) => {
  const statusIcon = session.active ? "✅" : "❌";
  const capacityInfo = `${session.participants}/${MAX_CAPACITY}`;
  return `${statusIcon} ${session.name} | ${session.instructor} | ${capacityInfo} participantes`;
};

// Función para formatear categoría con icono
const formatCategory = (category) => {
  const icons = {
    mindfulness: "🌟",
    yoga: "🤸",
    respiracion: "💨",
    "meditacion-guiada": "🎧"
  };
  return `${icons[category] || "📿"} ${category}`;
};

// ============================================
// SECCIÓN 3: Función de cálculo (pura)
// ============================================

// Función pura: Calcular ingresos totales de una sesión
// Input: precio base, número de participantes, descuento opcional
// Output: ingreso total calculado
const calculateRevenue = (price, participants, discountPercent = 0) => {
  const subtotal = price * participants;
  const discount = subtotal * (discountPercent / 100);
  const total = subtotal - discount;
  return +total.toFixed(2); // El + convierte a número
};

// Función pura: Calcular calorías quemadas
// Input: duración en minutos, intensidad (1-3)
// Output: calorías estimadas
const calculateCalories = (duration, intensity = 2) => {
  const caloriesPerMinute = intensity * 2.5; // Factor base
  return Math.round(duration * caloriesPerMinute);
};

// Función pura: Calcular precio por minuto
const calculatePricePerMinute = (totalPrice, duration) => {
  if (duration === 0) return 0;
  return +(totalPrice / duration).toFixed(2);
};

// Función pura: Calcular porcentaje de ocupación
const calculateOccupancy = (current, max) => {
  if (max === 0) return 0;
  return Math.round((current / max) * 100);
};

// ============================================
// SECCIÓN 4: Función de validación
// ============================================

// Verifica si una sesión está activa y tiene suficientes participantes
const isSessionValid = (session) => {
  return session.active === true && session.participants >= MIN_PARTICIPANTS;
};

// Verifica si una sesión está llena
const isSessionFull = (session) => {
  return session.participants >= MAX_CAPACITY;
};

// Verifica si una sesión puede abrirse
const canOpenSession = (session) => {
  return session.active && session.participants >= MIN_PARTICIPANTS && !isSessionFull(session);
};

// Verifica si una sesión es de larga duración
const isLongSession = (session, minDuration = 60) => {
  return session.duration >= minDuration;
};

// ============================================
// SECCIÓN 5: Función con parámetro por defecto
// ============================================

// Formatea un precio con moneda y opción de mostrar impuestos
const formatPrice = (price, showCurrency = true, showTax = false) => {
  if (showTax) {
    const withTax = price * 1.19; // IVA 19%
    return showCurrency 
      ? `$${withTax.toLocaleString('es-CO')} COP (con IVA)`
      : `$${withTax.toLocaleString('es-CO')}`;
  }
  return showCurrency 
    ? `$${price.toLocaleString('es-CO')} COP`
    : `$${price.toLocaleString('es-CO')}`;
};

// Crea un resumen de sesión con valores por defecto
const createSessionSummary = (
  session, 
  includeRevenue = true, 
  includeCalories = true,
  intensityLevel = 2
) => {
  let summary = `📊 ${session.name}\n`;
  summary += `   Duración: ${session.duration} minutos\n`;
  summary += `   Participantes: ${session.participants}/${MAX_CAPACITY}\n`;
  
  if (includeRevenue) {
    const revenue = calculateRevenue(session.price, session.participants);
    summary += `   Ingresos: $${revenue.toLocaleString('es-CO')} COP\n`;
  }
  
  if (includeCalories) {
    const calories = calculateCalories(session.duration, intensityLevel);
    summary += `   Calorías quemadas: ${calories} kcal\n`;
  }
  
  return summary;
};

// Formatea duración con unidad por defecto
const formatDuration = (minutes, unit = "minutos", showHours = false) => {
  if (showHours && minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  }
  return `${minutes} ${unit}`;
};

// ============================================
// SECCIÓN 6: Funciones de búsqueda y filtrado
// ============================================

// Encuentra sesiones por categoría
const findByCategory = (sessions, category) => {
  const filtered = [];
  for (const session of sessions) {
    if (session.category === category) {
      filtered.push(session);
    }
  }
  return filtered;
};

// Cuenta sesiones por instructor
const countByInstructor = (sessions, instructorName) => {
  let count = 0;
  for (const session of sessions) {
    if (session.instructor === instructorName) {
      count++;
    }
  }
  return count;
};

// Obtiene el promedio de una propiedad numérica
const getAverage = (sessions, property) => {
  if (sessions.length === 0) return 0;
  
  let total = 0;
  for (const session of sessions) {
    total += session[property] || 0;
  }
  
  return +(total / sessions.length).toFixed(2);
};

// ============================================
// SECCIÓN 7: Reporte usando las funciones
// ============================================

console.log(`\n${"═".repeat(60)}`);
console.log(`   REPORTE — ${DOMAIN_NAME}`);
console.log(`${"═".repeat(60)}`);

if (sessions.length === 0) {
  console.log("\n⚠️  No hay sesiones registradas.");
} else {
  
  // --- LISTADO COMPLETO ---
  console.log("\n📋 LISTADO DE SESIONES:");
  console.log("─".repeat(60));
  
  let lineNumber = 1;
  for (const session of sessions) {
    console.log(`  ${lineNumber}. ${formatSession(session)}`);
    lineNumber++;
  }
  
  // --- VALIDACIÓN ---
  console.log("\n✅ VALIDACIÓN:");
  console.log("─".repeat(60));
  
  let validCount = 0;
  let activeCount = 0;
  let fullCount = 0;
  
  for (const session of sessions) {
    if (isSessionValid(session)) validCount++;
    if (session.active) activeCount++;
    if (isSessionFull(session)) fullCount++;
  }
  
  console.log(`Sesiones operativas: ${validCount} / ${sessions.length}`);
  console.log(`Sesiones activas: ${activeCount}`);
  console.log(`Sesiones llenas: ${fullCount}`);
  console.log(`Sesiones inactivas: ${sessions.length - activeCount}`);
  
  // --- CÁLCULOS GENERALES ---
  console.log("\n💰 CÁLCULOS FINANCIEROS:");
  console.log("─".repeat(60));
  
  let totalRevenue = 0;
  let totalParticipants = 0;
  let totalDuration = 0;
  
  for (const session of sessions) {
    const revenue = calculateRevenue(session.price, session.participants);
    totalRevenue += revenue;
    totalParticipants += session.participants;
    totalDuration += session.duration;
  }
  
  console.log(`Ingresos totales: $${totalRevenue.toLocaleString('es-CO')} COP`);
  console.log(`Participantes totales: ${totalParticipants}`);
  console.log(`Duración total: ${formatDuration(totalDuration, "minutos", true)}`);
  console.log(`Precio promedio: $${getAverage(sessions, 'price').toLocaleString('es-CO')} COP`);
  console.log(`Duración promedio: ${getAverage(sessions, 'duration')} minutos`);
  
  // --- ANÁLISIS POR CATEGORÍA ---
  console.log("\n📊 ANÁLISIS POR CATEGORÍA:");
  console.log("─".repeat(60));
  
  const categories = ["mindfulness", "yoga", "respiracion", "meditacion-guiada"];
  
  for (const category of categories) {
    const categorySessions = findByCategory(sessions, category);
    if (categorySessions.length > 0) {
      const avgDuration = getAverage(categorySessions, 'duration');
      const avgPrice = getAverage(categorySessions, 'price');
      
      console.log(`\n${formatCategory(category)}`);
      console.log(`  Sesiones: ${categorySessions.length}`);
      console.log(`  Duración promedio: ${avgDuration} min`);
      console.log(`  Precio promedio: $${avgPrice.toLocaleString('es-CO')} COP`);
    }
  }
  
  // --- DETALLES DE SESIONES DESTACADAS ---
  console.log("\n⭐ SESIONES DESTACADAS:");
  console.log("─".repeat(60));
  
  // Sesión más larga
  let longestSession = sessions[0];
  for (const session of sessions) {
    if (session.duration > longestSession.duration) {
      longestSession = session;
    }
  }
  console.log(`\n🏆 Sesión más larga:`);
  console.log(createSessionSummary(longestSession, true, true, 2));
  
  // Sesión más rentable
  let mostProfitable = sessions[0];
  let maxRevenue = calculateRevenue(sessions[0].price, sessions[0].participants);
  
  for (const session of sessions) {
    const revenue = calculateRevenue(session.price, session.participants);
    if (revenue > maxRevenue) {
      maxRevenue = revenue;
      mostProfitable = session;
    }
  }
  
  console.log(`💎 Sesión más rentable:`);
  console.log(createSessionSummary(mostProfitable, true, false));
  
  // --- ANÁLISIS DE OCUPACIÓN ---
  console.log("📈 ANÁLISIS DE OCUPACIÓN:");
  console.log("─".repeat(60));
  
  for (const session of sessions) {
    const occupancy = calculateOccupancy(session.participants, MAX_CAPACITY);
    const statusIcon = occupancy >= 80 ? "🔴" : occupancy >= 50 ? "🟡" : "🟢";
    console.log(`${statusIcon} ${session.name}: ${occupancy}% (${session.participants}/${MAX_CAPACITY})`);
  }
}

console.log(`\n${"═".repeat(60)}`);
console.log("🧘‍♀️ Fin del Reporte - Namaste");
console.log(`${"═".repeat(60)}\n`);
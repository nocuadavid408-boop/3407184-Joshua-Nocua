 // ============================================
// PROYECTO SEMANA 06: Reporte con Bucles
// Dominio: Meditación y Mindfulness
// ============================================
//
// Autor: Joshua Nocua
// Fecha: Marzo 2026
//
// Sistema de análisis de sesiones de meditación
// usando bucles para generar reportes estadísticos
//
// ============================================
 
// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================
 
// Array de sesiones de meditación del centro
const sessions = [
  { name: "Meditación Matutina", category: "mindfulness", value: 30 },
  { name: "Yoga Restaurativo", category: "yoga", value: 60 },
  { name: "Respiración Consciente", category: "respiracion", value: 20 },
  { name: "Meditación Zen", category: "meditacion-guiada", value: 45 },
  { name: "Yoga Vinyasa", category: "yoga", value: 75 },
  { name: "Mindfulness Nocturno", category: "mindfulness", value: 40 },
  { name: "Visualización Guiada", category: "meditacion-guiada", value: 35 },
  { name: "Pranayama Avanzado", category: "respiracion", value: 25 },
  { name: "Yin Yoga", category: "yoga", value: 90 },
  { name: "Meditación Caminando", category: "mindfulness", value: 50 }
];
 
// Categorías de sesiones disponibles
const categories = [
  "mindfulness",
  "yoga",
  "respiracion",
  "meditacion-guiada"
];
 
// Etiqueta descriptiva para el valor numérico
const valueLabel = "duración (minutos)";
 
// ============================================
// SECCIÓN 2: Listado completo con for...of
// ============================================
console.log("=".repeat(60));
console.log("📋 LISTADO COMPLETO DE SESIONES");
console.log("=".repeat(60));
 
let lineNumber = 0;
 
for (const session of sessions) {
  lineNumber++;
  console.log(`${lineNumber}. ${session.name} — ${session.category} — ${valueLabel}: ${session.value} min`);
}
 
console.log("");
 
// ============================================
// SECCIÓN 3: Contadores por categoría
// ============================================
console.log("=== CONTEO POR CATEGORÍA ===");
 
for (const category of categories) {
  let count = 0;
 
  // Contar sesiones de esta categoría
  for (const session of sessions) {
    if (session.category === category) {
      count++;
    }
  }
 
  // Determinar icono según categoría
  let icon;
  switch (category) {
    case "mindfulness":
      icon = "🌟";
      break;
    case "yoga":
      icon = "🧘";
      break;
    case "respiracion":
      icon = "💨";
      break;
    case "meditacion-guiada":
      icon = "🎧";
      break;
    default:
      icon = "📿";
  }
 
  console.log(`${icon} ${category}: ${count} sesión(es)`);
}
 
console.log("");
 
// ============================================
// SECCIÓN 4: Totales y promedio (acumulador)
// ============================================
console.log("=== ESTADÍSTICAS GENERALES ===");
 
// Acumulador para la duración total
let totalValue = 0;
 
for (const session of sessions) {
  totalValue += session.value;
}
 
// Calcular promedio
const averageValue = sessions.length > 0 ? totalValue / sessions.length : 0;
 
console.log(`Total de sesiones:        ${sessions.length}`);
console.log(`Total ${valueLabel}:      ${totalValue} minutos`);
console.log(`Total en horas:           ${(totalValue / 60).toFixed(1)} horas`);
console.log(`Promedio ${valueLabel}:   ${averageValue.toFixed(1)} minutos`);
 
console.log("");
 
// ============================================
// SECCIÓN 5: Máximo y mínimo
// ============================================
console.log("=== MÁXIMO Y MÍNIMO ===");
 
// Inicializar con el primer elemento
let maxSession = sessions[0] ?? null;
let minSession = sessions[0] ?? null;
 
if (sessions.length > 0) {
  // Buscar máximo y mínimo
  for (const session of sessions) {
    if (session.value > maxSession.value) {
      maxSession = session;
    }
    if (session.value < minSession.value) {
      minSession = session;
    }
  }
 
  console.log(`⬆️  Sesión más larga:  ${maxSession.name} (${maxSession.value} min)`);
  console.log(`⬇️  Sesión más corta:  ${minSession.name} (${minSession.value} min)`);
  console.log(`📊 Diferencia:        ${maxSession.value - minSession.value} minutos`);
}
 
console.log("");
 
// ============================================
// SECCIÓN 6: Reporte numerado con for clásico
// ============================================
console.log("=== REPORTE DETALLADO ===");
 
for (let i = 0; i < sessions.length; i++) {
  const session = sessions[i];
 
  // Determinar si está sobre o bajo el promedio
  const comparison = session.value >= averageValue 
    ? "⬆️ sobre el promedio" 
    : "⬇️ bajo el promedio";
 
  // Calcular cuánto difiere del promedio
  const difference = Math.abs(session.value - averageValue);
  const diffText = `(${difference.toFixed(1)} min de diferencia)`;
 
  console.log(`${i + 1}. ${session.name} — ${comparison} ${diffText}`);
}
 
console.log("");
 
// ============================================
// SECCIÓN 7: Análisis por categoría (EXTRA)
// ============================================
console.log("=== ANÁLISIS DETALLADO POR CATEGORÍA ===");
 
for (const category of categories) {
  let categoryTotal = 0;
  let categoryCount = 0;
 
  // Calcular total y promedio por categoría
  for (const session of sessions) {
    if (session.category === category) {
      categoryTotal += session.value;
      categoryCount++;
    }
  }
 
  if (categoryCount > 0) {
    const categoryAverage = categoryTotal / categoryCount;
    
    console.log(`\n📌 ${category.toUpperCase()}`);
    console.log(`   Sesiones:        ${categoryCount}`);
    console.log(`   Tiempo total:    ${categoryTotal} min`);
    console.log(`   Promedio:        ${categoryAverage.toFixed(1)} min`);
  }
}
 
console.log("");
 
// ============================================
// SECCIÓN 8: Ranking de sesiones (EXTRA)
// ============================================
console.log("=== RANKING DE SESIONES POR DURACIÓN ===");
 
// Crear copia del array para no modificar el original
const sortedSessions = [...sessions];
 
// Ordenar de mayor a menor (bubble sort simple)
for (let i = 0; i < sortedSessions.length - 1; i++) {
  for (let j = 0; j < sortedSessions.length - 1 - i; j++) {
    if (sortedSessions[j].value < sortedSessions[j + 1].value) {
      // Intercambiar posiciones
      const temp = sortedSessions[j];
      sortedSessions[j] = sortedSessions[j + 1];
      sortedSessions[j + 1] = temp;
    }
  }
}
 
// Mostrar top 5
console.log("\n🏆 TOP 5 SESIONES MÁS LARGAS:");
for (let i = 0; i < 5 && i < sortedSessions.length; i++) {
  const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "  ";
  console.log(`${medal} ${i + 1}. ${sortedSessions[i].name} — ${sortedSessions[i].value} min`);
}
 
console.log("");
 
// ============================================
// SECCIÓN 9: Búsqueda de sesiones (EXTRA)
// ============================================
console.log("=== BÚSQUEDA DE SESIONES ===");
 
// Buscar sesiones entre 30 y 60 minutos
console.log("\n🔍 Sesiones entre 30 y 60 minutos:");
let foundCount = 0;
 
for (const session of sessions) {
  if (session.value >= 30 && session.value <= 60) {
    console.log(`   ✓ ${session.name} (${session.value} min)`);
    foundCount++;
  }
}
 
console.log(`   Total encontradas: ${foundCount}`);
 
console.log("");
 
// ============================================
// SECCIÓN 10: Resumen ejecutivo
// ============================================
console.log("=".repeat(60));
console.log("📊 RESUMEN EJECUTIVO");
console.log("=".repeat(60));
 
// Calcular porcentaje de sesiones sobre el promedio
let aboveAverageCount = 0;
 
for (const session of sessions) {
  if (session.value >= averageValue) {
    aboveAverageCount++;
  }
}
 
const aboveAveragePercent = (aboveAverageCount / sessions.length) * 100;
 
console.log(`Total de sesiones:              ${sessions.length}`);
console.log(`Duración total:                 ${totalValue} minutos (${(totalValue / 60).toFixed(1)} horas)`);
console.log(`Duración promedio:              ${averageValue.toFixed(1)} minutos`);
console.log(`Sesión más larga:               ${maxSession.name} (${maxSession.value} min)`);
console.log(`Sesión más corta:               ${minSession.name} (${minSession.value} min)`);
console.log(`Sesiones sobre el promedio:     ${aboveAverageCount} (${aboveAveragePercent.toFixed(0)}%)`);
console.log(`Categorías disponibles:         ${categories.length}`);
 
console.log("");
 
// ============================================
// CIERRE
// ============================================
console.log("=".repeat(60));
console.log("🧘‍♀️ FIN DEL REPORTE - Centro de Meditación Zen");
console.log("=".repeat(60));
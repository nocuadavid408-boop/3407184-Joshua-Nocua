// ============================================
// PROYECTO SEMANA 09: Catálogo de Elementos
// ============================================
//
// Dominio: Meditación y Mindfulness
// Autor: Joshua Nocua
// Fecha: Abril 2026
//
// Catálogo de instructores del Centro de Meditación Zen
// con métodos de Object para inspección y manipulación
//
// ============================================

// ============================================
// CONFIGURACIÓN DEL DOMINIO
// ============================================

const DOMAIN_NAME = "Instructores de Meditación";
const VALUE_LABEL = "instructores";

// ============================================
// DATOS DEL CATÁLOGO
// ============================================

// Catálogo de instructores con sus especializaciones y datos
const items = [
  {
    id: 1,
    name: "Ana García",
    specialty: "Mindfulness",
    experience: 8,
    active: true,
    sessionsPerWeek: 12,
    rating: 4.9,
    certification: "Certified Mindfulness Teacher",
    languages: ["Español", "Inglés"]
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    specialty: "Yoga Vinyasa",
    experience: 5,
    active: true,
    sessionsPerWeek: 10,
    rating: 4.7,
    certification: "RYT 500",
    languages: ["Español"]
  },
  {
    id: 3,
    name: "María López",
    specialty: "Respiración Consciente",
    experience: 3,
    active: false,
    sessionsPerWeek: 0,
    rating: 4.5,
    // No tiene certification (propiedad opcional)
    languages: ["Español", "Portugués"]
  },
  {
    id: 4,
    name: "Jorge Mendoza",
    specialty: "Meditación Zen",
    experience: 12,
    active: true,
    sessionsPerWeek: 8,
    rating: 5.0,
    certification: "Zen Master Certified",
    languages: ["Español", "Japonés"],
    awards: ["Mejor Instructor 2025"]  // Propiedad opcional
  },
  {
    id: 5,
    name: "Laura Pérez",
    specialty: "Yoga Restaurativo",
    experience: 6,
    active: true,
    sessionsPerWeek: 15,
    rating: 4.8,
    certification: "RYT 200",
    languages: ["Español", "Francés"]
  },
  {
    id: 6,
    name: "Pedro Sánchez",
    specialty: "Visualización Guiada",
    experience: 4,
    active: false,
    sessionsPerWeek: 0,
    rating: 4.6,
    certification: "Guided Meditation Specialist",
    languages: ["Español"]
  },
  {
    id: 7,
    name: "Sofía Martínez",
    specialty: "Kundalini Yoga",
    experience: 10,
    active: true,
    sessionsPerWeek: 14,
    rating: 4.9,
    certification: "KRI Certified",
    languages: ["Español", "Inglés", "Hindi"],
    awards: ["Instructora Destacada 2024", "Premio Excelencia"]  // Propiedad opcional
  }
];

// ============================================
// INSPECCIÓN CON Object.*
// ============================================

/**
 * Muestra las claves y valores de un objeto usando Object.entries()
 * @param {Object} item - El objeto a inspeccionar
 */
const inspectItem = (item) => {
  console.log(`\n📋 Detalle completo de: ${item.name}`);
  console.log("─".repeat(50));
  
  // Usar Object.entries() para obtener pares [clave, valor]
  Object.entries(item).forEach(([key, value]) => {
    // Formatear el valor según su tipo
    let formattedValue = value;
    if (Array.isArray(value)) {
      formattedValue = value.join(", ");
    } else if (typeof value === "boolean") {
      formattedValue = value ? "✓ Sí" : "✗ No";
    }
    
    // Alinear con padEnd para formato de tabla
    console.log(`  ${key.padEnd(20)}: ${formattedValue}`);
  });
};

/**
 * Calcula estadísticas numéricas del catálogo
 * @param {string} numericKey - El nombre de la propiedad numérica a analizar
 */
const calculateStats = (numericKey) => {
  console.log(`\n📊 Estadísticas de "${numericKey}":`);
  console.log("─".repeat(50));
  
  // Extraer valores numéricos usando map
  const values = items.map(item => item[numericKey] || 0);
  
  // Calcular estadísticas
  const total = values.reduce((sum, val) => sum + val, 0);
  const average = values.length > 0 ? total / values.length : 0;
  const maximum = Math.max(...values);
  const minimum = Math.min(...values);
  
  console.log(`  Total:    ${total}`);
  console.log(`  Promedio: ${average.toFixed(2)}`);
  console.log(`  Máximo:   ${maximum}`);
  console.log(`  Mínimo:   ${minimum}`);
};

// ============================================
// VERIFICACIÓN CON Object.hasOwn()
// ============================================

/**
 * Muestra el detalle de un elemento, incluyendo propiedades opcionales
 * si existen en ese objeto
 * @param {Object} item - El objeto a mostrar
 */
const showWithOptionals = (item) => {
  console.log(`\n→ ${item.name} (${item.specialty})`);
  
  // Propiedades básicas (siempre presentes)
  console.log(`   Experiencia: ${item.experience} años`);
  console.log(`   Estado: ${item.active ? "✅ Activo" : "❌ Inactivo"}`);
  console.log(`   Sesiones/semana: ${item.sessionsPerWeek}`);
  console.log(`   Rating: ${"⭐".repeat(Math.floor(item.rating))} (${item.rating})`);
  
  // Propiedades opcionales (verificar con Object.hasOwn)
  if (Object.hasOwn(item, "certification")) {
    console.log(`   Certificación: ${item.certification}`);
  } else {
    console.log(`   Certificación: No especificada`);
  }
  
  if (Object.hasOwn(item, "awards")) {
    console.log(`   🏆 Premios: ${item.awards.join(", ")}`);
  }
  
  if (Object.hasOwn(item, "languages")) {
    console.log(`   Idiomas: ${item.languages.join(", ")}`);
  }
};

// ============================================
// ITERACIÓN CON for...in
// ============================================

/**
 * Imprime todas las propiedades de un objeto usando for...in
 * @param {Object} item - El objeto a recorrer
 */
const printAllProperties = (item) => {
  console.log(`\n🔍 Propiedades de "${item.name}" (usando for...in):`);
  console.log("─".repeat(50));
  
  let propCount = 0;
  
  // Usar for...in para recorrer todas las propiedades
  for (const key in item) {
    // Verificar que sea propiedad propia (no heredada)
    if (Object.hasOwn(item, key)) {
      propCount++;
      const value = item[key];
      const type = Array.isArray(value) ? "array" : typeof value;
      console.log(`  [${propCount}] ${key.padEnd(18)} = ${value} (${type})`);
    }
  }
  
  console.log(`\n  Total de propiedades: ${propCount}`);
};

// ============================================
// SPREAD OPERATOR
// ============================================

/**
 * Aplica una actualización inmutable a un elemento
 * @param {Object} item - El objeto original
 * @param {Object} changes - Las propiedades a actualizar
 * @returns {Object} Nuevo objeto con los cambios aplicados
 */
const updateItem = (item, changes) => {
  // Crear nuevo objeto sin modificar el original
  return { ...item, ...changes };
};

// ============================================
// OPERACIONES CON EL ARRAY
// ============================================

/**
 * Filtra los instructores activos
 * @returns {Object[]} Array de instructores activos
 */
const getActive = () => {
  return items.filter(item => item.active === true);
};

/**
 * Busca un instructor por su id
 * @param {number} id - El id a buscar
 * @returns {Object|undefined} El instructor encontrado o undefined
 */
const findById = (id) => {
  return items.find(item => item.id === id);
};

/**
 * Agrega una propiedad calculada a cada instructor
 * @returns {Object[]} Nuevo array con la propiedad adicional
 */
const addCalculatedProp = () => {
  // Agregar "sesionesAnuales" calculado como sessionsPerWeek * 52
  return items.map(item => ({
    ...item,
    sessionesAnuales: item.sessionsPerWeek * 52,
    experienciaLevel: item.experience >= 10 ? "Senior" : 
                     item.experience >= 5 ? "Intermedio" : "Junior"
  }));
};

/**
 * Ordena los instructores por experiencia (sin mutar el original)
 * @param {boolean} ascending - true para ascendente, false para descendente
 * @returns {Object[]} Nuevo array ordenado
 */
const sortByExperience = (ascending = true) => {
  // Crear copia y ordenar sin mutar el original
  return [...items].sort((a, b) => {
    return ascending ? a.experience - b.experience : b.experience - a.experience;
  });
};

/**
 * Obtiene un resumen compacto de cada instructor
 * @returns {Object[]} Array de objetos con solo propiedades esenciales
 */
const getSummary = () => {
  return items.map(item => ({
    id: item.id,
    name: item.name,
    specialty: item.specialty,
    active: item.active
  }));
};

// ============================================
// FUNCIONES ADICIONALES
// ============================================

/**
 * Agrupa instructores por especialidad
 * @returns {Object} Objeto con especialidades como claves
 */
const groupBySpecialty = () => {
  const grouped = {};
  
  items.forEach(item => {
    if (!grouped[item.specialty]) {
      grouped[item.specialty] = [];
    }
    grouped[item.specialty].push(item.name);
  });
  
  return grouped;
};

/**
 * Cuenta instructores por nivel de experiencia
 * @returns {Object} Conteo por nivel
 */
const countByExperienceLevel = () => {
  const counts = { Junior: 0, Intermedio: 0, Senior: 0 };
  
  items.forEach(item => {
    if (item.experience >= 10) {
      counts.Senior++;
    } else if (item.experience >= 5) {
      counts.Intermedio++;
    } else {
      counts.Junior++;
    }
  });
  
  return counts;
};

// ============================================
// REPORTE FINAL
// ============================================

/**
 * Imprime el reporte completo del catálogo
 */
const buildReport = () => {
  console.log("\n" + "=".repeat(70));
  console.log(`📦 CATÁLOGO: ${DOMAIN_NAME.toUpperCase()}`);
  console.log("=".repeat(70));
  
  // Total de elementos
  console.log(`\n📊 Resumen General:`);
  console.log(`   Total de ${VALUE_LABEL}: ${items.length}`);
  
  // Cuántos están activos
  const activeItems = getActive();
  console.log(`   Activos: ${activeItems.length}`);
  console.log(`   Inactivos: ${items.length - activeItems.length}`);
  
  // Estadísticas de experiencia
  console.log(`\n📈 Experiencia (años):`);
  const experiences = items.map(item => item.experience);
  const avgExp = experiences.reduce((sum, exp) => sum + exp, 0) / experiences.length;
  console.log(`   Promedio: ${avgExp.toFixed(1)} años`);
  console.log(`   Máximo: ${Math.max(...experiences)} años`);
  console.log(`   Mínimo: ${Math.min(...experiences)} años`);
  
  // Estadísticas de sesiones
  console.log(`\n📅 Sesiones por semana:`);
  const activeSessions = activeItems.map(item => item.sessionsPerWeek);
  const totalSessions = activeSessions.reduce((sum, s) => sum + s, 0);
  console.log(`   Total semanal: ${totalSessions} sesiones`);
  console.log(`   Total mensual estimado: ${totalSessions * 4} sesiones`);
  
  // Agrupación por especialidad
  console.log(`\n🎯 Por Especialidad:`);
  const grouped = groupBySpecialty();
  Object.entries(grouped).forEach(([specialty, instructors]) => {
    console.log(`   ${specialty}: ${instructors.join(", ")}`);
  });
  
  // Nivel de experiencia
  console.log(`\n🏅 Por Nivel de Experiencia:`);
  const levelCounts = countByExperienceLevel();
  Object.entries(levelCounts).forEach(([level, count]) => {
    console.log(`   ${level}: ${count} instructor(es)`);
  });
  
  // Listar todos ordenados por experiencia (descendente)
  console.log(`\n👥 Instructores (ordenados por experiencia):`);
  const sorted = sortByExperience(false);
  sorted.forEach((item, index) => {
    const statusIcon = item.active ? "✅" : "❌";
    console.log(`   ${index + 1}. ${item.name.padEnd(20)} | ${item.experience} años | ${item.specialty.padEnd(25)} ${statusIcon}`);
  });
  
  // Instructor con más experiencia
  const mostExperienced = sorted[0];
  console.log(`\n🏆 Instructor con más experiencia:`);
  console.log(`   ${mostExperienced.name} - ${mostExperienced.experience} años en ${mostExperienced.specialty}`);
  
  // Instructor con menos experiencia
  const leastExperienced = sorted[sorted.length - 1];
  console.log(`\n🌱 Instructor más nuevo:`);
  console.log(`   ${leastExperienced.name} - ${leastExperienced.experience} años en ${leastExperienced.specialty}`);
  
  // Instructor con mejor rating
  const bestRated = [...items].sort((a, b) => b.rating - a.rating)[0];
  console.log(`\n⭐ Instructor mejor valorado:`);
  console.log(`   ${bestRated.name} - Rating: ${bestRated.rating}/5.0`);
  
  console.log("\n" + "=".repeat(70));
};

// ============================================
// EJECUCIÓN PRINCIPAL
// ============================================

console.log(`\n🚀 Iniciando catálogo: ${DOMAIN_NAME}`);
console.log(`   Total de ${VALUE_LABEL}: ${items.length}\n`);

// 1. Inspeccionar primer instructor
console.log("=".repeat(70));
console.log("1️⃣ INSPECCIÓN CON Object.entries()");
console.log("=".repeat(70));
inspectItem(items[0]);

// 2. Calcular estadísticas de experiencia
console.log("\n" + "=".repeat(70));
console.log("2️⃣ ESTADÍSTICAS NUMÉRICAS");
console.log("=".repeat(70));
calculateStats("experience");
calculateStats("rating");
calculateStats("sessionsPerWeek");

// 3. Mostrar todos con propiedades opcionales
console.log("\n" + "=".repeat(70));
console.log("3️⃣ LISTADO CON PROPIEDADES OPCIONALES (Object.hasOwn)");
console.log("=".repeat(70));
items.forEach(showWithOptionals);

// 4. Imprimir todas las propiedades del primer instructor
console.log("\n" + "=".repeat(70));
console.log("4️⃣ ITERACIÓN CON for...in");
console.log("=".repeat(70));
printAllProperties(items[0]);
printAllProperties(items[3]);  // Uno con awards

// 5. Demostrar updateItem (spread operator)
console.log("\n" + "=".repeat(70));
console.log("5️⃣ ACTUALIZACIÓN INMUTABLE (Spread Operator)");
console.log("=".repeat(70));

const original = items[2];
console.log(`\n📌 Original:`);
console.log(`   ${original.name} - Activo: ${original.active}, Sesiones: ${original.sessionsPerWeek}`);

const updated = updateItem(original, { active: true, sessionsPerWeek: 8 });
console.log(`\n✏️  Actualizado (nuevo objeto):`);
console.log(`   ${updated.name} - Activo: ${updated.active}, Sesiones: ${updated.sessionsPerWeek}`);

console.log(`\n✓ Original NO modificado:`);
console.log(`   ${original.name} - Activo: ${original.active}, Sesiones: ${original.sessionsPerWeek}`);

// 6. Mostrar instructores activos
console.log("\n" + "=".repeat(70));
console.log("6️⃣ FILTRADO: INSTRUCTORES ACTIVOS");
console.log("=".repeat(70));

const activeInstructors = getActive();
console.log(`\nTotal activos: ${activeInstructors.length} de ${items.length}\n`);
activeInstructors.forEach(item => {
  console.log(`   ✅ ${item.name} (${item.specialty}) - ${item.sessionsPerWeek} sesiones/semana`);
});

// 7. Demostrar findById
console.log("\n" + "=".repeat(70));
console.log("7️⃣ BÚSQUEDA POR ID");
console.log("=".repeat(70));

const found = findById(4);
console.log(`\n🔎 Buscando ID 4:`);
if (found) {
  console.log(`   ✓ Encontrado: ${found.name} (${found.specialty})`);
} else {
  console.log(`   ✗ No encontrado`);
}

const notFound = findById(999);
console.log(`\n🔎 Buscando ID 999:`);
if (notFound) {
  console.log(`   ✓ Encontrado: ${notFound.name}`);
} else {
  console.log(`   ✗ No encontrado`);
}

// 8. Mostrar con propiedades calculadas
console.log("\n" + "=".repeat(70));
console.log("8️⃣ TRANSFORMACIÓN: PROPIEDADES CALCULADAS");
console.log("=".repeat(70));

const withCalculated = addCalculatedProp();
console.log(`\nInstructores con sesiones anuales y nivel:\n`);
withCalculated.forEach(item => {
  console.log(`   ${item.name.padEnd(20)} | Nivel: ${item.experienciaLevel.padEnd(12)} | ${item.sessionesAnuales} sesiones/año`);
});

// 9. Mostrar ordenados
console.log("\n" + "=".repeat(70));
console.log("9️⃣ ORDENAMIENTO POR EXPERIENCIA");
console.log("=".repeat(70));

console.log(`\n⬆️  Ascendente (menos a más experiencia):\n`);
const ascending = sortByExperience(true);
ascending.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.name.padEnd(20)} - ${item.experience} años`);
});

console.log(`\n⬇️  Descendente (más a menos experiencia):\n`);
const descending = sortByExperience(false);
descending.forEach((item, index) => {
  console.log(`   ${index + 1}. ${item.name.padEnd(20)} - ${item.experience} años`);
});

// 10. Reporte final
console.log("\n" + "=".repeat(70));
console.log("🔟 REPORTE FINAL");
console.log("=".repeat(70));
buildReport();

console.log("\n✅ Catálogo completado - 🧘‍♀️ Namaste\n");
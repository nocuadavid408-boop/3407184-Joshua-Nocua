// ============================================
// SEMANA 08 — PROYECTO: Gestión de Inventario
// ============================================
//
// Dominio: Meditación y Mindfulness
// Autor: Joshua Nocua
// Fecha: Abril 2026
//
// Sistema de gestión de inventario de equipos
// y materiales para el Centro de Meditación Zen
//
// ============================================
 
// ---- CONFIGURA TU DOMINIO ----
const DOMAIN_NAME = "Equipos y Materiales de Meditación";
const VALUE_LABEL = "artículos";
 
// ============================================
// 1. ARRAY INICIAL — Define tu inventario
// ============================================
 
// Inventario de equipos y materiales del centro
const items = [
  { 
    id: 1, 
    name: "Cojín de Meditación Zafu", 
    category: "mobiliario",
    quantity: 25,
    price: 45000,
    available: true,
    supplier: "Zen Supplies Co."
  },
  { 
    id: 2, 
    name: "Tapete de Yoga Premium", 
    category: "accesorios",
    quantity: 30,
    price: 85000,
    available: true,
    supplier: "Yoga World"
  },
  { 
    id: 3, 
    name: "Incienso Natural Sándalo", 
    category: "aromaterapia",
    quantity: 100,
    price: 8000,
    available: true,
    supplier: "Aromas Zen"
  },
  { 
    id: 4, 
    name: "Campana Tibetana Grande", 
    category: "instrumentos",
    quantity: 5,
    price: 120000,
    available: false,
    supplier: "Tibet Imports"
  },
  { 
    id: 5, 
    name: "Manta de Meditación", 
    category: "textiles",
    quantity: 15,
    price: 35000,
    available: true,
    supplier: "Textiles Paz"
  },
  {
    id: 6,
    name: "Bloque de Yoga Corcho",
    category: "accesorios",
    quantity: 20,
    price: 25000,
    available: true,
    supplier: "Yoga World"
  },
  {
    id: 7,
    name: "Aceite Esencial Lavanda",
    category: "aromaterapia",
    quantity: 50,
    price: 18000,
    available: true,
    supplier: "Aromas Zen"
  }
];
 
// ============================================
// 2. FUNCIONES DE GESTIÓN
// ============================================
 
/**
 * Agrega un nuevo elemento al inventario
 * @param {Object} newItem - Elemento a agregar
 */
const addItem = (newItem) => {
  items.push(newItem);
  console.log(`✅ Agregado: ${newItem.name} (${newItem.quantity} unidades)`);
};
 
/**
 * Elimina el último elemento del inventario
 * @returns {Object} El elemento eliminado
 */
const removeLastItem = () => {
  const removed = items.pop();
  if (removed) {
    console.log(`❌ Eliminado (último): ${removed.name}`);
  } else {
    console.log("⚠️  El inventario está vacío");
  }
  return removed;
};
 
/**
 * Agrega un elemento prioritario al inicio del inventario
 * @param {Object} priorityItem - Elemento a agregar con prioridad
 */
const addPriorityItem = (priorityItem) => {
  items.unshift(priorityItem);
  console.log(`⭐ Elemento prioritario agregado: ${priorityItem.name}`);
};
 
/**
 * Elimina el primer elemento del inventario
 * @returns {Object} El elemento eliminado
 */
const removeFirstItem = () => {
  const removed = items.shift();
  if (removed) {
    console.log(`❌ Eliminado (primero): ${removed.name}`);
  }
  return removed;
};
 
/**
 * Elimina un elemento por su posición (índice)
 * @param {number} index - Posición del elemento a eliminar
 */
const removeByIndex = (index) => {
  if (index >= 0 && index < items.length) {
    const removed = items.splice(index, 1)[0];
    console.log(`🗑️  Eliminado en posición ${index}: ${removed.name}`);
  } else {
    console.log(`⚠️  Índice ${index} fuera de rango`);
  }
};
 
/**
 * Obtiene todos los elementos disponibles
 * @returns {Array} Array de elementos disponibles
 */
const getAvailableItems = () => {
  return items.filter(item => item.available === true);
};
 
/**
 * Obtiene elementos por categoría
 * @param {string} category - Categoría a buscar
 * @returns {Array} Array de elementos de esa categoría
 */
const getByCategory = (category) => {
  return items.filter(item => item.category === category);
};
 
/**
 * Obtiene elementos con stock bajo (menos de cierta cantidad)
 * @param {number} threshold - Umbral mínimo
 * @returns {Array} Array de elementos con stock bajo
 */
const getLowStockItems = (threshold = 10) => {
  return items.filter(item => item.quantity < threshold);
};
 
/**
 * Busca un elemento por su nombre
 * @param {string} name - Nombre a buscar
 * @returns {Object|undefined} El elemento encontrado o undefined
 */
const findByName = (name) => {
  return items.find(item => item.name === name);
};
 
/**
 * Busca un elemento por su ID
 * @param {number} id - ID a buscar
 * @returns {Object|undefined} El elemento encontrado o undefined
 */
const findById = (id) => {
  return items.find(item => item.id === id);
};
 
/**
 * Busca un elemento por proveedor
 * @param {string} supplier - Proveedor a buscar
 * @returns {Object|undefined} El primer elemento de ese proveedor
 */
const findBySupplier = (supplier) => {
  return items.find(item => item.supplier === supplier);
};
 
/**
 * Formatea un elemento para mostrar en el reporte
 * @param {Object} item - Elemento a formatear
 * @returns {string} Texto formateado
 */
const formatItem = (item) => {
  const statusIcon = item.available ? "✅" : "❌";
  const stockAlert = item.quantity < 10 ? " ⚠️ STOCK BAJO" : "";
  return `[${item.id}] ${item.name} | ${item.category} | Stock: ${item.quantity} | $${item.price.toLocaleString('es-CO')} COP ${statusIcon}${stockAlert}`;
};
 
/**
 * Formatea versión resumida
 * @param {Object} item - Elemento a formatear
 * @returns {string} Texto resumido
 */
const formatItemShort = (item) => {
  return `${item.name} (${item.quantity} unidades)`;
};
 
// ============================================
// 3. REPORTE
// ============================================
 
console.log(`\n${"=".repeat(70)}`);
console.log(`📦 GESTIÓN DE ${DOMAIN_NAME.toUpperCase()}`);
console.log(`${"=".repeat(70)}\n`);
 
// Estado inicial
console.log(`📋 Inventario inicial (${items.length} ${VALUE_LABEL}):`);
console.log("-".repeat(70));
items.forEach((item, index) => {
  console.log(`  ${index + 1}. ${formatItem(item)}`);
});
 
console.log("\n" + "=".repeat(70));
console.log("🔧 OPERACIONES DE MUTACIÓN");
console.log("=".repeat(70) + "\n");
 
// Agregar nuevo elemento
console.log("➕ Agregando nuevo artículo...");
addItem({ 
  id: 8, 
  name: "Difusor de Aromas Ultrasónico", 
  category: "aromaterapia",
  quantity: 12,
  price: 75000,
  available: true,
  supplier: "Aromas Zen"
});
 
// Agregar elemento prioritario
console.log("\n⭐ Agregando artículo prioritario...");
addPriorityItem({ 
  id: 0, 
  name: "Kit de Emergencia Meditación", 
  category: "kits",
  quantity: 3,
  price: 150000,
  available: true,
  supplier: "Zen Supplies Co."
});
 
// Eliminar elemento por índice
console.log("\n🗑️  Eliminando artículo en posición 3...");
removeByIndex(3);
 
// Eliminar último elemento
console.log("\n❌ Eliminando último artículo...");
removeLastItem();
 
console.log("\n" + "=".repeat(70));
console.log("📊 INVENTARIO DESPUÉS DE MUTACIONES");
console.log("=".repeat(70) + "\n");
 
console.log(`Total actual: ${items.length} ${VALUE_LABEL}\n`);
items.forEach((item, index) => {
  console.log(`  ${index + 1}. ${formatItem(item)}`);
});
 
console.log("\n" + "=".repeat(70));
console.log("🔍 BÚSQUEDA Y FILTRADO");
console.log("=".repeat(70) + "\n");
 
// Buscar por nombre
console.log("🔎 Buscando 'Tapete de Yoga Premium':");
const foundItem = findByName("Tapete de Yoga Premium");
if (foundItem) {
  console.log(`   ✓ Encontrado: ${formatItem(foundItem)}`);
} else {
  console.log("   ✗ No encontrado");
}
 
// Buscar por ID
console.log("\n🔎 Buscando artículo con ID 5:");
const foundById = findById(5);
if (foundById) {
  console.log(`   ✓ Encontrado: ${formatItem(foundById)}`);
} else {
  console.log("   ✗ No encontrado");
}
 
// Filtrar elementos disponibles
console.log("\n✅ Artículos disponibles:");
const availableItems = getAvailableItems();
console.log(`   Total disponibles: ${availableItems.length} de ${items.length}`);
availableItems.forEach(item => {
  console.log(`   • ${formatItemShort(item)}`);
});
 
// Filtrar por categoría
console.log("\n🏷️  Artículos de categoría 'aromaterapia':");
const aromatherapy = getByCategory("aromaterapia");
console.log(`   Total en esta categoría: ${aromatherapy.length}`);
aromatherapy.forEach(item => {
  console.log(`   • ${formatItemShort(item)}`);
});
 
// Stock bajo
console.log("\n⚠️  Artículos con stock bajo (< 10 unidades):");
const lowStock = getLowStockItems(10);
if (lowStock.length > 0) {
  console.log(`   Total con stock bajo: ${lowStock.length}`);
  lowStock.forEach(item => {
    console.log(`   • ${item.name}: ${item.quantity} unidades`);
  });
} else {
  console.log("   ✓ Todos los artículos tienen stock adecuado");
}
 
console.log("\n" + "=".repeat(70));
console.log("🔄 TRANSFORMACIÓN CON MAP");
console.log("=".repeat(70) + "\n");
 
// Array de solo nombres
console.log("📝 Lista de nombres de artículos:");
const itemNames = items.map(item => item.name);
itemNames.forEach((name, index) => {
  console.log(`   ${index + 1}. ${name}`);
});
 
// Precios con descuento del 15%
console.log("\n💰 Precios con descuento del 15%:");
const discountedPrices = items.map(item => ({
  name: item.name,
  originalPrice: item.price,
  discountedPrice: Math.round(item.price * 0.85),
  savings: Math.round(item.price * 0.15)
}));
 
discountedPrices.forEach(item => {
  console.log(`   ${item.name}:`);
  console.log(`      Precio original: $${item.originalPrice.toLocaleString('es-CO')} COP`);
  console.log(`      Con descuento:   $${item.discountedPrice.toLocaleString('es-CO')} COP`);
  console.log(`      Ahorras:         $${item.savings.toLocaleString('es-CO')} COP`);
});
 
// Valor total del inventario
console.log("\n💵 Valor total del inventario:");
const inventoryValues = items.map(item => ({
  name: item.name,
  totalValue: item.price * item.quantity
}));
 
let grandTotal = 0;
inventoryValues.forEach(item => {
  grandTotal += item.totalValue;
  console.log(`   ${item.name}: $${item.totalValue.toLocaleString('es-CO')} COP`);
});
console.log(`\n   🏦 VALOR TOTAL: $${grandTotal.toLocaleString('es-CO')} COP`);
 
console.log("\n" + "=".repeat(70));
console.log("📸 SNAPSHOT INMUTABLE");
console.log("=".repeat(70) + "\n");
 
// Crear copia inmutable con spread
const snapshot = [...items];
console.log(`Snapshot creado con ${snapshot.length} artículos`);
 
// Agregar elemento al snapshot sin modificar el original
snapshot.push({ 
  id: 99, 
  name: "Artículo Temporal (solo en snapshot)", 
  category: "temporal",
  quantity: 1,
  price: 0,
  available: false,
  supplier: "N/A"
});
 
console.log(`\nInventario original: ${items.length} artículos`);
console.log(`Snapshot modificado: ${snapshot.length} artículos`);
console.log(`✓ El array original NO fue modificado\n`);
 
console.log("Último elemento del snapshot:");
console.log(`   ${formatItem(snapshot[snapshot.length - 1])}`);
 
console.log("\n" + "=".repeat(70));
console.log("📊 RESUMEN FINAL");
console.log("=".repeat(70) + "\n");
 
const activeCount = getAvailableItems().length;
const inactiveCount = items.length - activeCount;
const lowStockCount = getLowStockItems(10).length;
 
// Calcular totales por categoría
const categories = [...new Set(items.map(item => item.category))];
console.log("📈 Estadísticas por categoría:");
categories.forEach(category => {
  const categoryItems = getByCategory(category);
  const totalQuantity = categoryItems.reduce((sum, item) => sum + item.quantity, 0);
  console.log(`   ${category}: ${categoryItems.length} tipos, ${totalQuantity} unidades totales`);
});
 
console.log(`\n📦 Resumen general:`);
console.log(`   Total en inventario:     ${items.length} ${VALUE_LABEL}`);
console.log(`   Disponibles:             ${activeCount}`);
console.log(`   No disponibles:          ${inactiveCount}`);
console.log(`   Con stock bajo:          ${lowStockCount}`);
console.log(`   Categorías diferentes:   ${categories.length}`);
console.log(`   Valor total inventario:  $${grandTotal.toLocaleString('es-CO')} COP`);
 
console.log(`\n${"=".repeat(70)}`);
console.log("✅ Reporte completado - 🧘‍♀️ Namaste");
console.log(`${"=".repeat(70)}\n`);
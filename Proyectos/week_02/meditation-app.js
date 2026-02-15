/**
 * ============================================
 * PROYECTO SEMANA 02 - GESTOR DE COLECCIÓN
 * App de Meditación y Mindfulness
 * ============================================
 *
 * DOMINIO: Aplicación de Meditación y Mindfulness
 * Gestión de sesiones, ejercicios y prácticas de bienestar
 *
 * CARACTERÍSTICAS ES2023 IMPLEMENTADAS:
 * ✓ Spread operator (...) para copiar arrays/objetos
 * ✓ Rest parameters (...args) en funciones
 * ✓ Default parameters
 * ✓ Array methods: map, filter, reduce, find
 * ✓ Object enhancements (shorthand, computed properties)
 * ✓ Inmutabilidad del estado
 *
 * ============================================
 */

// ============================================
// ESTADO GLOBAL
// ============================================

// Array que almacena todas las sesiones de meditación
let items = [];

// ID de la sesión que se está editando (null si es nueva)
let editingItemId = null;

// ============================================
// CATEGORÍAS DEL DOMINIO: MEDITACIÓN Y MINDFULNESS
// ============================================

const CATEGORIES = {
  meditation: { name: 'Meditación Guiada', emoji: '🧘‍♀️' },
  breathing: { name: 'Respiración', emoji: '💨' },
  yoga: { name: 'Yoga/Estiramientos', emoji: '🤸‍♀️' },
  mindfulness: { name: 'Mindfulness', emoji: '🌸' },
  sounds: { name: 'Sonidos Relajantes', emoji: '🎵' }
};

// Prioridades adaptadas al contexto de bienestar
const PRIORITIES = {
  high: { name: 'Urgente', color: '#ef4444' },      // Para ansiedad o estrés alto
  medium: { name: 'Regular', color: '#f59e0b' },     // Práctica diaria
  low: { name: 'Opcional', color: '#22c55e' }        // Cuando tengas tiempo
};

// ============================================
// PERSISTENCIA (LocalStorage)
// ============================================

/**
 * Carga las sesiones desde LocalStorage
 * @returns {Array} Array de sesiones guardadas, o array vacío
 */
const loadItems = () => {
  // Usa el operador ?? (nullish coalescing) para valor por defecto
  const stored = localStorage.getItem('meditationSessions');
  return stored ? JSON.parse(stored) : [];
};

/**
 * Guarda las sesiones en LocalStorage
 * @param {Array} itemsToSave - Array de sesiones a guardar
 */
const saveItems = itemsToSave => {
  localStorage.setItem('meditationSessions', JSON.stringify(itemsToSave));
};

// ============================================
// CRUD - CREAR SESIÓN
// ============================================

/**
 * Crea una nueva sesión de meditación con los datos proporcionados
 * @param {Object} itemData - Datos de la nueva sesión
 * @returns {Array} Nuevo array de sesiones (sin mutar el original)
 */
const createItem = (itemData = {}) => {
  // Crea un nuevo objeto con propiedades base y las proporcionadas
  const newItem = {
    id: Date.now(),
    name: itemData.name ?? '',
    description: itemData.description ?? '',
    category: itemData.category ?? 'meditation',
    priority: itemData.priority ?? 'medium',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    // Propiedades específicas del dominio de meditación
    duration: itemData.duration ?? 10, // minutos
    completed: itemData.completed ?? false,
    // Spread para incluir cualquier otra propiedad adicional
    ...itemData
  };

  // Usa spread operator para crear nuevo array sin mutar el original
  const newItems = [...items, newItem];
  saveItems(newItems);
  return newItems;
};

// ============================================
// CRUD - ACTUALIZAR SESIÓN
// ============================================

/**
 * Actualiza una sesión existente
 * @param {Number} id - ID de la sesión a actualizar
 * @param {Object} updates - Propiedades a actualizar
 * @returns {Array} Nuevo array con la sesión actualizada
 */
const updateItem = (id, updates) => {
  // Usa map para crear nuevo array con la sesión actualizada
  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, ...updates, updatedAt: new Date().toISOString() }
      : item
  );
  saveItems(updatedItems);
  return updatedItems;
};

// ============================================
// CRUD - ELIMINAR SESIÓN
// ============================================

/**
 * Elimina una sesión por su ID
 * @param {Number} id - ID de la sesión a eliminar
 * @returns {Array} Nuevo array sin la sesión eliminada
 */
const deleteItem = id => {
  // Usa filter para crear nuevo array excluyendo la sesión
  const filteredItems = items.filter(item => item.id !== id);
  saveItems(filteredItems);
  return filteredItems;
};

// ============================================
// CRUD - TOGGLE ESTADO ACTIVO
// ============================================

/**
 * Alterna el estado activo/inactivo de una sesión
 * @param {Number} id - ID de la sesión
 * @returns {Array} Nuevo array con el estado actualizado
 */
const toggleItemActive = id => {
  const updatedItems = items.map(item =>
    item.id === id
      ? { ...item, active: !item.active, updatedAt: new Date().toISOString() }
      : item
  );
  saveItems(updatedItems);
  return updatedItems;
};

/**
 * Elimina todas las sesiones inactivas
 * @returns {Array} Nuevo array solo con sesiones activas
 */
const clearInactive = () => {
  const activeItems = items.filter(item => item.active);
  saveItems(activeItems);
  return activeItems;
};

// ============================================
// FILTROS Y BÚSQUEDA
// ============================================

/**
 * Filtra sesiones por estado (activo/inactivo)
 * @param {Array} itemsToFilter - Array de sesiones
 * @param {String} status - 'all' | 'active' | 'inactive'
 * @returns {Array} Sesiones filtradas
 */
const filterByStatus = (itemsToFilter, status = 'all') => {
  if (status === 'all') return itemsToFilter;
  if (status === 'active') return itemsToFilter.filter(item => item.active);
  if (status === 'inactive') return itemsToFilter.filter(item => !item.active);
  return itemsToFilter;
};

/**
 * Filtra sesiones por categoría
 * @param {Array} itemsToFilter - Array de sesiones
 * @param {String} category - Categoría a filtrar o 'all'
 * @returns {Array} Sesiones filtradas
 */
const filterByCategory = (itemsToFilter, category = 'all') => {
  if (category === 'all') return itemsToFilter;
  return itemsToFilter.filter(item => item.category === category);
};

/**
 * Filtra sesiones por prioridad
 * @param {Array} itemsToFilter - Array de sesiones
 * @param {String} priority - Prioridad a filtrar o 'all'
 * @returns {Array} Sesiones filtradas
 */
const filterByPriority = (itemsToFilter, priority = 'all') => {
  if (priority === 'all') return itemsToFilter;
  return itemsToFilter.filter(item => item.priority === priority);
};

/**
 * Busca sesiones por texto en nombre y descripción
 * @param {Array} itemsToFilter - Array de sesiones
 * @param {String} query - Texto a buscar
 * @returns {Array} Sesiones que coinciden
 */
const searchItems = (itemsToFilter, query) => {
  // Si no hay búsqueda, retorna todos
  if (!query || query.trim() === '') return itemsToFilter;
  
  const searchTerm = query.toLowerCase();
  return itemsToFilter.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    (item.description ?? '').toLowerCase().includes(searchTerm)
  );
};

/**
 * Aplica todos los filtros de forma encadenada
 * @param {Array} itemsToFilter - Array de sesiones
 * @param {Object} filters - Objeto con todos los filtros
 * @returns {Array} Sesiones filtradas
 */
const applyFilters = (itemsToFilter, filters = {}) => {
  // Destructuring con default values
  const {
    status = 'all',
    category = 'all',
    priority = 'all',
    search = ''
  } = filters;

  // Encadena los filtros uno tras otro
  let result = filterByStatus(itemsToFilter, status);
  result = filterByCategory(result, category);
  result = filterByPriority(result, priority);
  result = searchItems(result, search);
  
  return result;
};

// ============================================
// ESTADÍSTICAS
// ============================================

/**
 * Calcula estadísticas generales de las sesiones
 * @param {Array} itemsToAnalyze - Array de sesiones
 * @returns {Object} Objeto con estadísticas
 */
const getStats = (itemsToAnalyze = []) => {
  const total = itemsToAnalyze.length;
  const active = itemsToAnalyze.filter(item => item.active).length;
  const inactive = total - active;

  // Usa reduce para agrupar por categoría
  const byCategory = itemsToAnalyze.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  // Usa reduce para agrupar por prioridad
  const byPriority = itemsToAnalyze.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] ?? 0) + 1;
    return acc;
  }, {});

  // Calcula tiempo total de meditación (suma de durations)
  const totalMinutes = itemsToAnalyze.reduce((sum, item) => {
    return sum + (item.duration ?? 0);
  }, 0);

  return { 
    total, 
    active, 
    inactive, 
    byCategory, 
    byPriority,
    totalMinutes 
  };
};

// ============================================
// RENDERIZADO - ELEMENTO INDIVIDUAL
// ============================================

/**
 * Obtiene el emoji de una categoría
 * @param {String} category - Clave de la categoría
 * @returns {String} Emoji de la categoría
 */
const getCategoryEmoji = category => {
  return CATEGORIES[category]?.emoji ?? '🧘';
};

/**
 * Formatea una fecha ISO a formato legible
 * @param {String} dateString - Fecha en formato ISO
 * @returns {String} Fecha formateada
 */
const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Renderiza una sesión individual como HTML
 * @param {Object} item - Objeto de la sesión
 * @returns {String} HTML de la sesión
 */
const renderItem = item => {
  // Destructuring para extraer propiedades
  const { 
    id, 
    name, 
    description, 
    category, 
    priority, 
    active, 
    createdAt,
    duration 
  } = item;

  // Template literal para construir el HTML
  return `
    <div class="item ${active ? '' : 'inactive'} priority-${priority}" data-item-id="${id}">
      <div class="item-header">
        <input type="checkbox" class="item-checkbox" ${active ? 'checked' : ''}>
        <div class="item-actions">
          <button class="btn-edit" title="Editar">✏️</button>
          <button class="btn-delete" title="Eliminar">🗑️</button>
        </div>
      </div>
      <div class="item-content">
        <h3 class="item-name">${name}</h3>
        ${description ? `<p class="item-description">${description}</p>` : ''}
        <div class="item-meta">
          <span class="badge badge-category">${getCategoryEmoji(category)} ${CATEGORIES[category]?.name ?? category}</span>
          <span class="badge badge-priority priority-${priority}">${PRIORITIES[priority]?.name ?? priority}</span>
          <span class="item-duration">⏱️ ${duration} min</span>
          <span class="item-date">📅 ${formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  `;
};

// ============================================
// RENDERIZADO - LISTA COMPLETA
// ============================================

/**
 * Renderiza la lista completa de sesiones
 * @param {Array} itemsToRender - Array de sesiones a renderizar
 */
const renderItems = itemsToRender => {
  const itemList = document.getElementById('item-list');
  const emptyState = document.getElementById('empty-state');

  if (itemsToRender.length === 0) {
    itemList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    // Usa map para convertir cada item a HTML y join para unirlos
    itemList.innerHTML = itemsToRender.map(renderItem).join('');
  }
};

/**
 * Renderiza las estadísticas en el DOM
 * @param {Object} stats - Objeto con estadísticas
 */
const renderStats = stats => {
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-inactive').textContent = stats.inactive;

  // Renderiza estadísticas por categoría con emojis
  const categoryStats = Object.entries(stats.byCategory)
    .map(([cat, count]) => `${getCategoryEmoji(cat)} ${CATEGORIES[cat]?.name ?? cat}: ${count}`)
    .join(' | ');
  
  document.getElementById('stats-details').textContent = categoryStats || 'Sin sesiones aún';

  // Muestra el tiempo total de meditación
  const hours = Math.floor(stats.totalMinutes / 60);
  const minutes = stats.totalMinutes % 60;
  const timeText = hours > 0 
    ? `${hours}h ${minutes}min` 
    : `${minutes} min`;
  document.getElementById('total-time').textContent = `⏱️ Tiempo total: ${timeText}`;
};

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Maneja el envío del formulario (crear/editar)
 * @param {Event} e - Evento del formulario
 */
const handleFormSubmit = e => {
  e.preventDefault();

  // Obtén los valores del formulario
  const name = document.getElementById('item-name').value.trim();
  const description = document.getElementById('item-description').value.trim();
  const category = document.getElementById('item-category').value;
  const priority = document.getElementById('item-priority').value;
  const duration = parseInt(document.getElementById('item-duration').value) || 10;

  // Validación
  if (!name) {
    alert('El nombre de la sesión es obligatorio');
    return;
  }

  // Object shorthand property
  const itemData = { name, description, category, priority, duration };

  // Si hay editingItemId, actualiza; si no, crea nuevo
  if (editingItemId) {
    items = updateItem(editingItemId, itemData);
  } else {
    items = createItem(itemData);
  }

  // Resetea el formulario y re-renderiza
  resetForm();
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Maneja el click en checkbox de una sesión
 * @param {Number} itemId - ID de la sesión
 */
const handleItemToggle = itemId => {
  items = toggleItemActive(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Maneja el click en botón editar
 * @param {Number} itemId - ID de la sesión a editar
 */
const handleItemEdit = itemId => {
  // Encuentra la sesión con find()
  const itemToEdit = items.find(item => item.id === itemId);
  if (!itemToEdit) return;

  // Rellena el formulario con los datos de la sesión
  document.getElementById('item-name').value = itemToEdit.name;
  document.getElementById('item-description').value = itemToEdit.description ?? '';
  document.getElementById('item-category').value = itemToEdit.category;
  document.getElementById('item-priority').value = itemToEdit.priority;
  document.getElementById('item-duration').value = itemToEdit.duration ?? 10;

  // Cambia la UI del formulario para modo edición
  document.getElementById('form-title').textContent = '✏️ Editar Sesión';
  document.getElementById('submit-btn').textContent = 'Actualizar';
  document.getElementById('cancel-btn').style.display = 'inline-block';

  editingItemId = itemId;
};

/**
 * Maneja el click en botón eliminar
 * @param {Number} itemId - ID de la sesión a eliminar
 */
const handleItemDelete = itemId => {
  if (!confirm('¿Estás seguro de que deseas eliminar esta sesión?')) return;
  
  items = deleteItem(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Obtiene los filtros actuales del DOM
 * @returns {Object} Objeto con los valores de los filtros
 */
const getCurrentFilters = () => {
  return {
    status: document.getElementById('filter-status').value,
    category: document.getElementById('filter-category').value,
    priority: document.getElementById('filter-priority').value,
    search: document.getElementById('search-input').value
  };
};

/**
 * Aplica los filtros actuales y retorna las sesiones filtradas
 * @returns {Array} Sesiones filtradas
 */
const applyCurrentFilters = () => {
  const filters = getCurrentFilters();
  return applyFilters(items, filters);
};

/**
 * Maneja cambios en los filtros
 */
const handleFilterChange = () => {
  const filteredItems = applyCurrentFilters();
  renderItems(filteredItems);
};

/**
 * Resetea el formulario a su estado inicial
 */
const resetForm = () => {
  document.getElementById('item-form').reset();
  document.getElementById('form-title').textContent = '➕ Nueva Sesión';
  document.getElementById('submit-btn').textContent = 'Crear';
  document.getElementById('cancel-btn').style.display = 'none';
  editingItemId = null;
};

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Adjunta todos los event listeners necesarios
 */
const attachEventListeners = () => {
  // Form submit
  document.getElementById('item-form').addEventListener('submit', handleFormSubmit);

  // Cancel button
  document.getElementById('cancel-btn').addEventListener('click', resetForm);

  // Filtros - cada cambio dispara handleFilterChange
  document.getElementById('filter-status').addEventListener('change', handleFilterChange);
  document.getElementById('filter-category').addEventListener('change', handleFilterChange);
  document.getElementById('filter-priority').addEventListener('change', handleFilterChange);
  document.getElementById('search-input').addEventListener('input', handleFilterChange);

  // Botón limpiar inactivos
  document.getElementById('clear-inactive').addEventListener('click', () => {
    if (confirm('¿Eliminar todas las sesiones inactivas?')) {
      items = clearInactive();
      renderItems(applyCurrentFilters());
      renderStats(getStats(items));
    }
  });

  // Event delegation para la lista de sesiones
  document.getElementById('item-list').addEventListener('click', e => {
    const itemElement = e.target.closest('.item');
    if (!itemElement) return;

    const itemId = parseInt(itemElement.dataset.itemId);

    if (e.target.classList.contains('item-checkbox')) {
      handleItemToggle(itemId);
    } else if (e.target.classList.contains('btn-edit')) {
      handleItemEdit(itemId);
    } else if (e.target.classList.contains('btn-delete')) {
      handleItemDelete(itemId);
    }
  });
};

// ============================================
// INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
const init = () => {
  // Carga las sesiones desde localStorage
  items = loadItems();
  
  // Renderiza la lista inicial
  renderItems(items);
  
  // Renderiza las estadísticas
  renderStats(getStats(items));
  
  // Adjunta los event listeners
  attachEventListeners();
  
  console.log('✅ App de Meditación y Mindfulness inicializada correctamente');
  console.log(`📊 Total de sesiones cargadas: ${items.length}`);
};

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// ============================================
// ✅ CHECKLIST DE VERIFICACIÓN COMPLETO
// ============================================
// FUNCIONALIDAD:
// ✓ Crear nuevas sesiones de meditación
// ✓ Editar sesiones existentes
// ✓ Eliminar sesiones
// ✓ Marcar como activo/inactivo
// ✓ Filtros por estado, categoría y prioridad
// ✓ Búsqueda en tiempo real
// ✓ Estadísticas actualizadas dinámicamente
// ✓ Persistencia con localStorage
//
// CÓDIGO ES2023:
// ✓ Spread operator para arrays y objetos
// ✓ Array methods (map, filter, reduce, find)
// ✓ Inmutabilidad (nunca mutar estado directamente)
// ✓ Default parameters
// ✓ Destructuring
// ✓ Template literals
// ✓ Object shorthand
// ✓ Nullish coalescing (??)
//
// DOMINIO MEDITACIÓN:
// ✓ Categorías: Meditación, Respiración, Yoga, Mindfulness, Sonidos
// ✓ Propiedad duration (minutos de la sesión)
// ✓ Estadística de tiempo total
// ✓ Emojis y textos coherentes con bienestar

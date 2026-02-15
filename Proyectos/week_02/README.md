# 🧘‍♀️ App de Meditación y Mindfulness

## 📖 Descripción del Proyecto

Aplicación web para gestionar sesiones de meditación, respiración, yoga y prácticas de mindfulness. Implementa características modernas de JavaScript ES2023 con énfasis en **inmutabilidad** y **programación funcional**.

---

## 🎯 Dominio: Salud y Bienestar

### Categorías de Sesiones
- 🧘‍♀️ **Meditación Guiada**: Sesiones con instrucciones paso a paso
- 💨 **Respiración**: Técnicas de respiración consciente
- 🤸‍♀️ **Yoga/Estiramientos**: Posturas y movimientos
- 🌸 **Mindfulness**: Atención plena en el momento presente
- 🎵 **Sonidos Relajantes**: Música y sonidos ambientales

### Prioridades
- 🔴 **Urgente**: Para momentos de ansiedad o estrés alto
- 🟡 **Regular**: Práctica diaria recomendada
- 🟢 **Opcional**: Cuando tengas tiempo extra

---

## ✨ Características Implementadas

### CRUD Completo
- ✅ Crear nuevas sesiones
- ✅ Editar sesiones existentes
- ✅ Eliminar sesiones
- ✅ Marcar como activo/inactivo
- ✅ Eliminar todas las inactivas

### Filtros y Búsqueda
- 🔍 Búsqueda en tiempo real por nombre y descripción
- 📊 Filtro por estado (activas/inactivas/todas)
- 🏷️ Filtro por categoría
- 🎯 Filtro por prioridad
- 🔄 Filtros combinables

### Estadísticas
- 📈 Total de sesiones
- ✅ Sesiones activas
- ❌ Sesiones inactivas
- 📊 Conteo por categoría
- 📊 Conteo por prioridad
- ⏱️ Tiempo total de meditación acumulado

### Persistencia
- 💾 Guardado automático en localStorage
- 🔄 Carga automática al iniciar
- 🔒 Los datos persisten al cerrar el navegador

---

## 🚀 Características ES2023 Utilizadas

### 1. Spread Operator (...)
```javascript
// Copiar arrays sin mutar el original
const newItems = [...items, newItem];

// Copiar y actualizar objetos
const updatedItem = { ...item, ...updates };
```

### 2. Array Methods
```javascript
// map - transformar arrays
items.map(item => renderItem(item));

// filter - filtrar elementos
items.filter(item => item.active);

// reduce - agrupar y acumular
items.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] ?? 0) + 1;
  return acc;
}, {});

// find - encontrar elemento
items.find(item => item.id === itemId);
```

### 3. Destructuring
```javascript
// Extraer propiedades de objetos
const { name, description, category } = item;

// En parámetros de funciones
const { status = 'all', category = 'all' } = filters;
```

### 4. Default Parameters
```javascript
const loadItems = () => { ... };
const createItem = (itemData = {}) => { ... };
const filterByStatus = (itemsToFilter, status = 'all') => { ... };
```

### 5. Template Literals
```javascript
const html = `
  <div class="item ${active ? '' : 'inactive'}">
    <h3>${name}</h3>
    <p>${description}</p>
  </div>
`;
```

### 6. Nullish Coalescing (??)
```javascript
// Valor por defecto solo si es null o undefined
const stored = localStorage.getItem('key') ?? '[]';
const value = item.duration ?? 10;
```

### 7. Object Shorthand
```javascript
// Cuando nombre de variable = nombre de propiedad
const itemData = { name, description, category, priority };
// Equivale a: { name: name, description: description, ... }
```

### 8. Arrow Functions
```javascript
const filterByStatus = (items, status) => {
  return items.filter(item => item.active);
};
```

---

## 🏗️ Arquitectura del Código

### Principio de Inmutabilidad
**NUNCA se muta el estado directamente**. Siempre se crean copias nuevas:

```javascript
// ❌ MAL - Muta el array original
items.push(newItem);

// ✅ BIEN - Crea nuevo array
const newItems = [...items, newItem];
items = newItems;
```

### Estructura de Funciones

#### Estado Global
```javascript
let items = [];
let editingItemId = null;
```

#### Persistencia
- `loadItems()` - Carga desde localStorage
- `saveItems()` - Guarda en localStorage

#### Operaciones CRUD
- `createItem()` - Crear sesión
- `updateItem()` - Actualizar sesión
- `deleteItem()` - Eliminar sesión
- `toggleItemActive()` - Cambiar estado
- `clearInactive()` - Limpiar inactivas

#### Filtros
- `filterByStatus()` - Por estado
- `filterByCategory()` - Por categoría
- `filterByPriority()` - Por prioridad
- `searchItems()` - Búsqueda de texto
- `applyFilters()` - Aplica todos

#### Estadísticas
- `getStats()` - Calcula estadísticas

#### Renderizado
- `renderItem()` - HTML de un item
- `renderItems()` - Lista completa
- `renderStats()` - Estadísticas

#### Event Handlers
- `handleFormSubmit()` - Crear/editar
- `handleItemToggle()` - Toggle checkbox
- `handleItemEdit()` - Editar item
- `handleItemDelete()` - Eliminar item
- `handleFilterChange()` - Cambio en filtros

---

## 📁 Estructura de Archivos

```
proyecto/
├── index.html           # Estructura HTML
├── styles.css          # Estilos CSS (tema oscuro)
├── meditation-app.js   # Lógica JavaScript
└── README.md          # Este archivo
```

---

## 🚀 Cómo Usar

### 1. Instalación
- Descarga los 3 archivos (index.html, styles.css, meditation-app.js)
- Colócalos en la misma carpeta
- Abre `index.html` en tu navegador
- No requiere servidor ni instalación adicional

### 2. Crear una sesión
- Completa el formulario "Nueva Sesión"
- Ingresa el nombre (obligatorio)
- Agrega una descripción (opcional)
- Selecciona categoría y prioridad
- Define la duración en minutos
- Click en "Crear"

### 3. Gestionar sesiones
- ✏️ Click en el lápiz para editar
- 🗑️ Click en la papelera para eliminar
- ☑️ Click en el checkbox para marcar como completada/inactiva

### 4. Buscar y filtrar
- Usa la barra de búsqueda para buscar por texto
- Combina filtros de estado, categoría y prioridad
- Los filtros se aplican en tiempo real

### 5. Ver estadísticas
- Panel superior muestra resumen
- Conteo por categorías
- Tiempo total acumulado

---

## 🎨 Diseño

### Tema Oscuro Moderno
- **Fondo principal**: #0f172a (azul oscuro profundo)
- **Cards**: #1e293b (gris oscuro)
- **Acento primario**: #7c3aed (morado vibrante)
- **Acento secundario**: #10b981 (verde esmeralda)

### Características Visuales
- ✅ Diseño tipo tarjetas en grid
- ✅ Bordes de colores según prioridad
- ✅ Gradiente morado-verde en header
- ✅ Animaciones suaves de hover
- ✅ Responsive para móviles
- ✅ Scrollbar personalizada

---

## 💡 Conceptos Clave Aprendidos

### Inmutabilidad
- No modificar datos existentes directamente
- Siempre crear copias nuevas
- Beneficios: código más predecible, menos bugs

### Programación Funcional
- Funciones puras sin efectos secundarios
- Composición de funciones
- Encadenamiento de operaciones

### Array Methods
- `map()` para transformar
- `filter()` para filtrar
- `reduce()` para acumular
- `find()` para buscar

### Event Delegation
- Un solo listener en el contenedor padre
- Detectar clicks en elementos hijos
- Más eficiente que listeners individuales

---

## ✅ Checklist de Verificación

### Funcionalidad
- [x] Crear sesiones
- [x] Editar sesiones
- [x] Eliminar sesiones
- [x] Toggle activo/inactivo
- [x] Filtros funcionan
- [x] Búsqueda en tiempo real
- [x] Estadísticas actualizadas
- [x] Persistencia en localStorage

### Código ES2023
- [x] Spread operator
- [x] Array methods (map, filter, reduce, find)
- [x] Inmutabilidad total
- [x] Default parameters
- [x] Destructuring
- [x] Template literals
- [x] Object shorthand
- [x] Nullish coalescing

### Dominio
- [x] Categorías de meditación
- [x] Propiedad duration
- [x] Estadística de tiempo total
- [x] Emojis y textos coherentes

---

## 🎓 Autor

**Proyecto Educativo** - Semana 02  
**Dominio**: Meditación y Mindfulness  
**Enfoque**: ES2023 e Inmutabilidad

---

💜 **Namaste** - Cuida tu mente, cuida tu cuerpo

# 🧘‍♀️ Sistema de Meditación y Mindfulness - POO

## 📖 Descripción del Proyecto

Sistema de gestión avanzado de sesiones de meditación y mindfulness implementado con **Programación Orientada a Objetos (POO)** usando características modernas de JavaScript ES2023.

---

## 🎯 Dominio: Salud y Bienestar

### Tipos de Sesiones (Clases)
- 🧘‍♀️ **GuidedMeditation**: Meditaciones guiadas con voz y música
- 💨 **BreathingExercise**: Ejercicios de respiración consciente
- 🤸‍♀️ **YogaSession**: Sesiones de yoga y estiramientos
- 🌸 **MindfulnessExercise**: Ejercicios de atención plena

### Roles de Usuario
- 👤 **Practitioner**: Practicantes con membresías y seguimiento de progreso
- 👨‍🏫 **Instructor**: Instructores con certificaciones y sesiones asignadas

---

## ✨ Características POO Implementadas

### 🔒 Encapsulación
```javascript
class MeditationSession {
  // Campos privados - solo accesibles dentro de la clase
  #id;
  #name;
  #active;
  #duration;
  
  // Getters para acceso controlado
  get name() {
    return this.#name;
  }
  
  // Setters con validación
  set duration(value) {
    if (value <= 0) throw new Error('Duración inválida');
    this.#duration = value;
  }
}
```

### 🧬 Herencia
```javascript
// Clase base
class MeditationSession { ... }

// Clases derivadas
class GuidedMeditation extends MeditationSession {
  constructor(name, location, duration, ...) {
    super(name, location, duration); // Llama al constructor padre
    // Propiedades adicionales específicas
  }
}
```

### 🎭 Polimorfismo
```javascript
// Cada clase implementa getInfo() de forma diferente
const yoga = new YogaSession(...);
const breathing = new BreathingExercise(...);

yoga.getInfo();      // Retorna info específica de yoga
breathing.getInfo(); // Retorna info específica de respiración
```

### ⚡ Métodos Estáticos
```javascript
class MeditationSystem {
  static VERSION = '1.0.0';
  
  static isValidId(id) {
    return typeof id === 'string' && id.length > 0;
  }
  
  static generateId() {
    return crypto.randomUUID();
  }
}
```

### 🎨 Static Blocks
```javascript
class MeditationSystem {
  static {
    this.VERSION = '1.0.0';
    this.MAX_SESSIONS = 1000;
    console.log(`Sistema v${this.VERSION} cargado ✅`);
  }
}
```

---

## 🏗️ Arquitectura de Clases

### Jerarquía de Sesiones

```
MeditationSession (clase base)
├── GuidedMeditation
├── BreathingExercise
├── YogaSession
└── MindfulnessExercise
```

**Clase Base: MeditationSession**
- Campos privados: #id, #name, #active, #location, #duration, #difficulty
- Métodos: activate(), deactivate(), getInfo(), getType(), estimateCalories()
- Método abstracto: getInfo() (debe implementarse en clases hijas)

**GuidedMeditation** (Meditación Guiada)
```javascript
class GuidedMeditation extends MeditationSession {
  #theme;           // Ansiedad, Sueño, Concentración
  #voiceGuide;      // Masculina, Femenina, Neutral
  #backgroundMusic; // Tipo de música
}
```

**BreathingExercise** (Ejercicio de Respiración)
```javascript
class BreathingExercise extends MeditationSession {
  #technique;       // 4-7-8, Box Breathing
  #cycles;          // Número de ciclos
  #inhaleSeconds;   // Segundos de inhalación
  #holdSeconds;     // Segundos de retención
  #exhaleSeconds;   // Segundos de exhalación
  
  getCycleDuration() // Calcula duración de un ciclo
}
```

**YogaSession** (Sesión de Yoga)
```javascript
class YogaSession extends MeditationSession {
  #style;        // Hatha, Vinyasa, Yin
  #poses;        // Array de posturas
  #focusArea;    // Área del cuerpo
  #equipment;    // Equipo necesario
  
  addPose(pose)  // Agrega postura
  estimateCalories() // Sobrescribe cálculo (yoga quema más)
}
```

**MindfulnessExercise** (Ejercicio de Mindfulness)
```javascript
class MindfulnessExercise extends MeditationSession {
  #practice;         // Body Scan, Eating, Walking
  #sensesInvolved;   // Array de sentidos
  #environment;      // Ambiente recomendado
  
  addSense(sense)    // Agrega sentido
}
```

### Jerarquía de Usuarios

```
Person (clase base)
├── Practitioner (Practicante)
└── Instructor (Instructor)
```

**Clase Base: Person**
- Campos privados: #id, #name, #email, #age, #phone, #registrationDate
- Validación de email con regex

**Practitioner** (Practicante)
```javascript
class Practitioner extends Person {
  #membershipType;      // Básico, Premium, Elite
  #sessionsCompleted;   // Sesiones completadas
  #totalMinutes;        // Minutos acumulados
  #goals;               // Array de objetivos
  
  completeSession(session)  // Registra sesión
  addGoal(goal)             // Agrega objetivo
  getLevel()                // Calcula nivel (Novato → Maestro)
}
```

**Instructor** (Instructor)
```javascript
class Instructor extends Person {
  #specialty;          // Especialidad principal
  #certifications;     // Array de certificaciones
  #sessionsTeaching;   // IDs de sesiones asignadas
  #rating;             // Calificación promedio
  #experience;         // Años de experiencia
  
  addCertification(cert)     // Agrega certificación
  assignSession(session)     // Asigna sesión
  updateRating(rating)       // Actualiza calificación
}
```

### Clase Principal

**MeditationSystem**
```javascript
class MeditationSystem {
  #sessions = [];
  #users = [];
  #completedSessions = [];
  
  // Static properties
  static VERSION = '1.0.0';
  static MAX_SESSIONS = 1000;
  static MAX_USERS = 500;
  
  // CRUD
  addSession(session)
  removeSession(id)
  findSession(id)
  getAllSessions()
  
  // Filtros
  searchByName(query)
  filterByType(type)
  filterByStatus(active)
  filterByDifficulty(difficulty)
  filterByDuration(min, max)
  
  // Estadísticas
  getStats()
  
  // Usuarios
  addUser(user)
  findUserByEmail(email)
  getAllUsers()
  recordCompletedSession(userId, sessionId)
}
```

---

## 🚀 Conceptos POO Aplicados

### 1. Encapsulación
✅ **Campos privados (#)**: Todos los datos están protegidos
✅ **Getters**: Acceso controlado de lectura
✅ **Setters**: Modificación con validación

**Beneficios:**
- Los datos no pueden ser modificados accidentalmente
- Se controla cómo se accede y modifica la información
- Mayor seguridad y mantenibilidad del código

### 2. Herencia
✅ **extends**: Reutilización de código de la clase padre
✅ **super()**: Llamada al constructor padre
✅ **Especialización**: Clases hijas añaden funcionalidad

**Beneficios:**
- Menos duplicación de código
- Jerarquía clara de objetos
- Fácil mantenimiento y escalabilidad

### 3. Polimorfismo
✅ **Mismo método, diferente implementación**: getInfo()
✅ **Sobrescritura**: estimateCalories() en YogaSession

**Beneficios:**
- Interfaz consistente
- Comportamiento específico por tipo
- Código más flexible y extensible

### 4. Abstracción
✅ **Método abstracto**: getInfo() en clase base
✅ **Ocultación de complejidad**: Campos privados

**Beneficios:**
- Interfaz simple, implementación compleja
- Cambios internos no afectan código externo
- Facilita el uso de las clases

---

## 📁 Estructura de Archivos

```
proyecto-semana-03/
├── index-poo.html              # Estructura HTML
├── styles-poo.css              # Estilos CSS (tema oscuro)
├── meditation-system-poo.js    # Lógica POO
└── README.md                   # Este archivo
```

---

## 🚀 Cómo Usar

### 1. Instalación
- Descarga los 3 archivos principales
- Colócalos en la misma carpeta
- Abre `index-poo.html` en tu navegador

### 2. Crear una sesión
- Completa el formulario con los datos
- Selecciona el tipo de sesión
- Define la dificultad y duración
- Click en "Crear Sesión"

### 3. Gestionar sesiones
- **ℹ️ Info**: Ver información completa en consola
- **⏸️ Desactivar / ▶️ Activar**: Cambiar estado
- **🗑️ Eliminar**: Eliminar sesión (con confirmación)

### 4. Filtrar y buscar
- Buscar por nombre en la barra de búsqueda
- Filtrar por tipo, estado o dificultad
- Los filtros son combinables

### 5. Ver estadísticas
- Panel superior muestra resumen general
- Estadísticas por tipo de sesión
- Total de minutos y calorías

---

## 💡 Ejemplos de Código

### Crear una sesión de meditación
```javascript
const meditation = new GuidedMeditation(
  'Meditación Matutina',
  'Sala Principal',
  20,                    // duración
  'Principiante',        // dificultad
  'Concentración',       // tema
  'Femenina',           // voz guía
  'Naturaleza'          // música
);

system.addSession(meditation);
```

### Crear un practicante
```javascript
const practitioner = new Practitioner(
  'Ana García',
  'ana@example.com',
  28,
  '555-0101',
  'Premium'
);

practitioner.addGoal('Reducir ansiedad');
practitioner.addGoal('Mejorar sueño');

system.addUser(practitioner);
```

### Crear un instructor y asignar sesión
```javascript
const instructor = new Instructor(
  'María López',
  'maria@example.com',
  42,
  '555-0201',
  'Meditación y Mindfulness',
  15 // años de experiencia
);

instructor.addCertification('MBSR Certified');
instructor.assignSession(meditation);
instructor.updateRating(4.8);

system.addUser(instructor);
```

### Buscar y filtrar
```javascript
// Buscar por nombre
const results = system.searchByName('matutina');

// Filtrar por tipo
const yogaSessions = system.filterByType('YogaSession');

// Filtrar por dificultad
const beginnerSessions = system.filterByDifficulty('Principiante');

// Obtener estadísticas
const stats = system.getStats();
console.log(stats);
```

---

## 🎨 Diseño

### Tema Oscuro Profesional
- Fondo: #0f172a
- Cards: #1e293b
- Acento: #7c3aed (morado) y #10b981 (verde)

### Indicadores Visuales
- **Dificultad**: Borde izquierdo de color
  - 🟢 Verde: Principiante
  - 🟡 Naranja: Intermedio
  - 🔴 Rojo: Avanzado

### Características Visuales
- Grid responsive de tarjetas
- Animaciones suaves
- Estados hover interactivos
- Badges informativos

---

## ✅ Checklist de Verificación

### Clases y Herencia
- [x] Clase base MeditationSession con campos privados
- [x] 4 clases derivadas (GuidedMeditation, BreathingExercise, YogaSession, MindfulnessExercise)
- [x] Uso correcto de super() en constructores
- [x] Método getInfo() implementado en cada clase
- [x] Clase base Person para usuarios
- [x] 2 roles derivados (Practitioner, Instructor)

### Encapsulación
- [x] Todos los campos son privados (#)
- [x] Getters para acceso a propiedades
- [x] Setters con validación donde corresponda
- [x] Validación de email con regex
- [x] Validación de datos numéricos

### Características Modernas ES2023
- [x] Static block en MeditationSystem
- [x] Métodos estáticos (isValidId, generateId, formatDate)
- [x] Uso de crypto.randomUUID() para IDs únicos
- [x] Campos privados (#)
- [x] Arrow functions
- [x] Template literals
- [x] Destructuring
- [x] Spread operator

### Funcionalidad
- [x] CRUD completo de sesiones
- [x] Sistema de usuarios (practicantes e instructores)
- [x] Filtros múltiples combinables
- [x] Búsqueda en tiempo real
- [x] Estadísticas dinámicas
- [x] Validaciones robustas
- [x] Manejo de errores

### POO
- [x] Encapsulación (campos privados)
- [x] Herencia (extends)
- [x] Polimorfismo (getInfo, estimateCalories)
- [x] Abstracción (método abstracto)
- [x] Composición (arrays de objetos)

---

## 🎓 Conceptos Aprendidos

### Programación Orientada a Objetos
1. **Clases**: Plantillas para crear objetos
2. **Objetos**: Instancias de clases con datos y comportamiento
3. **Herencia**: Reutilización de código mediante jerarquías
4. **Polimorfismo**: Mismo nombre, diferentes implementaciones
5. **Encapsulación**: Ocultación de datos internos
6. **Abstracción**: Simplificación de interfaces complejas

### Ventajas de POO
- ✅ Código más organizado y mantenible
- ✅ Reutilización mediante herencia
- ✅ Datos protegidos con encapsulación
- ✅ Modelado natural del mundo real
- ✅ Fácil de escalar y extender

---

## 🎓 Autor

**Proyecto Educativo** - Semana 03  
**Dominio**: Meditación y Mindfulness  
**Enfoque**: Programación Orientada a Objetos (POO)

---

💜 **Namaste** - Sistema de Gestión con POO

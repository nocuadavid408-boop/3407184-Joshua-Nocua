/**
 * ============================================
 * PROYECTO SEMANA 03 - SISTEMA DE GESTIÓN CON POO
 * App de Meditación y Mindfulness
 * ============================================
 *
 * DOMINIO: Aplicación de Meditación y Mindfulness
 * Gestión de sesiones, ejercicios y usuarios del sistema
 *
 * CARACTERÍSTICAS ES2023 POO IMPLEMENTADAS:
 * ✓ Clases con constructor
 * ✓ Campos privados (#)
 * ✓ Getters y setters
 * ✓ Herencia (extends, super)
 * ✓ Métodos estáticos
 * ✓ Static blocks
 * ✓ Encapsulación completa
 *
 * ============================================
 */

// ============================================
// CLASE BASE - MeditationSession (Sesión de Meditación)
// ============================================
/**
 * Clase base para todas las sesiones de meditación y mindfulness.
 * Implementa encapsulación con campos privados.
 */
class MeditationSession {
  // Campos privados - solo accesibles dentro de la clase
  #id;
  #name;
  #active;
  #location;
  #dateCreated;
  #duration; // Duración en minutos
  #difficulty; // Principiante, Intermedio, Avanzado
  #instructor;

  /**
   * Constructor de la clase base
   * @param {string} name - Nombre de la sesión
   * @param {string} location - Ubicación (sala, online, etc.)
   * @param {number} duration - Duración en minutos
   * @param {string} difficulty - Nivel de dificultad
   */
  constructor(name, location, duration = 10, difficulty = 'Principiante') {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#location = location;
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
    this.#duration = duration;
    this.#difficulty = difficulty;
    this.#instructor = 'Por asignar';
  }

  // ============================================
  // GETTERS - Acceso controlado a propiedades
  // ============================================

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get isActive() {
    return this.#active;
  }

  get location() {
    return this.#location;
  }

  get dateCreated() {
    return this.#dateCreated;
  }

  get duration() {
    return this.#duration;
  }

  get difficulty() {
    return this.#difficulty;
  }

  get instructor() {
    return this.#instructor;
  }

  // ============================================
  // SETTERS - Modificación controlada con validación
  // ============================================

  set location(value) {
    if (!value || value.trim() === '') {
      throw new Error('La ubicación no puede estar vacía');
    }
    this.#location = value.trim();
  }

  set duration(value) {
    if (typeof value !== 'number' || value <= 0) {
      throw new Error('La duración debe ser un número positivo');
    }
    this.#duration = value;
  }

  set instructor(value) {
    if (!value || value.trim() === '') {
      throw new Error('El instructor no puede estar vacío');
    }
    this.#instructor = value.trim();
  }

  // ============================================
  // MÉTODOS DE INSTANCIA
  // ============================================

  /**
   * Activa la sesión
   * @returns {Object} Resultado de la operación
   */
  activate() {
    if (this.#active) {
      return { success: false, message: 'La sesión ya está activa' };
    }
    this.#active = true;
    return { success: true, message: 'Sesión activada correctamente' };
  }

  /**
   * Desactiva la sesión
   * @returns {Object} Resultado de la operación
   */
  deactivate() {
    if (!this.#active) {
      return { success: false, message: 'La sesión ya está inactiva' };
    }
    this.#active = false;
    return { success: true, message: 'Sesión desactivada correctamente' };
  }

  /**
   * Método abstracto - DEBE ser sobrescrito en clases hijas
   * @returns {Object} Información de la sesión
   */
  getInfo() {
    throw new Error('El método getInfo() debe ser implementado en la clase hija');
  }

  /**
   * Retorna el tipo de sesión (nombre de la clase)
   * @returns {string} Nombre del constructor
   */
  getType() {
    return this.constructor.name;
  }

  /**
   * Calcula calorías aproximadas quemadas
   * @returns {number} Calorías estimadas
   */
  estimateCalories() {
    // Estimación básica: 3 calorías por minuto
    return Math.round(this.#duration * 3);
  }
}

// ============================================
// CLASES DERIVADAS - Tipos de Sesiones
// ============================================

/**
 * Clase para sesiones de meditación guiada
 */
class GuidedMeditation extends MeditationSession {
  #theme; // Tema de la meditación (ansiedad, sueño, concentración)
  #voiceGuide; // Voz guía (masculina, femenina, neutral)
  #backgroundMusic; // Tipo de música de fondo

  constructor(name, location, duration, difficulty, theme, voiceGuide, backgroundMusic) {
    super(name, location, duration, difficulty);
    this.#theme = theme;
    this.#voiceGuide = voiceGuide;
    this.#backgroundMusic = backgroundMusic;
  }

  get theme() {
    return this.#theme;
  }

  get voiceGuide() {
    return this.#voiceGuide;
  }

  get backgroundMusic() {
    return this.#backgroundMusic;
  }

  set theme(value) {
    const validThemes = ['Ansiedad', 'Sueño', 'Concentración', 'Estrés', 'Gratitud'];
    if (!validThemes.includes(value)) {
      throw new Error(`Tema inválido. Debe ser uno de: ${validThemes.join(', ')}`);
    }
    this.#theme = value;
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      duration: this.duration,
      difficulty: this.difficulty,
      instructor: this.instructor,
      theme: this.#theme,
      voiceGuide: this.#voiceGuide,
      backgroundMusic: this.#backgroundMusic,
      active: this.isActive,
      calories: this.estimateCalories(),
      dateCreated: this.dateCreated
    };
  }
}

/**
 * Clase para ejercicios de respiración
 */
class BreathingExercise extends MeditationSession {
  #technique; // Técnica (4-7-8, Box Breathing, etc.)
  #cycles; // Número de ciclos
  #inhaleSeconds; // Segundos de inhalación
  #holdSeconds; // Segundos de retención
  #exhaleSeconds; // Segundos de exhalación

  constructor(name, location, duration, difficulty, technique, cycles, inhale, hold, exhale) {
    super(name, location, duration, difficulty);
    this.#technique = technique;
    this.#cycles = cycles;
    this.#inhaleSeconds = inhale;
    this.#holdSeconds = hold;
    this.#exhaleSeconds = exhale;
  }

  get technique() {
    return this.#technique;
  }

  get cycles() {
    return this.#cycles;
  }

  get pattern() {
    return `${this.#inhaleSeconds}-${this.#holdSeconds}-${this.#exhaleSeconds}`;
  }

  /**
   * Calcula la duración total de un ciclo
   * @returns {number} Segundos por ciclo
   */
  getCycleDuration() {
    return this.#inhaleSeconds + this.#holdSeconds + this.#exhaleSeconds;
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      duration: this.duration,
      difficulty: this.difficulty,
      technique: this.#technique,
      cycles: this.#cycles,
      pattern: this.pattern,
      cycleDuration: this.getCycleDuration(),
      active: this.isActive,
      calories: this.estimateCalories(),
      dateCreated: this.dateCreated
    };
  }
}

/**
 * Clase para sesiones de yoga y estiramientos
 */
class YogaSession extends MeditationSession {
  #style; // Estilo de yoga (Hatha, Vinyasa, Yin, etc.)
  #poses; // Array de posturas
  #focusArea; // Área del cuerpo enfocada
  #equipment; // Equipo necesario

  constructor(name, location, duration, difficulty, style, focusArea, equipment = 'Ninguno') {
    super(name, location, duration, difficulty);
    this.#style = style;
    this.#poses = [];
    this.#focusArea = focusArea;
    this.#equipment = equipment;
  }

  get style() {
    return this.#style;
  }

  get poses() {
    return [...this.#poses]; // Retorna copia para evitar mutación
  }

  get focusArea() {
    return this.#focusArea;
  }

  get equipment() {
    return this.#equipment;
  }

  /**
   * Agrega una postura a la sesión
   * @param {string} pose - Nombre de la postura
   */
  addPose(pose) {
    if (!pose || pose.trim() === '') {
      throw new Error('La postura no puede estar vacía');
    }
    this.#poses.push(pose.trim());
  }

  /**
   * Calcula calorías (yoga quema más que meditación estática)
   * @returns {number} Calorías estimadas
   */
  estimateCalories() {
    // Yoga quema aprox. 5 calorías por minuto
    return Math.round(this.duration * 5);
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      duration: this.duration,
      difficulty: this.difficulty,
      style: this.#style,
      poses: this.#poses,
      posesCount: this.#poses.length,
      focusArea: this.#focusArea,
      equipment: this.#equipment,
      active: this.isActive,
      calories: this.estimateCalories(),
      dateCreated: this.dateCreated
    };
  }
}

/**
 * Clase para ejercicios de mindfulness
 */
class MindfulnessExercise extends MeditationSession {
  #practice; // Tipo de práctica (Body Scan, Eating, Walking)
  #sensesInvolved; // Array de sentidos involucrados
  #environment; // Ambiente recomendado

  constructor(name, location, duration, difficulty, practice, environment) {
    super(name, location, duration, difficulty);
    this.#practice = practice;
    this.#sensesInvolved = [];
    this.#environment = environment;
  }

  get practice() {
    return this.#practice;
  }

  get sensesInvolved() {
    return [...this.#sensesInvolved];
  }

  get environment() {
    return this.#environment;
  }

  /**
   * Agrega un sentido a la práctica
   * @param {string} sense - Vista, Oído, Tacto, Olfato, Gusto
   */
  addSense(sense) {
    const validSenses = ['Vista', 'Oído', 'Tacto', 'Olfato', 'Gusto'];
    if (!validSenses.includes(sense)) {
      throw new Error(`Sentido inválido. Debe ser uno de: ${validSenses.join(', ')}`);
    }
    if (!this.#sensesInvolved.includes(sense)) {
      this.#sensesInvolved.push(sense);
    }
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      duration: this.duration,
      difficulty: this.difficulty,
      practice: this.#practice,
      sensesInvolved: this.#sensesInvolved,
      environment: this.#environment,
      active: this.isActive,
      calories: this.estimateCalories(),
      dateCreated: this.dateCreated
    };
  }
}

// ============================================
// CLASE PERSON - Base para usuarios
// ============================================
/**
 * Clase base para todos los usuarios del sistema
 */
class Person {
  #id;
  #name;
  #email;
  #registrationDate;
  #age;
  #phone;

  constructor(name, email, age = null, phone = null) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#email = email;
    this.#registrationDate = new Date().toISOString();
    this.#age = age;
    this.#phone = phone;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get registrationDate() {
    return this.#registrationDate;
  }

  get age() {
    return this.#age;
  }

  get phone() {
    return this.#phone;
  }

  set email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Formato de email inválido');
    }
    this.#email = value;
  }

  set age(value) {
    if (value !== null && (typeof value !== 'number' || value < 0 || value > 120)) {
      throw new Error('Edad inválida');
    }
    this.#age = value;
  }

  /**
   * Retorna la información básica del usuario
   */
  getInfo() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      age: this.#age,
      phone: this.#phone,
      registrationDate: this.#registrationDate,
      role: this.constructor.name
    };
  }
}

// ============================================
// CLASES DE ROLES - Usuarios especializados
// ============================================

/**
 * Clase para practicantes (usuarios del sistema)
 */
class Practitioner extends Person {
  #membershipType; // Básico, Premium, Elite
  #sessionsCompleted;
  #totalMinutes;
  #favoriteType;
  #goals; // Array de objetivos

  constructor(name, email, age, phone, membershipType = 'Básico') {
    super(name, email, age, phone);
    this.#membershipType = membershipType;
    this.#sessionsCompleted = 0;
    this.#totalMinutes = 0;
    this.#favoriteType = null;
    this.#goals = [];
  }

  get membershipType() {
    return this.#membershipType;
  }

  get sessionsCompleted() {
    return this.#sessionsCompleted;
  }

  get totalMinutes() {
    return this.#totalMinutes;
  }

  get favoriteType() {
    return this.#favoriteType;
  }

  get goals() {
    return [...this.#goals];
  }

  set membershipType(value) {
    const validTypes = ['Básico', 'Premium', 'Elite'];
    if (!validTypes.includes(value)) {
      throw new Error(`Membresía inválida. Debe ser: ${validTypes.join(', ')}`);
    }
    this.#membershipType = value;
  }

  /**
   * Registra una sesión completada
   * @param {MeditationSession} session - Sesión completada
   */
  completeSession(session) {
    if (!(session instanceof MeditationSession)) {
      throw new Error('Debe ser una instancia de MeditationSession');
    }
    this.#sessionsCompleted++;
    this.#totalMinutes += session.duration;
    this.#favoriteType = session.getType();
  }

  /**
   * Agrega un objetivo personal
   * @param {string} goal - Objetivo a agregar
   */
  addGoal(goal) {
    if (!goal || goal.trim() === '') {
      throw new Error('El objetivo no puede estar vacío');
    }
    this.#goals.push(goal.trim());
  }

  /**
   * Calcula el nivel del practicante según minutos
   * @returns {string} Nivel (Novato, Intermedio, Avanzado, Maestro)
   */
  getLevel() {
    if (this.#totalMinutes < 100) return 'Novato';
    if (this.#totalMinutes < 500) return 'Intermedio';
    if (this.#totalMinutes < 1000) return 'Avanzado';
    return 'Maestro';
  }

  getInfo() {
    return {
      ...super.getInfo(),
      membershipType: this.#membershipType,
      sessionsCompleted: this.#sessionsCompleted,
      totalMinutes: this.#totalMinutes,
      level: this.getLevel(),
      favoriteType: this.#favoriteType,
      goals: this.#goals
    };
  }
}

/**
 * Clase para instructores
 */
class Instructor extends Person {
  #specialty; // Especialidad principal
  #certifications; // Array de certificaciones
  #sessionsTeaching; // Sesiones que imparte
  #rating; // Calificación promedio
  #experience; // Años de experiencia

  constructor(name, email, age, phone, specialty, experience) {
    super(name, email, age, phone);
    this.#specialty = specialty;
    this.#certifications = [];
    this.#sessionsTeaching = [];
    this.#rating = 0;
    this.#experience = experience;
  }

  get specialty() {
    return this.#specialty;
  }

  get certifications() {
    return [...this.#certifications];
  }

  get sessionsTeaching() {
    return [...this.#sessionsTeaching];
  }

  get rating() {
    return this.#rating;
  }

  get experience() {
    return this.#experience;
  }

  /**
   * Agrega una certificación
   * @param {string} certification - Certificación obtenida
   */
  addCertification(certification) {
    if (!certification || certification.trim() === '') {
      throw new Error('La certificación no puede estar vacía');
    }
    this.#certifications.push(certification.trim());
  }

  /**
   * Asigna una sesión al instructor
   * @param {MeditationSession} session - Sesión a impartir
   */
  assignSession(session) {
    if (!(session instanceof MeditationSession)) {
      throw new Error('Debe ser una instancia de MeditationSession');
    }
    this.#sessionsTeaching.push(session.id);
    session.instructor = this.name;
  }

  /**
   * Actualiza la calificación del instructor
   * @param {number} newRating - Nueva calificación (1-5)
   */
  updateRating(newRating) {
    if (typeof newRating !== 'number' || newRating < 1 || newRating > 5) {
      throw new Error('La calificación debe estar entre 1 y 5');
    }
    // Promedio simple (en producción sería más complejo)
    this.#rating = newRating;
  }

  getInfo() {
    return {
      ...super.getInfo(),
      specialty: this.#specialty,
      certifications: this.#certifications,
      sessionsCount: this.#sessionsTeaching.length,
      rating: this.#rating,
      experience: this.#experience
    };
  }
}

// ============================================
// CLASE PRINCIPAL DEL SISTEMA
// ============================================
/**
 * Clase principal que gestiona el sistema de meditación
 */
class MeditationSystem {
  #sessions = [];
  #users = [];
  #completedSessions = [];

  // Static block para configuración inicial
  static {
    this.VERSION = '1.0.0';
    this.MAX_SESSIONS = 1000;
    this.MAX_USERS = 500;
    this.SYSTEM_NAME = 'Sistema de Meditación y Mindfulness';
    console.log(`${this.SYSTEM_NAME} v${this.VERSION} cargado ✅`);
  }

  // Métodos estáticos de utilidad
  static isValidId(id) {
    return typeof id === 'string' && id.length > 0;
  }

  static generateId() {
    return crypto.randomUUID();
  }

  static formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  // ============================================
  // MÉTODOS CRUD PARA SESIONES
  // ============================================

  addSession(session) {
    if (!(session instanceof MeditationSession)) {
      return { success: false, message: 'La sesión debe ser instancia de MeditationSession' };
    }
    if (this.#sessions.length >= MeditationSystem.MAX_SESSIONS) {
      return { success: false, message: 'Límite de sesiones alcanzado' };
    }
    this.#sessions.push(session);
    return { success: true, message: 'Sesión agregada correctamente', session };
  }

  removeSession(id) {
    const index = this.#sessions.findIndex(session => session.id === id);
    if (index === -1) {
      return { success: false, message: 'Sesión no encontrada' };
    }
    const removed = this.#sessions.splice(index, 1)[0];
    return { success: true, message: 'Sesión eliminada', session: removed };
  }

  findSession(id) {
    return this.#sessions.find(session => session.id === id) ?? null;
  }

  getAllSessions() {
    return [...this.#sessions];
  }

  // ============================================
  // MÉTODOS DE BÚSQUEDA Y FILTRADO
  // ============================================

  searchByName(query) {
    const searchTerm = query.toLowerCase();
    return this.#sessions.filter(session =>
      session.name.toLowerCase().includes(searchTerm)
    );
  }

  filterByType(type) {
    return this.#sessions.filter(session => session.getType() === type);
  }

  filterByStatus(active) {
    return this.#sessions.filter(session => session.isActive === active);
  }

  filterByDifficulty(difficulty) {
    return this.#sessions.filter(session => session.difficulty === difficulty);
  }

  filterByDuration(minMinutes, maxMinutes) {
    return this.#sessions.filter(session => 
      session.duration >= minMinutes && session.duration <= maxMinutes
    );
  }

  // ============================================
  // MÉTODOS DE ESTADÍSTICAS
  // ============================================

  getStats() {
    const total = this.#sessions.length;
    const active = this.#sessions.filter(s => s.isActive).length;
    const inactive = total - active;

    // Contar por tipo usando reduce
    const byType = this.#sessions.reduce((acc, session) => {
      const type = session.getType();
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, {});

    // Contar por dificultad
    const byDifficulty = this.#sessions.reduce((acc, session) => {
      const diff = session.difficulty;
      acc[diff] = (acc[diff] ?? 0) + 1;
      return acc;
    }, {});

    // Total de minutos disponibles
    const totalMinutes = this.#sessions.reduce((sum, session) => {
      return sum + session.duration;
    }, 0);

    // Total de calorías potenciales
    const totalCalories = this.#sessions.reduce((sum, session) => {
      return sum + session.estimateCalories();
    }, 0);

    return {
      total,
      active,
      inactive,
      byType,
      byDifficulty,
      totalMinutes,
      totalCalories,
      users: this.#users.length,
      completedSessions: this.#completedSessions.length
    };
  }

  // ============================================
  // MÉTODOS PARA USUARIOS
  // ============================================

  addUser(user) {
    if (!(user instanceof Person)) {
      return { success: false, message: 'Debe ser instancia de Person' };
    }
    if (this.#users.length >= MeditationSystem.MAX_USERS) {
      return { success: false, message: 'Límite de usuarios alcanzado' };
    }
    
    // Verificar email único
    if (this.findUserByEmail(user.email)) {
      return { success: false, message: 'El email ya está registrado' };
    }
    
    this.#users.push(user);
    return { success: true, message: 'Usuario registrado correctamente' };
  }

  findUserByEmail(email) {
    return this.#users.find(user => user.email === email) ?? null;
  }

  getAllUsers() {
    return [...this.#users];
  }

  /**
   * Registra la finalización de una sesión por un usuario
   */
  recordCompletedSession(userId, sessionId) {
    const user = this.#users.find(u => u.id === userId);
    const session = this.findSession(sessionId);
    
    if (!user || !session) {
      return { success: false, message: 'Usuario o sesión no encontrados' };
    }

    if (user instanceof Practitioner) {
      user.completeSession(session);
    }

    this.#completedSessions.push({
      userId,
      sessionId,
      completedAt: new Date().toISOString()
    });

    return { success: true, message: 'Sesión registrada como completada' };
  }
}

// ============================================
// INSTANCIA DEL SISTEMA Y DATOS DE PRUEBA
// ============================================

// Crea la instancia principal del sistema
const system = new MeditationSystem();

// Crear sesiones de prueba

// 1. Meditación Guiada
const morningMeditation = new GuidedMeditation(
  'Meditación Matutina Energizante',
  'Sala Principal',
  20,
  'Principiante',
  'Concentración',
  'Femenina',
  'Naturaleza'
);

const sleepMeditation = new GuidedMeditation(
  'Meditación para Dormir Profundo',
  'Online',
  30,
  'Intermedio',
  'Sueño',
  'Masculina',
  'Olas del mar'
);

// 2. Ejercicios de Respiración
const boxBreathing = new BreathingExercise(
  'Respiración Box para Ansiedad',
  'Cualquier lugar',
  10,
  'Principiante',
  'Box Breathing',
  10,
  4, 4, 4
);

const breathingAdvanced = new BreathingExercise(
  'Técnica 4-7-8 Avanzada',
  'Sala Tranquila',
  15,
  'Avanzado',
  '4-7-8',
  8,
  4, 7, 8
);

// 3. Sesiones de Yoga
const hatha = new YogaSession(
  'Hatha Yoga Básico',
  'Estudio Zen',
  45,
  'Principiante',
  'Hatha',
  'Cuerpo completo',
  'Mat'
);
hatha.addPose('Postura del Niño');
hatha.addPose('Perro boca abajo');
hatha.addPose('Guerrero I');

const vinyasa = new YogaSession(
  'Vinyasa Flow Dinámico',
  'Estudio Zen',
  60,
  'Intermedio',
  'Vinyasa',
  'Core y equilibrio',
  'Mat y bloques'
);

// 4. Mindfulness
const bodyScan = new MindfulnessExercise(
  'Body Scan Completo',
  'Sala de Relajación',
  25,
  'Principiante',
  'Body Scan',
  'Silencioso y cómodo'
);
bodyScan.addSense('Tacto');
bodyScan.addSense('Oído');

const mindfulEating = new MindfulnessExercise(
  'Alimentación Consciente',
  'Comedor',
  15,
  'Principiante',
  'Eating',
  'Mesa tranquila'
);
mindfulEating.addSense('Vista');
mindfulEating.addSense('Olfato');
mindfulEating.addSense('Gusto');
mindfulEating.addSense('Tacto');

// Agregar sesiones al sistema
system.addSession(morningMeditation);
system.addSession(sleepMeditation);
system.addSession(boxBreathing);
system.addSession(breathingAdvanced);
system.addSession(hatha);
system.addSession(vinyasa);
system.addSession(bodyScan);
system.addSession(mindfulEating);

// Crear usuarios de prueba

// Practicantes
const practitioner1 = new Practitioner(
  'Ana García',
  'ana@example.com',
  28,
  '555-0101',
  'Premium'
);
practitioner1.addGoal('Reducir ansiedad');
practitioner1.addGoal('Mejorar sueño');

const practitioner2 = new Practitioner(
  'Carlos Pérez',
  'carlos@example.com',
  35,
  '555-0102',
  'Básico'
);
practitioner2.addGoal('Flexibilidad');

// Instructores
const instructor1 = new Instructor(
  'María López',
  'maria@example.com',
  42,
  '555-0201',
  'Meditación y Mindfulness',
  15
);
instructor1.addCertification('Certificado en Mindfulness MBSR');
instructor1.addCertification('Yoga Alliance RYT-500');
instructor1.updateRating(4.8);

const instructor2 = new Instructor(
  'Juan Martínez',
  'juan@example.com',
  38,
  '555-0202',
  'Yoga Terapéutico',
  10
);
instructor2.addCertification('Yoga Iyengar Certificado');
instructor2.updateRating(4.9);

// Agregar usuarios al sistema
system.addUser(practitioner1);
system.addUser(practitioner2);
system.addUser(instructor1);
system.addUser(instructor2);

// Asignar instructores a sesiones
instructor1.assignSession(morningMeditation);
instructor1.assignSession(sleepMeditation);
instructor2.assignSession(hatha);
instructor2.assignSession(vinyasa);

console.log('✅ Datos de prueba cargados correctamente');
console.log('📊 Estadísticas iniciales:', system.getStats());

// ============================================
// REFERENCIAS AL DOM
// ============================================

const sessionForm = document.getElementById('session-form');
const sessionList = document.getElementById('session-list');
const statsContainer = document.getElementById('stats');
const filterType = document.getElementById('filter-type');
const filterStatus = document.getElementById('filter-status');
const filterDifficulty = document.getElementById('filter-difficulty');
const searchInput = document.getElementById('search-input');

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

/**
 * Renderiza una sesión individual
 * @param {MeditationSession} session - Sesión a renderizar
 * @returns {string} HTML de la sesión
 */
const renderSession = session => {
  const info = session.getInfo();
  
  // Iconos según tipo
  const typeIcons = {
    'GuidedMeditation': '🧘‍♀️',
    'BreathingExercise': '💨',
    'YogaSession': '🤸‍♀️',
    'MindfulnessExercise': '🌸'
  };
  
  const icon = typeIcons[session.getType()] || '🔹';
  
  // Colores según dificultad
  const difficultyColors = {
    'Principiante': 'difficulty-beginner',
    'Intermedio': 'difficulty-intermediate',
    'Avanzado': 'difficulty-advanced'
  };
  
  const difficultyClass = difficultyColors[session.difficulty] || '';
  
  return `
    <div class="session ${session.isActive ? '' : 'inactive'} ${difficultyClass}" data-id="${session.id}">
      <div class="session-header">
        <div class="session-title">
          <span class="session-icon">${icon}</span>
          <h3>${session.name}</h3>
        </div>
        <span class="badge badge-type">${session.getType()}</span>
      </div>
      
      <div class="session-details">
        <p><strong>📍 Ubicación:</strong> ${session.location}</p>
        <p><strong>⏱️ Duración:</strong> ${session.duration} min</p>
        <p><strong>🔥 Calorías:</strong> ~${session.estimateCalories()} kcal</p>
        <p><strong>👨‍🏫 Instructor:</strong> ${session.instructor}</p>
        <p><strong>📊 Nivel:</strong> ${session.difficulty}</p>
        <p><strong>📅 Creada:</strong> ${MeditationSystem.formatDate(session.dateCreated)}</p>
      </div>
      
      <div class="session-status">
        <span class="status-badge ${session.isActive ? 'status-active' : 'status-inactive'}">
          ${session.isActive ? '✅ Activa' : '❌ Inactiva'}
        </span>
      </div>
      
      <div class="session-actions">
        <button class="btn btn-info" data-id="${session.id}">
          ℹ️ Info
        </button>
        <button class="btn btn-toggle" data-id="${session.id}">
          ${session.isActive ? '⏸️ Desactivar' : '▶️ Activar'}
        </button>
        <button class="btn btn-delete" data-id="${session.id}">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  `;
};

/**
 * Renderiza la lista completa de sesiones
 * @param {Array} sessions - Array de sesiones
 */
const renderSessions = (sessions = []) => {
  if (sessions.length === 0) {
    sessionList.innerHTML = '<p class="empty">No hay sesiones disponibles</p>';
    return;
  }
  sessionList.innerHTML = sessions.map(renderSession).join('');
};

/**
 * Renderiza las estadísticas
 * @param {Object} stats - Objeto de estadísticas
 */
const renderStats = stats => {
  const byTypeHtml = Object.entries(stats.byType)
    .map(([type, count]) => {
      const typeLabels = {
        'GuidedMeditation': '🧘‍♀️ Meditación',
        'BreathingExercise': '💨 Respiración',
        'YogaSession': '🤸‍♀️ Yoga',
        'MindfulnessExercise': '🌸 Mindfulness'
      };
      const label = typeLabels[type] || type;
      return `<div class="stat-detail">${label}: ${count}</div>`;
    })
    .join('');

  const byDifficultyHtml = Object.entries(stats.byDifficulty)
    .map(([diff, count]) => `<div class="stat-detail">${diff}: ${count}</div>`)
    .join('');

  statsContainer.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Sesiones</div>
        <div class="stat-value">${stats.total}</div>
      </div>
      <div class="stat-card stat-active">
        <div class="stat-label">Activas</div>
        <div class="stat-value">${stats.active}</div>
      </div>
      <div class="stat-card stat-inactive">
        <div class="stat-label">Inactivas</div>
        <div class="stat-value">${stats.inactive}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Usuarios</div>
        <div class="stat-value">${stats.users}</div>
      </div>
    </div>
    
    <div class="stats-details">
      <div class="detail-section">
        <h4>📊 Por Tipo</h4>
        ${byTypeHtml}
      </div>
      <div class="detail-section">
        <h4>🎯 Por Nivel</h4>
        ${byDifficultyHtml}
      </div>
      <div class="detail-section">
        <h4>⏱️ Tiempo Total</h4>
        <div class="stat-detail">${stats.totalMinutes} minutos (${Math.round(stats.totalMinutes / 60)} horas)</div>
        <h4>🔥 Calorías Totales</h4>
        <div class="stat-detail">${stats.totalCalories} kcal</div>
      </div>
    </div>
  `;
};

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Maneja el envío del formulario
 */
const handleFormSubmit = e => {
  e.preventDefault();
  
  // Obtén valores del formulario
  const name = document.getElementById('session-name').value.trim();
  const location = document.getElementById('session-location').value.trim();
  const duration = parseInt(document.getElementById('session-duration').value);
  const difficulty = document.getElementById('session-difficulty').value;
  const type = document.getElementById('session-type').value;
  
  if (!name || !location) {
    alert('Por favor completa todos los campos obligatorios');
    return;
  }
  
  let session;
  
  // Crea instancia según el tipo seleccionado
  switch(type) {
    case 'GuidedMeditation':
      session = new GuidedMeditation(
        name, location, duration, difficulty,
        'Concentración', 'Femenina', 'Naturaleza'
      );
      break;
    case 'BreathingExercise':
      session = new BreathingExercise(
        name, location, duration, difficulty,
        'Box Breathing', 10, 4, 4, 4
      );
      break;
    case 'YogaSession':
      session = new YogaSession(
        name, location, duration, difficulty,
        'Hatha', 'Cuerpo completo', 'Mat'
      );
      break;
    case 'MindfulnessExercise':
      session = new MindfulnessExercise(
        name, location, duration, difficulty,
        'Body Scan', 'Silencioso'
      );
      break;
    default:
      alert('Tipo de sesión inválido');
      return;
  }
  
  // Agrega al sistema
  const result = system.addSession(session);
  
  if (result.success) {
    sessionForm.reset();
    handleFilterChange();
    renderStats(system.getStats());
    alert('✅ Sesión creada correctamente');
  } else {
    alert('❌ ' + result.message);
  }
};

/**
 * Maneja cambios en los filtros
 */
const handleFilterChange = () => {
  let filtered = system.getAllSessions();
  
  // Filtro por tipo
  const typeFilter = filterType.value;
  if (typeFilter !== 'all') {
    filtered = system.filterByType(typeFilter);
  }
  
  // Filtro por estado
  const statusFilter = filterStatus.value;
  if (statusFilter !== 'all') {
    const isActive = statusFilter === 'active';
    filtered = filtered.filter(s => s.isActive === isActive);
  }
  
  // Filtro por dificultad
  const difficultyFilter = filterDifficulty.value;
  if (difficultyFilter !== 'all') {
    filtered = filtered.filter(s => s.difficulty === difficultyFilter);
  }
  
  // Búsqueda por texto
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(searchLower)
    );
  }
  
  renderSessions(filtered);
};

/**
 * Maneja acciones en las sesiones (toggle, delete, info)
 */
const handleSessionAction = e => {
  const target = e.target;
  const sessionId = target.dataset.id;
  
  if (!sessionId) return;
  
  const session = system.findSession(sessionId);
  if (!session) return;
  
  // Botón toggle
  if (target.classList.contains('btn-toggle')) {
    if (session.isActive) {
      session.deactivate();
    } else {
      session.activate();
    }
    handleFilterChange();
    renderStats(system.getStats());
  }
  
  // Botón delete
  if (target.classList.contains('btn-delete')) {
    if (confirm(`¿Eliminar "${session.name}"?`)) {
      system.removeSession(sessionId);
      handleFilterChange();
      renderStats(system.getStats());
    }
  }
  
  // Botón info
  if (target.classList.contains('btn-info')) {
    const info = session.getInfo();
    console.log('📋 Información completa:', info);
    alert(`📋 Información de la sesión:\n\n${JSON.stringify(info, null, 2)}`);
  }
};

// ============================================
// EVENT LISTENERS
// ============================================

sessionForm.addEventListener('submit', handleFormSubmit);
filterType.addEventListener('change', handleFilterChange);
filterStatus.addEventListener('change', handleFilterChange);
filterDifficulty.addEventListener('change', handleFilterChange);
searchInput.addEventListener('input', handleFilterChange);
sessionList.addEventListener('click', handleSessionAction);

// ============================================
// INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
const init = () => {
  renderSessions(system.getAllSessions());
  renderStats(system.getStats());
  console.log('✅ Sistema de Meditación y Mindfulness inicializado correctamente');
  console.log('📊 Datos de prueba:', {
    sesiones: system.getAllSessions().length,
    usuarios: system.getAllUsers().length
  });
};

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// ============================================
// ✅ CHECKLIST DE VERIFICACIÓN COMPLETO
// ============================================
// CLASES Y HERENCIA:
// ✓ Clase base MeditationSession con campos privados
// ✓ 4 clases derivadas: GuidedMeditation, BreathingExercise, YogaSession, MindfulnessExercise
// ✓ Uso correcto de super() en constructores
// ✓ Método getInfo() implementado en cada clase
// ✓ Clase Person base para usuarios
// ✓ 2 roles: Practitioner e Instructor
//
// ENCAPSULACIÓN:
// ✓ Todos los campos son privados (#)
// ✓ Getters para acceso a propiedades
// ✓ Setters con validación
//
// CARACTERÍSTICAS MODERNAS:
// ✓ Static block en MeditationSystem
// ✓ Métodos estáticos (isValidId, generateId, formatDate)
// ✓ Uso de crypto.randomUUID() para IDs
//
// POO:
// ✓ Herencia (extends)
// ✓ Polimorfismo (getInfo)
// ✓ Encapsulación (campos privados)
// ✓ Abstracción (método getInfo abstracto en clase base)

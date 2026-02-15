/* ============================================
   PROYECTO - MEDITACIÓN Y MINDFULNESS
   JavaScript ES2023 
   ============================================ */

// Datos del programa
const entityData = {
  name: 'Programa Mindfulness y salud mental',
  description: 'Programa completo de meditación y mindfulness diseñado para mejorar tu bienestar mental, reducir el estrés y cultivar la paz interior a través de prácticas guiadas.',
  identifier: 'JNC-0525',
  
  contact: {
    email: 'contacto@mindfulnessintegral.com',
    phone: '+57 310 555 0123',
    location: 'Bogotá, Colombia'
  },

  techniques: [
    { name: 'Respiración Consciente', level: 85, category: 'Básica' },
    { name: 'Escaneo Corporal', level: 75, category: 'Básica' },
    { name: 'Meditación Vipassana', level: 65, category: 'Intermedia' },
    { name: 'Atención Plena al Caminar', level: 90, category: 'Básica' },
    { name: 'Meditación Metta (Amor Bondadoso)', level: 70, category: 'Intermedia' },
    { name: 'Observación de Pensamientos', level: 60, category: 'Avanzada' },
    { name: 'Meditación Trascendental', level: 55, category: 'Avanzada' },
    { name: 'Yoga Nidra', level: 80, category: 'Intermedia' }
  ],

  links: [
    { platform: 'YouTube', url: '', icon: '▶️' },
    { platform: 'Spotify', url: '', icon: '🎵' },
    { platform: 'Instagram', url: '', icon: '📱' },
  ],

  stats: {
    participants: 2847,
    sessions: 88,
    rating: 4.9,  
    completionRate: 87
  }
};

// Referencias al DOM
const programName = document.getElementById('entity-name');
const programDescription = document.getElementById('entity-description');
const programIdentifier = document.getElementById('entity-identifier');
const contactInfo = document.getElementById('contact-info');
const techniquesList = document.getElementById('items-list');
const linksList = document.getElementById('links-list');
const statsContainer = document.getElementById('stats');
const copyBtn = document.getElementById('copy-btn');
const toggleTechniquesBtn = document.getElementById('toggle-items');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Renderizar información básica
const renderBasicInfo = () => {
  const { name, description, identifier, contact: { email, phone, location } } = entityData;

  programName.textContent = name;
  programDescription.innerHTML = `<p>${description}</p>`;
  programIdentifier.textContent = `Código: ${identifier}`;
  
  contactInfo.innerHTML = `
    <div class="contact-item">
      <span class="contact-icon">📧</span>
      <span>${email}</span>
    </div>
    <div class="contact-item">
      <span class="contact-icon">📞</span>
      <span>${phone}</span>
    </div>
    <div class="contact-item">
      <span class="contact-icon">📍</span>
      <span>${location}</span>
    </div>
  `;
};

// Renderizar técnicas
const renderItems = (showAll = false) => {
  const { techniques } = entityData;
  const techniquesToShow = showAll ? techniques : techniques.slice(0, 4);

  const techniquesHtml = techniquesToShow.map(technique => {
    const { name, level, category } = technique;
    
    let barColor = '#7c3aed';
    if (level >= 80) barColor = '#10b981';
    else if (level >= 60) barColor = '#f59e0b';
    else barColor = '#ef4444';
    
    return `
      <div class="item">
        <div class="item-header">
          <div class="item-name">${name}</div>
          <span class="item-category">${category}</span>
        </div>
        <div class="item-level">
          <span class="level-percentage">${level}%</span>
          <div class="level-bar">
            <div class="level-fill" style="width: ${level}%; background-color: ${barColor}"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  techniquesList.innerHTML = techniquesHtml;
};

// Renderizar enlaces
const renderLinks = () => {
  const { links } = entityData;

  const linksHtml = links.map(link => {
    const { platform, url, icon } = link;
    return `
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-item">
        <span class="link-icon">${icon}</span>
        <span class="link-platform">${platform}</span>
      </a>
    `;
  }).join('');

  linksList.innerHTML = linksHtml;
};

// Renderizar estadísticas
const renderStats = () => {
  const { stats } = entityData;

  const statsArray = [
    { label: 'Participantes', value: stats.participants.toLocaleString('es-CO'), icon: '👥' },
    { label: 'Sesiones', value: stats.sessions, icon: '🧘' },
    { label: 'Calificación', value: `${stats.rating}/5`, icon: '⭐' },
    { label: 'Tasa de Completación', value: `${stats.completionRate}%`, icon: '✅' }
  ];

  const statsHtml = statsArray.map(stat => `
    <div class="stat-item">
      <span class="stat-icon">${stat.icon}</span>
      <span class="stat-value">${stat.value}</span>
      <span class="stat-label">${stat.label}</span>
    </div>
  `).join('');

  statsContainer.innerHTML = statsHtml;
};

// Copiar información
const copyInfo = () => {
  const { name, description, identifier, contact, stats } = entityData;

  const infoText = `
${name}
${identifier}

${description}

📧 Email: ${contact.email}
📞 Teléfono: ${contact.phone}
📍 Ubicación: ${contact.location}

Estadísticas:
👥 Participantes: ${stats.participants.toLocaleString('es-CO')}
🧘 Sesiones: ${stats.sessions}
⭐ Calificación: ${stats.rating}/5
✅ Tasa de Completación: ${stats.completionRate}%
  `.trim();

  navigator.clipboard.writeText(infoText)
    .then(() => {
      showToast('✅ ¡Información copiada!');
    })
    .catch(() => {
      showToast('❌ Error al copiar');
    });
};

// Mostrar toast
const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// Toggle técnicas
let showingAllTechniques = false;

const handleToggleItems = () => {
  showingAllTechniques = !showingAllTechniques;
  renderItems(showingAllTechniques);
  toggleTechniquesBtn.textContent = showingAllTechniques 
    ? '🔼 Mostrar menos' 
    : '🔽 Mostrar más técnicas';
};

// Event Listeners
copyBtn.addEventListener('click', copyInfo);
toggleTechniquesBtn.addEventListener('click', handleToggleItems);

// Inicializar
const init = () => {
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log('✅ Aplicación inicializada');
};

init();

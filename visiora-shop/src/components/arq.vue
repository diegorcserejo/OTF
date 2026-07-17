<template>
  <div class="app-viewport">
    <!-- Fundo com círculos de gradiente suave/etéreo -->
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>

    <div class="main-container">
      <!-- TEXTO GIGANTE DE FUNDO -->
      <div class="bg-text-back">{{ activeGroup.toUpperCase() }}</div>

      <!-- NAVBAR -->
      <nav class="glass-nav animate-fade-in">
        <div class="logo">
          <span class="logo-icon">✨</span> OTF
        </div>
        <div class="nav-links">
          <a 
            v-for="group in Object.keys(database)" 
            :key="group" 
            href="#" 
            :class="{ active: activeGroup === group }"
            @click.prevent="switchGroup(group)"
          >
            {{ database[group].name }}
          </a>
        </div>
        <div class="nav-icons">
          <button class="icon-btn">🔍</button>
          <button class="icon-btn">❤️</button>
          <button class="icon-btn profile-btn">👤</button>
        </div>
      </nav>

      <!-- HERO SECTION (Destaque do Grupo/Unit) -->
      <header class="hero-section">
        <div class="hero-left animate-slide-right">
          <div class="concept-badge">ACTIVE CONCEPT</div>
          <p class="hero-subtitle">
            {{ currentData.description }}
          </p>
          <div class="stats-container-glass">
            <div class="stat-box">
              <span class="stat-value">{{ currentData.members.length }}</span>
              <span class="stat-label">Members</span>
            </div>
            <div class="stat-box">
              <span class="stat-value">{{ 'units' in currentData && currentData.units ? currentData.units.length : 1 }}</span>
              <span class="stat-label">Units</span>
            </div>
          </div>
        </div>

        <!-- TÍTULO VAZADO E FOTO CONCEITO CENTRAL -->
        <div class="hero-center animate-fade-in">
          <h1 class="hero-title">
            <span class="title-top">Visual</span>
            <span class="title-bottom">Center</span>
          </h1>
          <div class="model-container">
            <img :src="selectedMember.image" :alt="selectedMember.name" class="model-img" />
            <div class="model-fade-bottom"></div>
          </div>
        </div>

        <!-- WIDGET DE INFORMAÇÕES DETALHADAS DO INTEGRANTE SELECIONADO -->
        <div class="hero-right animate-slide-left">
          <div class="glass-widget profile-widget">
            <span class="widget-tag">MEMBER PROFILE</span>
            <h2 class="member-name">{{ selectedMember.name }}</h2>
            <span class="member-role-tag">{{ selectedMember.role }}</span>
            
            <div class="profile-details">
              <div class="detail-row"><span>Born:</span> <strong>{{ selectedMember.birthday }}</strong></div>
              <div class="detail-row"><span>Height:</span> <strong>{{ selectedMember.height }}</strong></div>
              <div class="detail-row"><span>Nationality:</span> <strong>{{ selectedMember.nationality }}</strong></div>
            </div>

            <!-- Skills Progress Bars -->
            <div class="skills-section">
              <div class="skill-bar-wrapper" v-for="(val, skill) in selectedMember.stats" :key="skill">
                <div class="skill-labels">
                  <span class="skill-name">{{ skill }}</span>
                  <span class="skill-val">{{ val }}%</span>
                </div>
                <div class="bar-bg"><div class="bar-fill" :style="{ width: val + '%' }"></div></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- SEÇÃO SUB-UNITS (Abas de Navegação Dinâmica) -->
      <section class="units-section-container" v-if="database[activeGroup].units">
        <div class="glass-search-bar">
          <h2 class="search-title">Explore Sub-Units</h2>
          <div class="unit-tabs">
            <button 
              class="unit-tab-btn" 
              :class="{ active: activeUnit === 'all' }"
              @click="activeUnit = 'all'"
            >
              Full Group
            </button>
            <button 
              v-for="unit in database[activeGroup].units" 
              :key="unit.id"
              class="unit-tab-btn" 
              :class="{ active: activeUnit === unit.id }"
              @click="activeUnit = unit.id"
            >
              {{ unit.name }}
            </button>
          </div>
        </div>
      </section>

      <!-- SEÇÃO INTEGRANTES -->
      <section class="shop-section">
        <!-- Sidebar Esquerda: Lista Rápida -->
        <aside class="category-sidebar">
          <h3 class="section-heading">Lineup</h3>
          <ul class="category-list">
            <li 
              v-for="member in currentData.members" 
              :key="member.name"
              class="category-item"
              :class="{ 'active': selectedMember.name === member.name }"
              @click="selectedMember = member"
            >
              <span>👤 {{ member.name }}</span> 
              <span class="badge-role">{{ member.role.split(',')[0] }}</span>
            </li>
          </ul>
        </aside>

        <!-- Grid da Direita: Cards dos Integrantes -->
        <div class="products-grid-wrapper">
          <div class="products-grid">
            <div 
              v-for="member in currentData.members" 
              :key="member.name"
              class="product-card glass-card"
              :class="{ 'selected-card': selectedMember.name === member.name }"
              @click="selectedMember = member"
            >
              <div class="product-image-container">
                <img :src="member.image" :alt="member.name" class="card-member-img" />
              </div>
              <div class="product-info">
                <h4 class="product-title">{{ member.name }}</h4>
                <div class="product-meta">
                  <span class="role-text">{{ member.role }}</span>
                </div>
                <div class="card-actions">
                  <button class="btn-primary gradient-purple">View Full Bio</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// --- BANCO DE DADOS OFICIAL: OTF ---
interface Member {
  name: string;
  role: string;
  birthday: string;
  height: string;
  nationality: string;
  image: string;
  stats: { [key: string]: number };
}

interface Unit {
  id: string;
  name: string;
  description: string;
  members: Member[];
}

interface GroupData {
  name: string;
  description: string;
  members: Member[];
  units?: Unit[];
}

// Definição completa da lineup da OTF
const otfMembers: Member[] = [
  { name: 'Biel', role: 'Main Vocal, Lead-rapper, Sub-dancer', birthday: '30 de Dezembro', height: '176 cm', nationality: 'Korean', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=1000', stats: { Vocal: 96, Dance: 68, Rap: 82, Visual: 84 } },
  { name: 'Cauy', role: 'Main Vocal, Sub-rapper, Sub-dancer', birthday: '11 de Setembro', height: '174 cm', nationality: 'Korean', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000', stats: { Vocal: 99, Dance: 65, Rap: 55, Visual: 85 } },
  { name: 'Guhan', role: 'Visual, Sub-vocal, Sub-rapper', birthday: '18 de Janeiro', height: '180 cm', nationality: 'Korean', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1000', stats: { Vocal: 68, Dance: 70, Rap: 62, Visual: 94 } },
  { name: 'Iggy', role: 'Leader, Solista, Main Rapper, Vocalista, Sub-dancer', birthday: '20 de Fevereiro', height: '172 cm', nationality: 'Korean', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000', stats: { Vocal: 78, Dance: 65, Rap: 97, Visual: 88 } },
  { name: 'Leb', role: 'Visual, Main Dancer, Vocalista, Sub-rapper', birthday: '05 de Março', height: '178 cm', nationality: 'Korean', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000', stats: { Vocal: 75, Dance: 98, Rap: 60, Visual: 95 } },
  { name: 'Luna', role: 'Lead-vocal, Lead-rapper, Lead-dancer', birthday: '14 de Maio', height: '165 cm', nationality: 'Korean', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000', stats: { Vocal: 88, Dance: 88, Rap: 85, Visual: 80 } },
  { name: 'Lune', role: 'Visual, Face, Center, Lead-dancer, Sub-vocal, Maknae', birthday: '22 de Julho', height: '167 cm', nationality: 'Korean', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1000', stats: { Vocal: 70, Dance: 89, Rap: 40, Visual: 97 } }
];

const database: { [key: string]: GroupData } = {
  otf: {
    name: 'ONE&',
    description: 'OTF - Units: ONE& (Antes: One & Four e One & Five). Um grupo de alta performance focado em conceitos futuristas e narrativas profundas.',
    members: otfMembers,
    units: [
      {
        id: 'overlap',
        name: 'ONE& overl4p',
        description: 'Sub-unit focada em quebras de ritmo e misturas conceituais complexas.',
        members: [otfMembers[0], otfMembers[2], otfMembers[5]] // Exemplo: Leb, Lune, Guhan
      },
      {
        id: 'lethal',
        name: 'ONE& LETHAL VIP&RS',
        description: 'Sub-unit com o conceito mais maduro, agressivo e impactante do grupo.',
        members: [otfMembers[1], otfMembers[4], otfMembers[6]] // Exemplo: Luna, Biel, Iggy
      },
      {
        id: 'cabigy',
        name: 'CABIGY',
        description: 'Formada por Cauy, Biel e Iggy. Antiga sub-unit conhecida como ONE& RAINBOW DASH.',
        members: [otfMembers[3], otfMembers[4], otfMembers[6]] // Cauy, Biel, Iggy
      },
      {
        id: 'solos',
        name: 'Soloists',
        description: 'Solistas oficializados da OTF que possuem lançamentos e promoções individuais ativas.',
        members: [otfMembers[3], otfMembers[4], otfMembers[1], otfMembers[6]] // Cauy, Biel, Luna, Iggy
      }
    ]
  }
};

// --- ESTADOS REATIVOS ---
const activeGroup = ref('otf');
const activeUnit = ref('all');
const selectedMember = ref<Member>(database.otf.members[0]);

// Alterna o grupo principal e reseta estados filhos
const switchGroup = (groupKey: string) => {
  activeGroup.value = groupKey;
  activeUnit.value = 'all';
  selectedMember.value = database[groupKey].members[0];
};

// Computa os dados exibidos baseados no Grupo ou Unit selecionada
const currentData = computed(() => {
  const group = database[activeGroup.value];
  if (activeUnit.value !== 'all' && group.units) {
    const unit = group.units.find(u => u.id === activeUnit.value);
    if (unit) return unit;
  }
  return group;
});

// Força a seleção do primeiro membro caso ele saia da lista ao mudar de aba
watch(currentData, (newData) => {
  if (!newData.members.some(m => m.name === selectedMember.value.name)) {
    selectedMember.value = newData.members[0];
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

.app-viewport {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #f3f6fa;
  color: #1e2229;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
  padding-bottom: 100px;
}

/* Gradientes Fluidos de Fundo */
.bg-gradient-1 {
  position: absolute;
  top: -10%;
  right: -5%;
  width: 70vw;
  height: 70vw;
  background: radial-gradient(circle, rgba(234, 226, 253, 0.8) 0%, rgba(214, 230, 254, 0) 70%);
  z-index: 0;
  pointer-events: none;
}
.bg-gradient-2 {
  position: absolute;
  top: 30%;
  left: -15%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(216, 236, 248, 0.9) 0%, rgba(255, 255, 255, 0) 70%);
  z-index: 0;
  pointer-events: none;
}

.main-container {
  width: 100%;
  max-width: 100%;
  padding: 0 4%;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  overflow: hidden;
}

.bg-text-back {
  position: absolute;
  top: -2vw;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15vw;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 2vw;
  z-index: -1;
  pointer-events: none;
  user-select: none;
}

/* Glassmorphism Navbar */
.glass-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.03);
  width: 100%;
  box-sizing: border-box;
}
.logo { font-weight: 700; font-size: 1.3rem; letter-spacing: 2px; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.nav-links a {
  text-decoration: none;
  color: #5c626d;
  margin: 0 2vw;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s, transform 0.2s;
  white-space: nowrap;
}
.nav-links a.active, .nav-links a:hover { color: #000; transform: translateY(-1px); }

.nav-icons {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.icon-btn {
  background: white; border: none; width: 44px; height: 44px; border-radius: 50%; cursor: pointer;
  display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

/* Layout Hero */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  align-items: center;
  margin-top: 60px;
  gap: 30px;
  width: 100%;
  min-width: 0;
}

.hero-section > * {
  min-width: 0;
}

.concept-badge {
  background: #2b2f38; color: white; display: inline-block; padding: 6px 14px;
  border-radius: 20px; font-size: 0.75rem; font-weight: 700; margin-bottom: 16px;
}
.hero-subtitle { font-size: 1.1rem; line-height: 1.7; color: #5c626d; margin-bottom: 30px; }

.stats-container-glass {
  display: flex; gap: 20px; background: rgba(255,255,255,0.4);
  border: 1px solid rgba(255,255,255,0.6); padding: 15px 25px; border-radius: 20px; backdrop-filter: blur(10px);
}
.stat-box { display: flex; flex-direction: column; }
.stat-value { font-size: 1.8rem; font-weight: 700; color: #1e2229; }
.stat-label { font-size: 0.8rem; color: #7b7f87; font-weight: 500; }

/* Centro da imagem */
.hero-center { position: relative; display: flex; justify-content: center; align-items: center; height: 35vw; min-height: 450px; width: 100%; }
.hero-title {
  position: absolute; width: 100%; display: flex; flex-direction: column; justify-content: space-between;
  height: 90%; font-size: 8vw; font-weight: 400; line-height: 0.9; letter-spacing: -2px; z-index: 1; pointer-events: none;
}
.title-top { align-self: flex-start; color: #1e1e1e; }
.title-bottom { align-self: flex-end; color: #222; }

.model-container { position: relative; width: 22vw; min-width: 280px; max-width: 100%; height: 32vw; min-height: 380px; z-index: 2; }
.model-img { width: 100%; height: 100%; object-fit: cover; border-radius: 200px 200px 0 0; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
.model-fade-bottom {
  position: absolute; bottom: 0; left: 0; right: 0; height: 140px;
  background: linear-gradient(to top, #f3f6fa 15%, rgba(243, 246, 250, 0) 100%);
}

/* Widget Profile Detalhado */
.hero-right { z-index: 5; width: 100%; min-width: 0; overflow: hidden; }
.profile-widget {
  background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.7); border-radius: 28px; padding: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.02);
  width: 100%; box-sizing: border-box; overflow: hidden;
}
.widget-tag { font-size: 0.75rem; font-weight: 700; color: #7b7f87; display: block; margin-bottom: 8px; }
.member-name { font-size: 2rem; font-weight: 700; margin: 0; color: #1e2229; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.member-role-tag { font-size: 0.85rem; color: #4a72cb; background: #ccdcf9; padding: 4px 10px; border-radius: 8px; display: inline-block; margin-top: 6px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }

.profile-details { margin: 20px 0; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 15px; }
.detail-row { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px; gap: 8px; }
.detail-row span { color: #7b7f87; flex-shrink: 0; }
.detail-row strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Barras de Atributo */
.skills-section { display: flex; flex-direction: column; gap: 12px; width: 100%; }
.skill-labels { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; margin-bottom: 4px; }
.bar-bg { background: rgba(0, 0, 0, 0.05); height: 6px; border-radius: 3px; overflow: hidden; width: 100%; }
.bar-fill { background: linear-gradient(90deg, #b3c5f9, #e1bbf7); height: 100%; border-radius: 3px; transition: width 0.5s ease-out; }

/* Sub-Units Navigation Section */
.units-section-container { margin: 60px 0 30px 0; width: 100%; }
.glass-search-bar {
  background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 35px; padding: 20px 44px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;
  width: 100%; box-sizing: border-box;
}
.search-title { font-size: 1.4rem; font-weight: 600; }
.unit-tabs { display: flex; gap: 10px; flex-wrap: wrap; }
.unit-tab-btn {
  background: white; border: 1px solid rgba(0,0,0,0.05); padding: 10px 24px; border-radius: 20px;
  font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 0.9rem; color: #5c626d;
}
.unit-tab-btn:hover { background: #fafafa; color: #000; }
.unit-tab-btn.active { background: #2b2f38; color: white; border-color: #2b2f38; }

/* Grid Inferior de Integrantes */
.shop-section { display: grid; grid-template-columns: 280px 1fr; gap: 50px; width: 100%; min-width: 0; }
.shop-section > * { min-width: 0; }
.category-sidebar { padding-right: 10px; }
.section-heading { font-size: 1.3rem; font-weight: 600; margin-bottom: 20px; }
.category-list { list-style: none; padding: 0; margin: 0; }
.category-item {
  padding: 14px 20px; border-radius: 16px; margin-bottom: 8px; cursor: pointer; font-size: 1rem;
  color: #5c626d; display: flex; justify-content: space-between; align-items: center; transition: all 0.25s; gap: 8px;
}
.category-item:hover, .category-item.active { background: white; color: #000; font-weight: 600; box-shadow: 0 4px 15px rgba(0,0,0,0.02); }
.category-item span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.badge-role { font-size: 0.75rem; color: #8a909a; font-weight: 500; flex-shrink: 0; }

.products-grid-wrapper { min-width: 0; width: 100%; overflow: hidden; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; width: 100%; box-sizing: border-box; }
.glass-card {
  background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 28px; padding: 16px; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  min-width: 0;
}
.glass-card:hover, .glass-card.selected-card { transform: translateY(-6px); box-shadow: 0 16px 36px rgba(0,0,0,0.04); }
.glass-card.selected-card { border-color: rgba(179, 197, 249, 0.8); background: rgba(255,255,255,0.6); }

.product-image-container { background: linear-gradient(135deg, #eef3fa, #f4effa); border-radius: 20px; height: 260px; overflow: hidden; width: 100%; }
.card-member-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.glass-card:hover .card-member-img { transform: scale(1.04); }

.product-info { margin-top: 14px; text-align: center; overflow: hidden; }
.product-title { font-size: 1.2rem; font-weight: 600; margin: 0 0 4px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.role-text { font-size: 0.85rem; color: #7b7f87; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.card-actions { margin-top: 14px; }
.btn-primary {
  width: 100%; color: white; border: none; padding: 10px 0; border-radius: 14px; font-size: 0.85rem; font-weight: 600; cursor: pointer;
}
.gradient-purple { background: linear-gradient(90deg, #b3c5f9, #e1bbf7); }

/* Animações */
.animate-fade-in { animation: fadeIn 1s ease-out; }
.animate-slide-right { animation: slideRight 1s cubic-bezier(0.19, 1, 0.22, 1); }
.animate-slide-left { animation: slideLeft 1s cubic-bezier(0.19, 1, 0.22, 1); }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideRight { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes slideLeft { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }

@media (max-width: 1024px) {
  .hero-section { grid-template-columns: 1fr; text-align: center; }
  .hero-title { font-size: 12vw; position: relative; }
  .title-top, .title-bottom { align-self: center; }
  .shop-section { grid-template-columns: 1fr; }
}
</style>
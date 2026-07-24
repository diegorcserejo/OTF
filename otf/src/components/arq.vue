<template>
  <div class="app-viewport" :style="appStyle">
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>

    <div class="main-container">
      <div class="bg-text-back">{{ currentBackgroundText }}</div>

      <nav class="glass-nav animate-fade-in">
        <div class="logo">
          <svg class="logo-svg" viewBox="0 0 36 36" width="36" height="36">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#7c6ff7"/>
                <stop offset="50%" stop-color="#a78bfa"/>
                <stop offset="100%" stop-color="#e1bbf7"/>
              </linearGradient>
            </defs>
            <circle cx="18" cy="18" r="16" fill="url(#logoGrad)" opacity="0.15"/>
            <circle cx="18" cy="18" r="12" fill="url(#logoGrad)" opacity="0.25"/>
            <text x="18" y="22" text-anchor="middle" fill="url(#logoGrad)" font-size="16" font-weight="800" font-family="'Plus Jakarta Sans', sans-serif">O</text>
          </svg>
          <span class="logo-text">OTF</span>
        </div>
        <div class="nav-links" :class="{ open: mobileMenuOpen }">
          <button 
            v-for="group in Object.keys(database)" 
            :key="group" 
            class="nav-link-btn"
            :class="{ active: activeGroup === group }"
            @click="switchGroup(group); mobileMenuOpen = false"
          >
            {{ database[group].name }}
          </button>
        </div>
        <div class="nav-icons">
          <button class="icon-btn" @click="searchOpen = !searchOpen" title="Search">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <button class="icon-btn" @click="showFavorites = !showFavorites" title="Favorites">
            <i class="fa-regular fa-heart" :class="{ 'liked': showFavorites }"></i>
          </button>
          <div class="profile-dropdown">
            <button class="icon-btn profile-btn" @click="profileMenuOpen = !profileMenuOpen" title="Profile">
              <i class="fa-regular fa-user"></i>
            </button>
            <div class="profile-menu" v-if="profileMenuOpen">
              <div class="profile-menu-header">
                <strong>{{ selectedMember.name }}</strong>
                <span>{{ selectedMember.role.split(',')[0] }}</span>
              </div>
              <div class="profile-menu-item" @click="scrollToSection('profile-section')">
                <i class="fa-regular fa-id-card"></i> View Profile
              </div>
              <div class="profile-menu-item" @click="scrollToSection('units-section'); activeGroup = 'otf'; activeUnit = 'all'">
                <i class="fa-regular fa-users"></i> Browse Groups
              </div>
            </div>
          </div>
          <button 
            class="hamburger-btn" 
            :class="{ open: mobileMenuOpen }"
            @click="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div class="overlay-backdrop" v-if="profileMenuOpen || searchOpen" @click="profileMenuOpen = false; searchOpen = false"></div>

      <div class="search-overlay" v-if="searchOpen" @click.self="searchOpen = false">
        <div class="search-modal">
          <div class="search-input-wrapper">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search members..." 
              class="search-input"
              ref="searchInput"
              @keyup.escape="searchOpen = false"
            />
            <button class="search-close" @click="searchOpen = false">&times;</button>
          </div>
          <div class="search-results" v-if="searchQuery.length > 0">
            <div 
              v-for="member in filteredMembers" 
              :key="member.name"
              class="search-result-item"
              @click="selectMember(member); searchOpen = false"
            >
              <img :src="member.image" :alt="member.name" class="search-result-img" />
              <div class="search-result-info">
                <strong>{{ member.name }}</strong>
                <span>{{ member.role.split(',')[0] }}</span>
              </div>
            </div>
            <div class="search-no-results" v-if="filteredMembers.length === 0">
              No members found matching "{{ searchQuery }}"
            </div>
          </div>
          <div class="search-hint" v-else>
            <p>Type a member's name to search across all groups</p>
          </div>
        </div>
      </div>

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

        <div class="hero-center animate-fade-in">
          <div class="model-container">
            <img :src="heroImage" :alt="heroTitle" class="model-img" />
            <div class="model-fade-bottom"></div>
          </div>
        </div>

        <div id="profile-section" class="hero-right animate-slide-left">
          <div v-if="activeUnit === 'all' && !memberSelected" class="glass-widget profile-widget">
            <span class="widget-tag">GROUP INFO</span>
            <h2 class="member-name">{{ currentGroupData.name }}</h2>
            
            <div class="profile-details">
              <div class="detail-row"><span>Debut:</span> <strong>{{ currentGroupData.debutDate }}</strong></div>
              <div class="detail-row"><span>Debut Song:</span> <strong>{{ currentGroupData.debutSong }}</strong></div>
            </div>
          </div>
          <div v-else class="glass-widget profile-widget">
            <span class="widget-tag">MEMBER PROFILE</span>
            <h2 class="member-name">{{ selectedMember.name }}</h2>
            <span class="member-role-tag">{{ selectedMember.role }}</span>
            
            <div class="profile-details">
              <div class="detail-row"><span>Born:</span> <strong>{{ selectedMember.birthday }}</strong></div>
              <div class="detail-row"><span>Height:</span> <strong>{{ selectedMember.height }}</strong></div>
              <div class="detail-row"><span>Sign:</span> <strong>{{ selectedMember.sign }}</strong></div>
              <div class="detail-row"><span>Nationality:</span> <strong>{{ selectedMember.nationality }}</strong></div>
            </div>

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

      <section id="units-section" class="units-section-container" v-if="database[activeGroup].units">
        <div class="glass-search-bar">
          <h2 class="search-title">Explore Sub-Units</h2>
          <div class="unit-tabs">
            <button 
              class="unit-tab-btn" 
              :class="{ active: activeUnit === 'all' }"
              @click="selectFullGroup"
            >
              Full Group
            </button>
            <button 
              v-for="unit in database[activeGroup].units" 
              :key="unit.id"
              class="unit-tab-btn" 
              :class="{ active: activeUnit === unit.id }"
              @click="selectUnit(unit.id)"
            >
              {{ unit.name }}
            </button>
          </div>
        </div>
      </section>

      <section class="shop-section">
      <aside class="category-sidebar">
        <h3 class="section-heading">MEMBERS</h3>
        <ul class="category-list">
          <li 
            v-for="member in currentData.members" 
            :key="member.name"
            class="category-item"
            :class="{ 'active': selectedMember.name === member.name }"
            @click="selectMemberAction(member)"
          >
            <div class="category-item-info">
              <img :src="member.image" :alt="member.name" class="member-avatar" />
              <span>{{ member.name }}</span>
            </div>
            <span class="badge-role">{{ member.role.split(',')[0] }}</span>
          </li>
        </ul>
        <div v-if="database[activeGroup].exMembers" style="margin-top: 20px;">
          <h3 class="section-heading">EX-MEMBERS</h3>
          <ul class="category-list">
            <li 
              v-for="member in sortedExMembers" 
              :key="member.name"
              class="category-item"
              :class="{ 'active': selectedMember.name === member.name }"
              @click="selectMemberAction(member)"
            >
              <div class="category-item-info">
                <img :src="member.image" :alt="member.name" class="member-avatar" />
                <span>{{ member.name }}</span>
              </div>
              <span class="badge-role">{{ member.role.split(',')[0] }}</span>
            </li>
          </ul>
        </div>
      </aside>

      <div class="products-grid-wrapper">
        <div class="products-grid">
          <div 
            v-for="member in currentData.members" 
            :key="member.name"
            class="product-card glass-card"
            :class="{ 'selected-card': selectedMember.name === member.name }"
            @click="selectMemberAction(member)"
          >
            <div class="product-image-container">
              <img :src="member.image" :alt="member.name" class="card-member-img" />
            </div>
            
            <div class="product-info">
              <h4 class="product-title">{{ member.name }}</h4>
              <p class="role-text" :title="member.role">{{ member.role }}</p>
              
              <div class="card-actions">
                <button class="btn-primary gradient-purple">View Full Bio</button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="database[activeGroup].exMembers" class="products-grid" style="margin-top: 20px;">
          <div 
            v-for="member in sortedExMembers" 
            :key="member.name"
            class="product-card glass-card"
            :class="{ 'selected-card': selectedMember.name === member.name }"
            @click="selectMemberAction(member)"
          >
            <div class="product-image-container">
              <img :src="member.image" :alt="member.name" class="card-member-img" />
            </div>
            
            <div class="product-info">
              <h4 class="product-title">{{ member.name }}</h4>
              <p class="role-text" :title="member.role">{{ member.role }}</p>
              
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
import { ref, computed, watch, nextTick } from 'vue';
import { database } from '../data/database';
import type { Member } from '../types';
import '../styles/main.css';

const activeGroup = ref('otf');
const activeUnit = ref('all');
const selectedMember = ref<Member>(database.otf.members[0]);
const memberSelected = ref(false);
const mobileMenuOpen = ref(false);
const searchOpen = ref(false);
const searchQuery = ref('');
const showFavorites = ref(false);
const profileMenuOpen = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);

// ===== CORES DINÂMICAS =====

const appStyle = ref<Record<string, string>>({
  backgroundColor: '#121824'
});

const MEMBER_COLORS: Record<string, string> = {
  'Biel': '#4f80ff',
  'Cauy': '#ff00bf',
  'Guhan': '#1a0b8c',
  'Iggy': '#ca3d33',
  'Leb': '#00fff0',
  'Luna': '#ffc700',
  'Lune': '#9e00ff'
};

function setDefaultColors() {
  appStyle.value = { 
    background: 'linear-gradient(135deg, #d3a5a4, #407bd7)',
    minHeight: '100vh'
  };
}

function setMemberColors(name: string) {
  if (MEMBER_COLORS[name]) {
    appStyle.value = { backgroundColor: MEMBER_COLORS[name] };
  } else {
    setDefaultColors();
  }
}

setDefaultColors();

// ===== FUNÇÕES =====

const sortedExMembers = computed(() => {
  const group = database[activeGroup.value];
  if (!group.exMembers) return [];
  return [...group.exMembers].sort((a, b) => a.name.localeCompare(b.name));
});

const switchGroup = (groupKey: string) => {
  activeGroup.value = groupKey;
  activeUnit.value = 'all';
  memberSelected.value = false;
  setDefaultColors();
  if (database[groupKey].members.length > 0) {
    selectedMember.value = database[groupKey].members[0];
  }
};

const selectMember = (member: Member) => {
  selectedMember.value = member;
  activeUnit.value = 'all';
  memberSelected.value = true;
  setMemberColors(member.name);

  for (const [key, group] of Object.entries(database)) {
    if (group.members.some(m => m.name === member.name)) {
      activeGroup.value = key;
      break;
    }
  }
};

const selectFullGroup = () => {
  activeUnit.value = 'all';
  memberSelected.value = false;
  setDefaultColors();
  if (database[activeGroup.value].members.length > 0) {
    selectedMember.value = database[activeGroup.value].members[0];
  }
};

const selectUnit = (unitId: string) => {
  activeUnit.value = unitId;
  memberSelected.value = false;
  setDefaultColors();
  const group = database[activeGroup.value];
  if (group.units) {
    const unit = group.units.find(u => u.id === unitId);
    if (unit && unit.members.length > 0) {
      selectedMember.value = unit.members[0];
    }
  }
};

const selectMemberAction = (member: Member) => {
  selectedMember.value = member;
  memberSelected.value = true;
  setMemberColors(member.name);
};

const scrollToSection = (sectionId: string) => {
  profileMenuOpen.value = false;

  nextTick(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  });
};

const filteredMembers = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return [];
  const results: Member[] = [];
  const seen = new Set<string>();
  for (const group of Object.values(database)) {
    for (const member of group.members) {
      if (member.name.toLowerCase().includes(query) && !seen.has(member.name)) {
        seen.add(member.name);
        results.push(member);
      }
    }
  }
  return results;
});

const currentGroupData = computed(() => {
  return database[activeGroup.value];
});

const heroImage = computed(() => {
  if (activeUnit.value === 'all' && !memberSelected.value) {
    return currentGroupData.value.image || selectedMember.value.image;
  }
  return selectedMember.value.image;
});

const heroTitle = computed(() => {
  if (activeUnit.value === 'all' && !memberSelected.value) {
    return currentGroupData.value.name;
  }
  return selectedMember.value.name;
});

const currentBackgroundText = computed(() => {
  const group = database[activeGroup.value];
  if (activeUnit.value !== 'all' && group.units) {
    const unit = group.units.find(u => u.id === activeUnit.value);
    if (unit) return unit.name.toUpperCase();
  }
  return group.name.toUpperCase();
});

const currentData = computed(() => {
  const group = database[activeGroup.value];
  if (activeUnit.value !== 'all' && group.units) {
    const unit = group.units.find(u => u.id === activeUnit.value);
    if (unit) return unit;
  }
  return group;
});

watch(searchOpen, async (val) => {
  if (val) {
    await nextTick();
    searchInput.value?.focus();
    searchQuery.value = '';
  }
});

watch(currentData, (newData) => {
  if (!newData.members.some(m => m.name === selectedMember.value.name)) {
    selectedMember.value = newData.members[0];
  }
});
</script>
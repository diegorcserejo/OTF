<template>
  <div class="app-viewport">
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>

    <div class="main-container">
      <div class="bg-text-back">{{ activeGroup.toUpperCase() }}</div>

      <nav class="glass-nav animate-fade-in">
        <div class="logo">
          <span class="logo-icon">✨</span> OTF
        </div>
        <div class="nav-links" :class="{ open: mobileMenuOpen }">
          <a 
            v-for="group in Object.keys(database)" 
            :key="group" 
            href="#" 
            :class="{ active: activeGroup === group }"
            @click.prevent="switchGroup(group); mobileMenuOpen = false"
          >
            {{ database[group].name }}
          </a>
        </div>
        <div class="nav-icons">
          <button class="icon-btn">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <button class="icon-btn">
            <i class="fa-regular fa-heart"></i>
          </button>
          <button class="icon-btn profile-btn">
            <i class="fa-regular fa-user"></i>
          </button>
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
            <img :src="selectedMember.image" :alt="selectedMember.name" class="model-img" />
            <div class="model-fade-bottom"></div>
          </div>
        </div>

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

      <section class="shop-section">
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
import { database } from '../data/database';
import type { Member } from '../types';
import '../styles/main.css';

const activeGroup = ref('otf');
const activeUnit = ref('all');
const selectedMember = ref<Member>(database.otf.members[0]);
const mobileMenuOpen = ref(false);

const switchGroup = (groupKey: string) => {
  activeGroup.value = groupKey;
  activeUnit.value = 'all';
  selectedMember.value = database[groupKey].members[0];
};

const currentData = computed(() => {
  const group = database[activeGroup.value];
  if (activeUnit.value !== 'all' && group.units) {
    const unit = group.units.find(u => u.id === activeUnit.value);
    if (unit) return unit;
  }
  return group;
});

watch(currentData, (newData) => {
  if (!newData.members.some(m => m.name === selectedMember.value.name)) {
    selectedMember.value = newData.members[0];
  }
});
</script>
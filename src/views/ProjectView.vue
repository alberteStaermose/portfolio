<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects.js'
const route = useRoute()
const project = computed(() => projects.find(item => item.slug === route.params.slug))
</script>

<template>
  <article v-if="project" class="case-study">
    <div class="case-top"><RouterLink to="/#arbejde">← TILBAGE TIL ARKIVET</RouterLink><span>{{ project.year || 'VISUELT ARKIV' }}</span></div>
    <header class="case-header">
      <p class="eyebrow">{{ project.category }}</p>
      <h1>{{ project.title }}</h1>
      <p v-if="project.description" class="case-intro">{{ project.description }}</p>
    </header>
    <div v-if="project.image" class="case-cover"><img :src="project.image" :alt="project.imageAlt || project.title" /></div>
    <div v-if="project.body" class="case-body"><p>{{ project.body }}</p></div>
    <div v-if="project.gallery?.length" class="case-gallery">
      <figure v-for="(item, index) in project.gallery" :key="index">
        <img :src="typeof item === 'string' ? item : item.src" :alt="typeof item === 'string' ? project.title : (item.alt || project.title)" loading="lazy" />
        <figcaption v-if="item.caption">{{ item.caption }}</figcaption>
      </figure>
    </div>
    <RouterLink class="case-return" to="/">← SE FLERE PROJEKTER</RouterLink>
  </article>
  <section v-else class="project-detail"><h1>Projektet blev ikke fundet</h1><RouterLink to="/">← Tilbage til forsiden</RouterLink></section>
</template>

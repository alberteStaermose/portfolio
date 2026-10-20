<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects.js'
const route = useRoute()
const project = computed(() => projects.find(item => item.slug === route.params.slug))
const introductorySections = computed(() => project.value?.slug === "while-in-battle" ? project.value.sections?.slice(0, 3) : project.value?.sections)
const prototypeSection = computed(() => project.value?.slug === "while-in-battle" ? project.value.sections?.find(section => section.heading === "KODET PROTOTYPE PÅ KAMPGNESITE") : null)
</script>

<template>
  <article v-if="project" class="case-study">
    <div class="case-top"><RouterLink to="/#arbejde">← TILBAGE TIL ARKIVET</RouterLink><span>{{ project.year || 'VISUELT ARKIV' }}</span></div>
    <div class="case-introduction">
      <header class="case-header">
        <p class="eyebrow">{{ project.category }}</p>
        <h1>{{ project.title }}</h1>
        <p v-if="project.description && !project.sections?.length" class="case-intro">{{ project.description }}</p>
      </header>
      <div v-if="project.projectType || project.role || project.client" class="case-meta">
        <div v-if="project.projectType"><strong>Projektets type</strong><p>{{ project.projectType }}</p></div>
        <div v-if="project.role"><strong>Min rolle</strong><p>{{ project.role }}</p></div>
        <div v-if="project.client"><strong>Kunden</strong><p>{{ project.client }}</p></div>
      </div>
    </div>
    <div v-if="introductorySections?.length" class="case-sections">
      <section v-for="(section, index) in introductorySections" :key="index" class="case-text-section">
        <h2>{{ section.heading }}</h2>
        <template v-for="(paragraph, paragraphIndex) in section.paragraphs" :key="paragraphIndex">
          <div v-if="typeof paragraph === 'object'" class="case-subsection">
            <h3>{{ paragraph.subheading }}</h3>
            <p style="white-space: pre-line">{{ paragraph.text }}</p>
          </div>
          <p v-else>{{ paragraph }}</p>
        </template>
      </section>
    </div>
    <div v-if="project.image" class="case-cover"><img :src="project.image" :alt="project.imageAlt || project.title" /></div>
    <div v-if="project.body" class="case-body"><p>{{ project.body }}</p></div>
    <div v-if="project.gallery?.length" class="case-gallery">
      <figure v-for="(item, index) in project.gallery" :key="index">
        <img :src="typeof item === 'string' ? item : item.src" :alt="typeof item === 'string' ? project.title : (item.alt || project.title)" loading="lazy" />
        <figcaption v-if="item.caption">{{ item.caption }}</figcaption>
      </figure>
    </div>
    <section v-if="prototypeSection" class="case-text-section case-prototype-section">
      <h2>{{ prototypeSection.heading }}</h2>
      <p v-for="(paragraph, index) in prototypeSection.paragraphs" :key="index">{{ paragraph }}</p>
      <a v-if="project.prototypeUrl" :href="project.prototypeUrl" target="_blank" rel="noopener noreferrer">SE DEN KODEDE PROTOTYPE ↗</a>
    </section>
    <RouterLink class="case-return" to="/">← SE FLERE PROJEKTER</RouterLink>
  </article>
  <section v-else class="project-detail"><h1>Projektet blev ikke fundet</h1><RouterLink to="/">← Tilbage til forsiden</RouterLink></section>
</template>

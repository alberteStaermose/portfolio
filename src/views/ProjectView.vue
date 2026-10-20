<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects.js'
const route = useRoute()
const project = computed(() => projects.find(item => item.slug === route.params.slug))
const introductorySections = computed(() => ['while-in-battle', 'sonja'].includes(project.value?.slug) ? project.value.sections?.slice(0, 3) : project.value?.sections)
const sonjaSections = computed(() => project.value?.slug === 'sonja' ? project.value.sections?.slice(3) : [])
const sonjaImage = (name) => project.value?.gallery?.find(item => typeof item !== 'string' && item.src.endsWith('/' + name + '.webp'))
const sonjaVisuals = computed(() => ['sonjalogo2','sonjatagline','sonjagrafik','sonjainsta','sonjamenu'].map(sonjaImage).filter(Boolean))
const sonjaBrandVisuals = computed(() => ['sonjaidentitet'].map(sonjaImage).filter(Boolean))
const galleryItems = computed(() => project.value?.slug === 'sonja' ? [] : project.value?.gallery)
const prototypeSection = computed(() => project.value?.slug === "while-in-battle" ? project.value.sections?.find(section => section.heading === "KODET PROTOTYPE PÅ KAMPGNESITE") : null)
</script>

<template>
  <article v-if="project" class="case-study">
    <div class="case-top"><RouterLink to="/#arbejde">← TILBAGE TIL ARKIVET</RouterLink><span>{{ project.year || 'VISUELT ARKIV' }}</span></div>
    <div v-if="project.image" class="case-cover"><img :src="project.image" :alt="project.imageAlt || project.title" /></div>
    <div class="case-content-surface">
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
    <div v-if="project.body" class="case-body"><p>{{ project.body }}</p></div>
    <div v-if="project.slug === 'sonja'" class="sonja-visual-story">
      <figure v-for="(item, index) in sonjaVisuals" :key="index"><img :src="item.src" :alt="item.alt" loading="lazy" /></figure>
    </div>
    <div v-if="sonjaSections.length" class="sonja-editorial-sections">
      <section v-for="(section, index) in sonjaSections" :key="index" class="case-text-section" :class="{ 'sonja-strategy': section.heading === 'BRANDSTRATEGI' }">
        <h2>{{ section.heading }}</h2>
        <div class="sonja-section-content">
          <template v-for="(paragraph, paragraphIndex) in section.paragraphs" :key="paragraphIndex">
            <div v-if="typeof paragraph === 'object'" class="case-subsection"><h3>{{ paragraph.subheading }}</h3><p>{{ paragraph.text }}</p></div>
            <p v-else>{{ paragraph }}</p>
          </template>
        </div>
      </section>
    </div>
    <div v-if="project.slug === 'sonja'" class="sonja-visual-story sonja-visual-story--brand">
      <figure v-for="(item, index) in sonjaBrandVisuals" :key="index"><img :src="item.src" :alt="item.alt" loading="lazy" /></figure>
    </div>
    <div v-if="galleryItems?.length" class="case-gallery" :class="{ 'case-gallery--bufferlo': project.slug === 'bufferlo' }">
      <figure v-for="(item, index) in galleryItems" :key="index">
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
    </div>
  </article>
  <section v-else class="project-detail"><h1>Projektet blev ikke fundet</h1><RouterLink to="/">← Tilbage til forsiden</RouterLink></section>
</template>

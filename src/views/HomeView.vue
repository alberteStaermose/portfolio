<script setup>
import { wixAssets } from '../data/wixAssets.js'
import { projects } from '../data/projects.js'
const previews = [
  { name: 'blenderØenStørre.png', image: wixAssets.blenderIsland, alt: '3D-illustration fra Wix-mediebiblioteket' },
  { name: 'blenderØenUdvidet_edited.png', image: wixAssets.blenderIslandWide, alt: 'Bred 3D-illustration fra Wix-mediebiblioteket' },
]
</script>

<template>
  <section class="hero">
    <p class="eyebrow">Alberte Stærmose / Portfolio</p>
    <h1>Alberte<br><em>Stærmose.</em></h1>
    <div class="hero-bottom">
      <p>En ny portfolio under udvikling — med plads til visuelle eksperimenter, animation og interaktion.</p>
      <a href="#arbejde" class="scroll-cue" aria-label="Gå til arbejdet">↓</a>
    </div>
  </section>

  <section id="arbejde" class="projects" aria-labelledby="projects-heading">
    <div class="section-heading"><h2 id="projects-heading">Visuelt arkiv</h2><span>01 / Udvalgte filer</span></div>
    <p class="section-intro">De første billeder er hentet fra mit eksisterende Wix-mediebibliotek. Projektnavne og beskrivelser tilføjes, når de er verificeret.</p>
    <div class="project-grid asset-grid">
      <figure v-for="item in previews" :key="item.name" class="asset-card">
        <div class="asset-image"><img :src="item.image" :alt="item.alt" loading="lazy" /></div>
        <figcaption>{{ item.name }}</figcaption>
      </figure>
    </div>
    <div v-if="projects.length" class="project-grid real-projects">
      <RouterLink v-for="project in projects" :key="project.slug" :to="`/projekter/${project.slug}`" class="project-card">
        <img v-if="project.image" :src="project.image" :alt="project.imageAlt || ''" loading="lazy" />
        <div class="project-meta"><h3>{{ project.title }}</h3><span>{{ project.year }}</span></div>
      </RouterLink>
    </div>
  </section>

  <section class="about-preview" aria-labelledby="about-heading">
    <div><p class="eyebrow">02 / Om</p><h2 id="about-heading">Hej, jeg er<br><em>Alberte.</em></h2><p>Her kommer den originale introduktion fra Wix-siden, når teksten er gennemgået.</p></div>
    <img :src="wixAssets.portrait" alt="Portrætbillede fra portfolioens Wix-mediebibliotek" loading="lazy" />
  </section>
</template>

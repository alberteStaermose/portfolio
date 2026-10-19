<script setup>
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { wixAssets } from '../data/wixAssets.js'
import { projects } from '../data/projects.js'
const previews = [
  { number: '01', label: '3D / Visuelt eksperiment', image: wixAssets.blenderIsland, alt: '3D-illustration af en ø' },
  { number: '02', label: '3D / Udforskning', image: wixAssets.blenderIslandWide, alt: 'Bred 3D-illustration af en ø' }
]
let animation
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  animation = gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-kicker', { y: 20, opacity: 0, duration: .7 })
    .from('.hero-title .line', { yPercent: 110, duration: 1.2, stagger: .16 }, '-=.4')
    .from('.hero-bottom', { y: 20, opacity: 0, duration: .8 }, '-=.5')
})
onUnmounted(() => animation?.kill())
</script>
<template>
  <section class="hero">
    <div class="hero-topline"><p class="eyebrow hero-kicker">Alberte Stærmose <span class="topline-divider">✳</span> Visuel portfolio</p><span class="hero-edition">2026 — ↗</span></div>
    <h1 class="hero-title" aria-label="Alberte Stærmose"><span class="line-mask"><span class="line">Alberte</span></span><span class="line-mask"><span class="line"><em>Stærmose</em><span class="hero-period">.</span></span></span></h1>
    <div class="hero-bottom"><p>Et visuelt univers med plads til idéer, form, farver og eksperimenter.</p><a href="#arbejde" class="scroll-cue" aria-label="Gå til arbejdet"><span>Udforsk arbejdet</span><span class="scroll-arrow">↘</span></a></div>
    <span class="hero-sticker" aria-hidden="true">✳</span>
  </section>
  <section id="arbejde" class="projects" aria-labelledby="projects-heading">
    <div class="section-heading"><div><p class="eyebrow">01 / Udforsk</p><h2 id="projects-heading">Udvalgte <em>visuals.</em></h2></div><span class="section-count">Et arkiv i udvikling ↗</span></div>
    <div class="project-grid asset-grid">
      <figure v-for="item in previews" :key="item.number" class="asset-card">
        <div class="asset-image"><img :src="item.image" :alt="item.alt" loading="lazy" /><span class="asset-number">{{ item.number }}</span></div>
        <figcaption><span>{{ item.label }}</span><span>↗</span></figcaption>
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
    <div><p class="eyebrow">02 / Bag skærmen</p><h2 id="about-heading">Hej, jeg er<br><em>Alberte.</em></h2><p>Velkommen til mit kreative hjørne af internettet. Her samler jeg visuelle idéer, projekter og eksperimenter.</p></div>
    <div class="portrait-wrap"><img :src="wixAssets.portrait" alt="Portræt fra Albertes portfolio" loading="lazy" /><span class="portrait-decoration" aria-hidden="true">✳</span></div>
  </section>
</template>
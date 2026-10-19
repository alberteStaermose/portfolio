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
let handlePointerMove
let handlePointerLeave
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const hero = document.querySelector('.hero')
  const lines = document.querySelectorAll('.hero-title .line')
  handlePointerMove = (event) => {
    const rect = hero.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - .5
    const y = (event.clientY - rect.top) / rect.height - .5
    gsap.to(lines[0], { x: x * 34, y: y * 16, duration: .9, ease: 'power3.out', overwrite: 'auto' })
    gsap.to(lines[1], { x: -x * 48, y: -y * 20, duration: 1.1, ease: 'power3.out', overwrite: 'auto' })
  }
  handlePointerLeave = () => gsap.to(lines, { x: 0, y: 0, duration: .9, ease: 'power3.out', overwrite: 'auto' })
  if (window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', handlePointerMove)
    hero.addEventListener('pointerleave', handlePointerLeave)
  }
  animation = gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-kicker', { y: 20, opacity: 0, duration: .7 })
    .from('.hero-title .line', { yPercent: 110, duration: 1.2, stagger: .16 }, '-=.4')
    .from('.hero-bottom', { y: 20, opacity: 0, duration: .8 }, '-=.5')
})
onUnmounted(() => {
  animation?.kill()
  const hero = document.querySelector('.hero')
  if (hero && handlePointerMove) hero.removeEventListener('pointermove', handlePointerMove)
  if (hero && handlePointerLeave) hero.removeEventListener('pointerleave', handlePointerLeave)
})
</script>
<template>
  <section class="hero">
    <div class="hero-topline"><p class="eyebrow hero-kicker">Alberte Stærmose <span class="topline-divider">/</span> Portfolio</p><span class="hero-edition">Index / 2026</span></div>
    <h1 class="hero-title" aria-label="Alberte Stærmose"><span class="line-mask"><span class="line">Alberte</span></span><span class="line-mask"><span class="line"><em>Stærmose</em><span class="hero-period">.</span></span></span></h1>
    <div class="hero-bottom"><p>Et visuelt univers med plads til idéer, form, farver og eksperimenter.</p><a href="#arbejde" class="scroll-cue" aria-label="Gå til arbejdet"><span>Udforsk arbejdet</span><span class="scroll-arrow">↘</span></a></div>
  </section>
  <section id="arbejde" class="projects" aria-labelledby="projects-heading">
    <div class="section-heading"><div><p class="eyebrow">01 / Udforsk</p><h2 id="projects-heading">Noget jeg har lavet.</h2></div><span class="section-count">Arbejde / eksperimenter</span></div>
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
    <div class="portrait-wrap"><img :src="wixAssets.portrait" alt="Portræt fra Albertes portfolio" loading="lazy" /></div>
  </section>
</template>
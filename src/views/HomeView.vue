<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { wixAssets } from '../data/wixAssets.js'
import { projects } from '../data/projects.js'

const coverFor = (project) => project.slug === 'rf-pantsystem' ? `${import.meta.env.BASE_URL}projects/rf-pantsystem/rfplads.webp` : project.slug === 'while-in-battle' ? `${import.meta.env.BASE_URL}projects/while-in-battle/whileinbatlleplakat.webp` : project.image
const hero = ref(null)
const reveal = ref(null)
const title = ref(null)
let context

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  context = gsap.context(() => {
    gsap.from('.type-line', { yPercent: 115, duration: 1.4, stagger: .12, ease: 'expo.out' })
    gsap.from('.hero-meta', { opacity: 0, y: 18, duration: 1, delay: .45, ease: 'power2.out' })
    gsap.fromTo('.hero-artwork', { autoAlpha: 0 }, {
      autoAlpha: 1, duration: 1.5, delay: .55, ease: 'power2.out'
    })
    gsap.from('.archive-image', {
      y: 110, opacity: 0, stagger: .18, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: reveal.value, start: 'top 75%' }
    })
  }, hero.value)
})
onUnmounted(() => { context?.revert() })
</script>

<template>
  <section ref="hero" class="type-hero">
    <div class="hero-meta"><span>ALBERTE STÆRMOSE</span><span>INDEPENDENT PORTFOLIO — 2026</span></div>
    <h1 ref="title" class="hero-type" aria-label="Alberte Stærmose">
      <span class="type-clip"><span class="type-line type-line-first">ALBERTE</span></span>
      <span class="type-clip"><span class="type-line type-line-second">STÆRMOSE</span></span>
    </h1>
    <div class="hero-artwork"><img :src="wixAssets.blenderIsland" alt="Eksperimentel 3D-illustration fra Albertes arkiv" /></div>
    <div class="hero-foot hero-meta"><span>DESIGN / FORM / EKSPERIMENTER</span><a href="#arbejde">SCROLL FOR AT UDFORSKE ↓</a></div>
  </section>

  <section id="arbejde" ref="reveal" class="type-archive">
    <div class="archive-heading"><span>01 — ARKIV</span><h2>Arbejder<span class="archive-dot">.</span></h2><span>ET UDVALG FRA MIT VISUELLE ARKIV</span></div>
    <div class="archive-grid">
      <figure class="archive-entry archive-entry-one">
        <div class="archive-image">
          <img :src="wixAssets.blenderIslandWide" alt="Bred 3D-illustration fra Albertes visuelle arkiv" loading="lazy" />
        </div>
        <figcaption><span>001 / 3D-STUDIE</span><span>VISUELT ARKIV</span></figcaption>
      </figure>
      <figure class="archive-entry archive-entry-two">
        <div class="archive-image"><img :src="wixAssets.gradientSquare" alt="Grafisk gradient fra Albertes visuelle arkiv" loading="lazy" /></div>
        <figcaption><span>002 / FARVE-STUDIE</span><span>VISUELT ARKIV</span></figcaption>
      </figure>
    </div>
    <div v-if="projects.length" class="project-grid real-projects">
      <RouterLink v-for="project in projects.filter(p => !['tuborg', 'bullet-tounge'].includes(p.slug))" :key="project.slug" :to="`/projekter/${project.slug}`" class="project-card">
        <img v-if="project.image" :src="coverFor(project)" :alt="project.imageAlt || ''" loading="lazy" />
        <div class="project-meta"><h3>{{ project.title }}</h3><span>{{ project.year }}</span></div>
      </RouterLink>
    </div>
  </section>

  <section class="type-about">
    <div class="about-index">02 — OM</div>
    <div class="about-message"><h2>HEJ.<br />JEG ER<br />ALBERTE.</h2><p>Et sted til mit arbejde, mine idéer og det, der endnu ikke har fundet sin form.</p></div>
    <img :src="wixAssets.portrait" alt="Portræt fra Albertes portfolio" loading="lazy" />
  </section>
</template>
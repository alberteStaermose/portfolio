<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { wixAssets } from '../data/wixAssets.js'
import { projects } from '../data/projects.js'
gsap.registerPlugin(ScrollTrigger)

const hero = ref(null)
const reveal = ref(null)
const title = ref(null)
const hovered = ref(false)
const pointer = ref({ x: 0, y: 0 })
let context
let moveHandler

function movePreview(event) {
  pointer.value = { x: event.clientX, y: event.clientY }
}
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  context = gsap.context(() => {
    gsap.from('.type-line', { yPercent: 115, duration: 1.4, stagger: .12, ease: 'expo.out' })
    gsap.from('.hero-meta', { opacity: 0, y: 18, duration: 1, delay: .45, ease: 'power2.out' })
    const tl = gsap.timeline({
      scrollTrigger: { trigger: hero.value, start: 'top top', end: '+=110%', scrub: 1, pin: true, anticipatePin: 1 }
    })
    tl.to('.type-line-first', { xPercent: -24, rotation: -3, ease: 'none' }, 0)
      .to('.type-line-second', { xPercent: 22, rotation: 3, ease: 'none' }, 0)
      .fromTo('.hero-artwork', { scale: .35, autoAlpha: 0, rotation: -12 }, { scale: 1, autoAlpha: 1, rotation: 0, ease: 'none' }, .08)
      .to('.hero-type', { opacity: .18, ease: 'none' }, .62)
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
        <div class="archive-image" @pointerenter="hovered = true" @pointerleave="hovered = false" @pointermove="movePreview">
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
      <RouterLink v-for="project in projects" :key="project.slug" :to="`/projekter/${project.slug}`" class="project-card">
        <img v-if="project.image" :src="project.image" :alt="project.imageAlt || ''" loading="lazy" />
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
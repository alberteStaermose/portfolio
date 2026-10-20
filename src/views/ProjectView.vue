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
const galleryItems = computed(() => ['sonja','bufferlo','rf-pantsystem','samyang','politiken-puls','while-in-battle','blender'].includes(project.value?.slug) ? [] : project.value?.gallery)
const videoBlocks = computed(() => project.value?.videos || [])
const videoFor = (placement) => videoBlocks.value.filter(video => video.placement === placement)
const asset = (slug,name) => `${import.meta.env.BASE_URL}projects/${slug}/${name}.webp`
const coverSrc = computed(() => {
 const covers = {'rf-pantsystem':'rfplads','bufferlo':'bufferlo','samyang':'samyangt-shirts','while-in-battle':'whileinbatlleplakat','sonja':'sonjalogo','politiken-puls':'hero-page','blender':'blenderen3'}
 return covers[project.value?.slug] ? asset(project.value.slug,covers[project.value.slug]) : project.value?.image
})
const openingSections = computed(() => ['rf-pantsystem','samyang','politiken-puls','while-in-battle','blender'].includes(project.value?.slug) ? project.value.sections?.slice(0,project.value.slug === 'blender' ? 2 : 3) : introductorySections.value)
const editorialVisuals = computed(() => {
 if(project.value?.slug === 'samyang') return [
  {layout:'wide',images:['samyanglogo']},
  {layout:'wide',images:['samyanglogos']},
  {layout:'wide',images:['samyanggrafik']},
  {layout:'wide',images:['samyangnuddel']},
  {layout:'wide',images:['samyangfrefter']},
  {layout:'copy',heading:'NUDDELINDPAKNING',paragraphs:project.value.sections?.find(s=>s.heading==='NUDDELINDPAKNING')?.paragraphs || []},
  {layout:'strategy',heading:'BRANDSTRATEGI',paragraphs:project.value.sections?.find(s=>s.heading==='BRANDSTRATEGI')?.paragraphs || []}
 ]
 if(project.value?.slug === 'politiken-puls') return [
  {layout:'politiken-logo',images:['politikenlogo']},
  {layout:'politiken-illustrations',images:['politikengrafik']},
  {layout:'politiken-moodboard',images:['politikenbilledstil']},
  {layout:'politiken-outdoor',images:['politikeneks1']},
  {layout:'politiken-print',images:['politikeneks2']},
  {layout:'politiken-site',images:['hero-page']},
  {layout:'politiken-mobile',images:['underside-wellness','underside-dinside','underside-fa-gang-i-trbenet','underside-ny-ernergi-i-godt-selskab']},
  {layout:'politiken-copy',heading:'TONE OF VOICE OG MANIFEST',images:[]},
  {layout:'strategy',heading:'BRANDSTRATEGI',paragraphs:project.value.sections?.find(s=>s.heading==='BRANDSTRATEGI')?.paragraphs || []},
  {layout:'politiken-identity',images:['politikenidentitet']}
 ]
 if(project.value?.slug === 'while-in-battle') return [
  {layout:'prototype-views',images:['whilelightmode','whiledefaultmode','whiledarkmode']},
  {layout:'poster',images:['whileinbatlleplakat']},
  {layout:'outdoor',images:['whileplakat']},
  {layout:'variants',images:['whilelightblue','whilelightorange','whilelightgreen','whilelightred']},
  {layout:'installation',images:['whilefysiskinstallation']},
  {layout:'moodboard',images:['whilebilledstil']},
  {layout:'dancers',images:['whiledancer1','whiledancer2']}
 ]
 if(project.value?.slug === 'blender') return [
  {layout:'blender-hero-three',images:['blenderen1','blenderen2','blenderen3']},
  {layout:'blender-process',images:['blenderproces1','blenderproces2','blenderproces3','blenderproces4']},
  {layout:'blender-print',images:['blenderprint1','blenderprint2']}
 ]
 if(project.value?.slug === 'bufferlo') return [
  {layout:'wide',images:['start-2']},
  {layout:'three',images:['speciale-eksamen-2-4','speciale-eksamen-2','speciale-eksamen-2-2']},
  {layout:'three',images:['kopi-af-3-teleco-wireless-router-4','kopi-af-3-teleco-wireless-router','kopi-af-3-teleco-wireless-router-2']},
  {layout:'wide',images:['farver']},{layout:'wide',images:['font']}
 ]
 if(project.value?.slug === 'rf-pantsystem') return [
  {layout:'wide',images:['rfsaveorswap']},{layout:'wide',images:['rfcup']},
  {layout:'pair',images:['rfplakatorange','rfplakatblaa']},
  {layout:'wide',images:['rfpladsen']},{layout:'pair',images:['rfbarskilt','rfdonate']},
  {layout:'wide',images:['rfscan']},
  {layout:'pair-text',images:['rfapp','rfapp2'],heading:'QR-KODEN OG ORANGE LIFE',paragraphs:project.value.sections?.find(s=>s.heading==='QR-KODEN OG ORANGE LIFE')?.paragraphs || []},
  {layout:'wide',images:['rforangelife']}
 ]
 return []
})
const prototypeSection = computed(() => project.value?.slug === "while-in-battle" ? project.value.sections?.find(section => section.heading === "KODET PROTOTYPE PÅ KAMPGNESITE") : null)
</script>

<template>
  <article v-if="project" class="case-study">
    <div class="case-top"><RouterLink to="/#arbejde">← TILBAGE TIL ARKIVET</RouterLink><span>{{ project.year || 'VISUELT ARKIV' }}</span></div>
    <div v-if="coverSrc" class="case-cover"><img :src="coverSrc" :alt="project.imageAlt || project.title" /></div>
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
    <div v-if="openingSections?.length" class="case-sections">
      <section v-for="(section, index) in openingSections" :key="index" class="case-text-section">
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
    <section v-for="(video,index) in videoFor('after-intro')" :key="'intro-video-'+index" class="case-video-block" :class="'case-video-block--'+(video.format || 'landscape')"><h2 v-if="video.heading">{{ video.heading }}</h2><video :src="video.src" :poster="video.poster" :autoplay="video.autoplay === true" :muted="video.autoplay === true || video.muted === true" :loop="video.loop === true" controls playsinline preload="metadata"></video></section>
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
    <section v-if="prototypeSection" class="case-text-section case-prototype-section case-prototype-section--before-gallery">
      <h2>{{ prototypeSection.heading }}</h2>
      <p v-for="(paragraph, index) in prototypeSection.paragraphs" :key="index">{{ paragraph }}</p>
      <a v-if="project.prototypeUrl" :href="project.prototypeUrl" target="_blank" rel="noopener noreferrer">SE DEN KODEDE PROTOTYPE ↗</a>
    </section>
    <div v-if="editorialVisuals.length" class="case-editorial-gallery" :class="'case-editorial-gallery--' + project.slug">
      <section v-for="(block, blockIndex) in editorialVisuals" :key="blockIndex" class="case-visual-block" :class="'case-visual-block--' + block.layout">
        <div class="case-visual-images"><figure v-for="name in block.images" :key="name"><img :src="asset(project.slug,name)" :alt="project.title + ' — ' + name" loading="lazy" /></figure></div>
        <div v-if="block.heading" class="case-visual-copy"><h2>{{ block.heading }}</h2><template v-for="(paragraph,i) in block.paragraphs" :key="i"><div v-if="typeof paragraph === 'object'" class="case-subsection"><h3>{{ paragraph.subheading }}</h3><p>{{ paragraph.text }}</p></div><p v-else>{{ paragraph }}</p></template></div>
      </section>
    </div>
    <section v-for="(video,index) in videoFor('after-visuals')" :key="'visual-video-'+index" class="case-video-block" :class="'case-video-block--'+(video.format || 'portrait')"><h2 v-if="video.heading">{{ video.heading }}</h2><video :src="video.src" :poster="video.poster" :autoplay="video.autoplay === true" :muted="video.autoplay === true || video.muted === true" :loop="video.loop === true" controls playsinline preload="metadata"></video></section>
    <div v-if="galleryItems?.length" class="case-gallery" :class="{ 'case-gallery--bufferlo': project.slug === 'bufferlo' }">
      <figure v-for="(item, index) in galleryItems" :key="index">
        <img :src="typeof item === 'string' ? item : item.src" :alt="typeof item === 'string' ? project.title : (item.alt || project.title)" loading="lazy" />
        <figcaption v-if="item.caption">{{ item.caption }}</figcaption>
      </figure>
    </div>

    <RouterLink class="case-return" to="/">← SE FLERE PROJEKTER</RouterLink>
    </div>
  </article>
  <section v-else class="project-detail"><h1>Projektet blev ikke fundet</h1><RouterLink to="/">← Tilbage til forsiden</RouterLink></section>
</template>

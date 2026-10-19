<template>
  <div class="site-shell">
    <a class="skip-link" href="#main">Spring til indhold</a>
    <header class="site-header">
      <RouterLink class="wordmark" to="/">Alberte Stærmose</RouterLink>
      <nav aria-label="Hovednavigation">
        <RouterLink to="/" @click="scrollToWork">Projekter</RouterLink>
        <a href="https://www.xn--albertestrmose-8ib.dk/" target="_blank" rel="noopener noreferrer">Nuværende portfolio ↗</a>
      </nav>
    </header>
    <main id="main"><RouterView /></main>
    <footer class="site-footer">
      <span>© {{ new Date().getFullYear() }} Alberte Stærmose</span>
      <span>Ny portfolio under udvikling</span>
    </footer>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
async function scrollToWork(event) {
  event.preventDefault()
  await router.push('/')
  await nextTick()
  document.getElementById('arbejde')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
}
</script>

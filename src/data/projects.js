import { wixAssets } from './wixAssets.js'

// Project content is being migrated in stages.
// Wix-hosted images below are temporary until the original files are copied to GitHub.
export const projects = [
  {
    slug: 'samyang',
    title: 'Samyang',
    category: 'Visuel identitet / Branding',
    year: '2025',
    description: 'Et visuelt identitetsprojekt med research, strategi, logoudvikling, farver og grafiske elementer.',
    image: '',
    imageAlt: 'Samyang — visuel identitet',
    gallery: []
  },
  {
    slug: 'rf-pantsystem',
    title: 'RF Pantsystem',
    category: 'Koncept / Visuel kommunikation',
    year: '2025',
    description: 'Et koncept for et pantsystem med visuel kommunikation på tværs af plakater, skilte og digitale kontaktpunkter.',
    image: '',
    imageAlt: 'RF Pantsystem — koncept og visuel kommunikation',
    gallery: []
  },
  {
    slug: 'politiken-puls',
    title: 'Politiken Puls',
    category: 'Visuel identitet / Konceptudvikling',
    year: '2025',
    description: 'Et visuelt identitets- og konceptprojekt med fokus på målgruppe, positionering, typografi, farver og grafisk retning.',
    image: '',
    imageAlt: 'Politiken Puls — visuel identitet',
    gallery: []
  },
  {
    slug: 'bullet-tounge',
    title: 'Bullet Tounge',
    category: 'Digitalt design / Kode',
    year: '',
    description: 'Et farverigt digitalt eksperiment med typografi, karakterdesign og forskellige farvevariationer.',
    image: '',
    imageAlt: 'Bullet Tounge — digitalt karakterdesign',
    gallery: []
  },
  {
    slug: 'blender',
    title: 'Blender',
    category: '3D / Eksperimenter',
    year: '',
    description: 'Et udvalg af 3D-eksperimenter og visuelle studier skabt i Blender.',
    image: wixAssets.blenderIslandWide,
    imageAlt: '3D-illustration skabt i Blender',
    gallery: [
      { src: wixAssets.blenderIsland, alt: '3D-studie skabt i Blender' }
    ]
  }
]

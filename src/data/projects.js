import { wixAssets } from './wixAssets.js'

// Project content is being migrated in stages.
// Wix-hosted images below are temporary until the original files are copied to GitHub.
export const projects = [
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

/** @returns {object} */
export function navigationPatternsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Navigation Patterns — PM Toolkit',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Design Tool',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description:
          'Compare navigation patterns with separate lists for web and mobile — live previews, strengths and weaknesses, and trio questions for designers and engineers.',
        url: 'https://practicalpm.tools/design/navigation-patterns',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a navigation pattern?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A reusable UX structure for how users move through a product — for example top nav, side nav, tabs, bottom tabs, hamburger, breadcrumbs, command palette, and mega menu. This tool groups them into web-focused and mobile-focused lists.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which navigation pattern is best for a mobile app?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It depends on destination count and user frequency: bottom tabs for 3–5 frequent destinations, hamburger for deep but infrequent access, command palette or search-first for power users. Use the Mobile toggle to see only patterns framed for phones.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I use a hamburger menu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'When secondary destinations are deep but rarely accessed, and discovery is not the priority. On web it is often weaker for primary discovery; on mobile it is common for overflow. Compare both lists in this tool.',
            },
          },
          {
            '@type': 'Question',
            name: "What's the difference between tabs and top navigation?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Top navigation moves users between top-level destinations in the product; tabs switch views within a single destination or page.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I pick a navigation pattern with my designer and engineer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Start from your information architecture, switch to the platform you are designing for, list viable patterns from that list, walk each through strong at / weak at against your use case, and align on which mental model you want users to build.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to use Navigation Patterns',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Pick your platform', text: 'Choose Web or Mobile at the top of the page to load that platform’s pattern list.' },
          { '@type': 'HowToStep', position: 2, name: 'Skim pattern cards', text: 'Expand any patterns that feel like a candidate.' },
          { '@type': 'HowToStep', position: 3, name: 'Try the live preview', text: 'Click through each preview the way a user would.' },
          { '@type': 'HowToStep', position: 4, name: 'Read trade-offs', text: 'Read Strong at and Weak at honestly against your product use case.' },
          { '@type': 'HowToStep', position: 5, name: 'Pin candidates', text: 'Pin your top 2–3 candidates to the comparison tray.' },
          { '@type': 'HowToStep', position: 6, name: 'Copy trio questions', text: 'Copy the design and engineering questions into your next trio conversation.' },
        ],
      },
    ],
  }
}

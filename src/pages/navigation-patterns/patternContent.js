/** @typedef {'web' | 'mobile'} Platform */

/**
 * @typedef {Object} NavPattern
 * @property {string} id
 * @property {string} label
 * @property {string[]} strongAt
 * @property {string[]} weakAt
 * @property {string[]} useWhen
 * @property {string[]} avoidWhen
 * @property {string[]} askDesigner
 * @property {string[]} askEngineer
 * @property {string} exampleName
 * @property {string} exampleUrl
 */

/** @type {Record<string, NavPattern>} */
export const PATTERNS_BY_ID = {
  'top-nav': {
    id: 'top-nav',
    label: 'Top navigation',
    strongAt: [
      'Clear top-level destinations at a glance',
      'Fits common web mental models and marketing sites',
      'Simple to implement across responsive breakpoints',
    ],
    weakAt: [
      'Runs out of horizontal space as destinations grow',
      'Competes with page titles and in-page tabs',
      'Less thumb-friendly than bottom patterns on phones',
    ],
    useWhen: [
      'You have a small, stable set of primary sections (roughly 3–7).',
      'Users move between areas occasionally rather than every few seconds.',
    ],
    avoidWhen: [
      'Deep nested hierarchies need constant wayfinding beside the bar.',
      'You already need multiple rows of controls or dense toolbars.',
    ],
    askDesigner: [
      'How do we handle overflow and priority when marketing insists on more links?',
      'What is the visual hierarchy between global top nav and in-page tabs?',
    ],
    askEngineer: [
      'How do we keep nav state, auth-gated items, and ARIA landmarks consistent on every layout?',
      'What is our approach to sticky vs scroll-away header and performance on long pages?',
    ],
    exampleName: 'Many SaaS dashboards',
    exampleUrl: 'https://www.nngroup.com/articles/navigation-you-are-here/',
  },
  'side-nav': {
    id: 'side-nav',
    label: 'Side navigation',
    strongAt: [
      'Scales to many destinations with nesting and groups',
      'Keeps hierarchy visible while users work in the main pane',
      'Pairs well with deep content and admin-style products',
    ],
    weakAt: [
      'Consumes horizontal space on small viewports',
      'Can feel heavy if every item is treated as top-level',
      'Collapsed modes can hide discoverability',
    ],
    useWhen: [
      'Your IA has many sections or nested projects and spaces.',
      'Users stay inside the app for long sessions and switch areas often.',
    ],
    avoidWhen: [
      'The product is mostly single-screen or marketing-led with few destinations.',
      'Mobile-first flows cannot afford a persistent wide rail.',
    ],
    askDesigner: [
      'How do collapsed, icon-only, and expanded states preserve recognisability?',
      'What is the maximum nesting depth we will support before we split IA?',
    ],
    askEngineer: [
      'How do we lazy-load sections and keep keyboard focus when the tree updates?',
      'What breakpoints flip between rail, drawer, and hidden patterns?',
    ],
    exampleName: 'Notion-style sidebars',
    exampleUrl: 'https://www.notion.so/',
  },
  tabs: {
    id: 'tabs',
    label: 'Tabs (within view)',
    strongAt: [
      'Makes parallel views inside one destination obvious',
      'Fast switching without full page loads when done well',
      'Works on web and mobile when tab count stays small',
    ],
    weakAt: [
      'Easy to confuse with top-level product navigation',
      'Poor fit when tabs multiply or titles truncate',
      'Can hide state users need to see across tabs simultaneously',
    ],
    useWhen: [
      'Users switch among a few peer views in one workspace (e.g. list / board / calendar).',
      'Each tab represents the same object or dataset in a different lens.',
    ],
    avoidWhen: [
      'Tabs would actually be primary product areas with different permissions.',
      'Users need to compare content across tabs side by side.',
    ],
    askDesigner: [
      'Which navigation is “product level” vs “view level” so we do not train the wrong model?',
      'How do we label tabs so they stay distinct on small screens?',
    ],
    askEngineer: [
      'Should tab state live in the URL for shareability and back-button behaviour?',
      'How do we preserve scroll position and form state when switching tabs?',
    ],
    exampleName: 'In-app view switchers',
    exampleUrl: 'https://m3.material.io/components/tabs/overview',
  },
  'bottom-nav': {
    id: 'bottom-nav',
    label: 'Bottom navigation',
    strongAt: [
      'Excellent for 3–5 frequent, habitual destinations',
      'Thumb-reachable on phones; clear persistent affordance',
      'Matches platform expectations on iOS and Android',
    ],
    weakAt: [
      'Destinations beyond ~5 get crowded or require compromises',
      'Secondary areas need another pattern (overflow, “more”, or hub)',
      'Less natural on large tablets in landscape',
    ],
    useWhen: [
      'A small set of hubs captures most daily return traffic.',
      'You want parity with native platform tab bars.',
    ],
    avoidWhen: [
      'You have many peer areas that all deserve top-level discovery.',
      'You are building a content site where hierarchy matters more than hubs.',
    ],
    askDesigner: [
      'Which destinations truly deserve a tab vs overflow or profile menu?',
      'How do we badge activity without visual noise on every icon?',
    ],
    askEngineer: [
      'How do deep links land when the destination is not a tab root?',
      'How do we test safe areas, split-screen, and foldables?',
    ],
    exampleName: 'Instagram tab bar',
    exampleUrl: 'https://developer.apple.com/design/human-interface-guidelines/tab-bars',
  },
  hamburger: {
    id: 'hamburger',
    label: 'Hamburger menu',
    strongAt: [
      'Frees screen space when secondary areas are rarely opened',
      'Familiar pattern for overflow on mobile',
      'Useful when paired with a strong primary surface',
    ],
    weakAt: [
      'Hides discoverability; users may never see key destinations',
      'Extra tap and animation cost for common paths',
      'Easy to become a junk drawer of every request',
    ],
    useWhen: [
      'Secondary destinations are deep but infrequent and discovery is not the goal.',
      'A strong primary canvas must stay uncluttered (e.g. reader, camera).',
    ],
    avoidWhen: [
      'Primary acquisition depends on users finding multiple areas cold.',
      'You are using it only to avoid prioritising the IA.',
    ],
    askDesigner: [
      'What must never live only behind the drawer for new users?',
      'What empty, loading, and error states exist inside the drawer?',
    ],
    askEngineer: [
      'How do we trap focus and restore focus when the drawer closes?',
      'How does the pattern interact with gestures, back, and browser chrome?',
    ],
    exampleName: 'Secondary overflow on many apps',
    exampleUrl: 'https://m3.material.io/components/navigation-drawer/overview',
  },
  breadcrumbs: {
    id: 'breadcrumbs',
    label: 'Breadcrumbs',
    strongAt: [
      'Shows hierarchy and supports wayfinding in deep trees',
      'Cheap to add alongside other patterns',
      'Improves orientation when titles alone are ambiguous',
    ],
    weakAt: [
      'Does not replace primary navigation for jumping sideways',
      'Truncates poorly when segment names are long',
      'Less helpful when the IA is shallow',
    ],
    useWhen: [
      'Users navigate deep folder or document trees.',
      'You need a reversible path for “up” navigation on web.',
    ],
    avoidWhen: [
      'The product is flat or search-first with little hierarchy.',
      'Breadcrumbs would duplicate clearer in-context labels.',
    ],
    askDesigner: [
      'What is the canonical trail when items live in multiple collections?',
      'How do we truncate mid-trail without breaking wayfinding?',
    ],
    askEngineer: [
      'How are segments generated from routing vs server data?',
      'How do we expose breadcrumbs to screen readers without noise?',
    ],
    exampleName: 'E-commerce and CMS hierarchies',
    exampleUrl: 'https://www.nngroup.com/articles/breadcrumb-navigation-useful/',
  },
  'command-palette': {
    id: 'command-palette',
    label: 'Command palette',
    strongAt: [
      'Blazing fast for power users who know names of destinations',
      'Scales to large command sets with search',
      'Keeps chrome minimal when paired with a thin nav',
    ],
    weakAt: [
      'Poor discoverability for first-time users',
      'Depends on good naming, synonyms, and empty states',
      'Needs thoughtful keyboard and assistive tech support',
    ],
    useWhen: [
      'Users repeat similar jumps and actions many times per session.',
      'Your audience is comfortable with search and shortcuts.',
    ],
    avoidWhen: [
      'The core audience is occasional or strongly mobile-only without keyboards.',
      'You have not invested in indexing, aliases, and teaching the model.',
    ],
    askDesigner: [
      'What is the onboarding path the first week before users memorise commands?',
      'How do we visualise scope: global vs in-context commands?',
    ],
    askEngineer: [
      'How do we index actions across lazy routes and feature flags?',
      'How do we handle focus traps, shortcuts, and clashes with browser defaults?',
    ],
    exampleName: 'Linear',
    exampleUrl: 'https://linear.app/',
  },
  'mega-menu': {
    id: 'mega-menu',
    label: 'Mega menu',
    strongAt: [
      'Surfaces many categories at once for scanning',
      'Strong for content-heavy sites with clear groupings',
      'Supports featured links and short descriptions per cluster',
    ],
    weakAt: [
      'Complex to design and implement accessibly',
      'Hover-driven variants fail on touch-first devices',
      'Easy to overload with marketing noise',
    ],
    useWhen: [
      'You have many peer categories that benefit from one glanceable panel.',
      'Users are browsing rather than repeating one narrow workflow.',
    ],
    avoidWhen: [
      'Your primary users are on phones or tablets without hover precision.',
      'A simpler top nav or search-first model would suffice.',
    ],
    askDesigner: [
      'What is the maximum columns and rows before we split or simplify?',
      'How do touch, keyboard, and hover all open and dismiss predictably?',
    ],
    askEngineer: [
      'How do we avoid layout thrash and hit targets under load?',
      'How do we lazy-load heavy panels without janky first open?',
    ],
    exampleName: 'Large retail and publisher sites',
    exampleUrl: 'https://www.nngroup.com/articles/mega-menus-work-well/',
  },
}

/** Ordered pattern ids for desktop and large-viewport web products (no bottom tab bar list). */
export const NAV_PATTERN_IDS_WEB = [
  'top-nav',
  'side-nav',
  'tabs',
  'breadcrumbs',
  'command-palette',
  'mega-menu',
  'hamburger',
]

/** Ordered pattern ids for phone-native primary navigation (no mega menu). */
export const NAV_PATTERN_IDS_MOBILE = [
  'top-nav',
  'side-nav',
  'tabs',
  'bottom-nav',
  'hamburger',
  'breadcrumbs',
  'command-palette',
]

/**
 * @param {Platform} platform
 * @returns {string[]}
 */
export function patternIdsForPlatform(platform) {
  return platform === 'web' ? NAV_PATTERN_IDS_WEB : NAV_PATTERN_IDS_MOBILE
}

/**
 * @param {Platform} platform
 * @returns {NavPattern[]}
 */
export function getNavPatterns(platform) {
  return patternIdsForPlatform(platform).map((id) => PATTERNS_BY_ID[id])
}

/**
 * @param {Platform} platform
 * @returns {string}
 */
export function firstPatternIdForPlatform(platform) {
  const ids = patternIdsForPlatform(platform)
  return ids[0] ?? 'top-nav'
}

export const ORBIT_DESTINATIONS = [
  { id: 'dash', label: 'Dashboard' },
  { id: 'proj', label: 'Projects' },
  { id: 'rep', label: 'Reports' },
  { id: 'team', label: 'Team' },
  { id: 'set', label: 'Settings' },
]

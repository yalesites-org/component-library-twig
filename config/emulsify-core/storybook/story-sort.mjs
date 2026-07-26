// Shared sidebar-priority logic, used both by preview.js's storySort
// parameter (kept for correctness/documentation even though it doesn't
// reach the sidebar — see scripts/sort-storybook-index.mjs) and by that
// post-build script, which is what actually controls the built sidebar
// order for static `storybook build` output.
export const ORDER_TREE = {
  __order: [
    'Introduction',
    'Tokens',
    'Atoms',
    'Molecules',
    'Organisms',
    'Templates',
    'Page Examples',
  ],
  Introduction: {
    __order: ['Welcome', 'Theme System', 'Storybook Guide'],
  },
  Tokens: {
    __order: ['Colors'],
    Colors: {
      __order: [
        'Colors',
        'Color Palettes (Theme)',
        'Theme Sandbox',
        'Theming Reference',
      ],
    },
  },
  Organisms: {
    __order: ['Card Collection'],
    'Card Collection': {
      __order: ['Overview', 'Visreg'],
    },
  },
  'Page Examples': {
    __order: ['Overview'],
  },
};

function segmentPriority(orderList, name) {
  const index = orderList.indexOf(name);
  return index === -1 ? orderList.length : index;
}

function compareNames(orderNode, aName, bName) {
  const orderList = orderNode?.__order || [];
  const aPriority = segmentPriority(orderList, aName);
  const bPriority = segmentPriority(orderList, bName);

  if (aPriority !== bPriority) {
    return aPriority - bPriority;
  }

  return aName.localeCompare(bName, undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

export function storySortComparator(a, b) {
  const aPath = a.title.split('/');
  const bPath = b.title.split('/');
  const sharedLength = Math.min(aPath.length, bPath.length);

  let node = ORDER_TREE;
  for (let i = 0; i < sharedLength; i += 1) {
    const aSegment = aPath[i];
    const bSegment = bPath[i];

    if (aSegment !== bSegment) {
      return compareNames(node, aSegment, bSegment);
    }

    node = node?.[aSegment] || {};
  }

  if (aPath.length !== bPath.length) {
    return aPath.length - bPath.length;
  }

  // Same full title: order by story/doc name (e.g. "Overview" vs "Visreg").
  return compareNames(node, a.name || '', b.name || '');
}

// Shared sidebar-priority tree, consumed by preview.js's storySort parameter
// and by scripts/sort-storybook-index.mjs (the latter controls the built sidebar order).
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

  // Same full title: these are the stories inside one component. An explicit
  // __order wins (e.g. "Overview" before "Visreg"). Otherwise keep the order the
  // stories are declared in, which is what the webpack build's sidebar showed --
  // alphabetising here reorders story lists that authors sequenced deliberately
  // (Basic, BasicShort, ... WithSidebar, WithQuickLinks). Array.prototype.sort is
  // stable, so returning 0 preserves the indexer's declaration order.
  const aName = a.name || '';
  const bName = b.name || '';
  const orderList = node?.__order || [];

  if (orderList.includes(aName) || orderList.includes(bName)) {
    return compareNames(node, aName, bName);
  }

  // A component's docs page comes before its stories, as it did in the webpack
  // build. Storybook 9's indexer emits the docs entry last, so declaration order
  // alone would sink "Overview" to the bottom of the story list.
  if (a.type !== b.type) {
    if (a.type === 'docs') return -1;
    if (b.type === 'docs') return 1;
  }

  return 0;
}

import pager from './yds-pager.twig';

// Demo JS.
import './cl-pager';

/**
 * Generate pagination data - keep it simple
 */
function generatePagerData(currentPage, totalPages) {
  // Simple: if currentPage > totalPages, use page 1
  const correctedCurrentPage =
    currentPage > totalPages ? 1 : Math.max(1, currentPage);

  const data = {
    current: correctedCurrentPage,
    items: {
      pages: {},
    },
  };

  for (let i = 1; i <= totalPages; i += 1) {
    data.items.pages[i] = { href: `#page-${i}` };
  }

  if (correctedCurrentPage > 1) {
    data.items.previous = { href: `#page-${correctedCurrentPage - 1}` };
    data.items.first = { href: '#page-1' };
  }

  if (correctedCurrentPage < totalPages) {
    data.items.next = { href: `#page-${correctedCurrentPage + 1}` };
    data.items.last = { href: `#page-${totalPages}` };
  }

  return data;
}

/**
 * Global pager management object to avoid circular dependencies
 */
window.PagerManager = {
  updatePager(container, storyId, targetPage, args) {
    try {
      // Clean up the old container - don't modify the parameter directly
      const currentContainer = container;
      if (currentContainer.storybookEnhanced) {
        currentContainer.storybookEnhanced = false;
      }

      // Generate new HTML
      const newData = generatePagerData(targetPage, args.totalPages);
      const newHtml = pager(newData);
      const newWrappedHtml = newHtml.replace(
        '<nav class="pager"',
        `<nav class="pager" data-story-id="${storyId}"`,
      );

      // Update args for next interaction
      const updatedArgs = { ...args, currentPage: targetPage };

      // Create a temporary container to avoid iframe issues
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = newWrappedHtml;
      const replacementContainer = tempDiv.firstElementChild;

      // Replace the old container
      currentContainer.parentNode.replaceChild(
        replacementContainer,
        currentContainer,
      );

      // Re-attach enhancement after a short delay
      setTimeout(() => {
        this.attachEnhancement(storyId, updatedArgs);
      }, 100);
    } catch (error) {
      // Fallback: just let cl-pager.js handle it visually
      // Silent fallback - no console output in production
    }
  },

  attachEnhancement(storyId, args) {
    const container = document.querySelector(`[data-story-id="${storyId}"]`);
    if (!container) return;

    // Mark this container as enhanced to prevent duplicate listeners
    if (container.storybookEnhanced) return;
    container.storybookEnhanced = true;

    const links = container.querySelectorAll('.pager__link[href^="#page-"]');

    links.forEach((link) => {
      // Prevent multiple event listeners on the same link
      if (link.storybookHandler) return;

      const clickHandler = (e) => {
        // Ensure we prevent any unwanted navigation
        e.preventDefault();
        e.stopPropagation();

        // Let cl-pager.js do its visual update first
        setTimeout(() => {
          const href = link.getAttribute('href');
          const pageMatch = href.match(/#page-(\d+)/);

          if (pageMatch) {
            const targetPage = parseInt(pageMatch[1], 10);

            if (
              targetPage >= 1 &&
              targetPage <= args.totalPages &&
              targetPage !== args.currentPage
            ) {
              // Update the component using the global manager
              window.PagerManager.updatePager(
                container,
                storyId,
                targetPage,
                args,
              );
            }
          }
        }, 50); // Longer delay to ensure cl-pager.js finishes
      };

      const newLink = link;
      newLink.storybookHandler = clickHandler;
      link.addEventListener('click', clickHandler, { capture: true });
    });
  },
};

/**
 * Simple wrapper function for the initial enhancement
 */
function addStorybookEnhancement(storyId, args) {
  window.PagerManager.attachEnhancement(storyId, args);
}

/**
 * Storybook Definition
 */
export default {
  title: 'Molecules/Pager',
  argTypes: {
    currentPage: {
      name: 'Current page', // Human-friendly name
      control: { type: 'number', min: 1, max: 50 },
      description: 'Current active page',
    },
    totalPages: {
      name: 'Total pages', // Human-friendly name
      control: { type: 'number', min: 1, max: 50 },
      description: 'Total number of pages',
    },
    storyInfo: {
      table: { disable: true }, // Hide from controls panel
      control: { disable: true }, // Hide from controls panel
    },
  },
};

/**
 * Template that works WITH cl-pager.js and re-renders when needed
 */
const Template = (args) => {
  const data = generatePagerData(args.currentPage, args.totalPages);
  const html = pager(data);

  const storyId = `pager-story-${Date.now()}-${Math.random()}`;
  const wrappedHtml = html.replace(
    '<nav class="pager"',
    `<nav class="pager" data-story-id="${storyId}"`,
  );

  // Add documentation div if story has documentation
  let documentedHtml = wrappedHtml;
  if (args.storyInfo) {
    const docDiv = `
      <div style="
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        padding: 16px;
        margin-bottom: 20px;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        line-height: 1.5;
      ">
        <h4 style="margin: 0 0 8px 0; color: #495057; font-size: 16px; font-weight: 600;">
          ${args.storyInfo.title}
        </h4>
        <p style="margin: 0 0 12px 0; color: #6c757d; font-weight: 500;">
          ${args.storyInfo.pattern}
        </p>
        <p style="margin: 0; color: #495057;">
          <strong>Use Case:</strong> ${args.storyInfo.useCase}
        </p>
      </div>
    `;
    documentedHtml = docDiv + wrappedHtml;
  }

  // Let cl-pager.js attach first, then add our enhancement
  setTimeout(() => {
    addStorybookEnhancement(storyId, args);
  }, 150);

  return documentedHtml;
};

// All stories - Visual pattern names with use case descriptions
export const Interactive = Template.bind({});
Interactive.args = {
  currentPage: 1,
  totalPages: 10,
  storyInfo: {
    title: 'Interactive Demo',
    pattern: 'Pattern varies based on controls above',
    useCase:
      'General testing and demonstration of all pagination behaviors. Use the controls above to test different Current page and Total pages values.',
  },
};

export const AllPages = Template.bind({});
AllPages.args = {
  currentPage: 2,
  totalPages: 3,
  storyInfo: {
    title: 'All Pages Pattern',
    pattern: '"1 2 3" - Shows all page numbers when few pages exist',
    useCase:
      'Small result sets like search results with only a few items, category pages with minimal content, or filtered views that return limited results. Users can see all available pages at once without cognitive load.',
  },
};

export const FourPages = Template.bind({});
FourPages.args = {
  currentPage: 3,
  totalPages: 4,
  storyInfo: {
    title: 'Four Pages Pattern',
    pattern: '"1 2 3 4" - Shows all 4 pages to avoid redundant ellipsis',
    useCase:
      'Content categories or search results that happen to have exactly 4 pages of results. Better UX than showing "1 2 3 4 ... 4" which would be confusing and wasteful.',
  },
};

export const StartEllipsis = Template.bind({});
StartEllipsis.args = {
  currentPage: 2,
  totalPages: 15,
  storyInfo: {
    title: 'Start Ellipsis Pattern',
    pattern: '"1 2 3 ... 15" - Current page near start with ellipsis at end',
    useCase:
      "User just started browsing a large result set (news articles, product listings, blog posts). They're on page 1 or 2 and can see immediate next steps while having quick access to jump to the end.",
  },
};

export const StartExtended = Template.bind({});
StartExtended.args = {
  currentPage: 3,
  totalPages: 15,
  storyInfo: {
    title: 'Start Extended Pattern',
    pattern:
      '"1 2 3 4 ... 15" - Page 3 shows extended start for easy next navigation',
    useCase:
      "User has progressed a few pages into a large result set. They're gaining momentum in their browsing and should easily access page 4 without jumping to the last page. Common in e-commerce product browsing.",
  },
};

export const MiddleEllipsis = Template.bind({});
MiddleEllipsis.args = {
  currentPage: 8,
  totalPages: 15,
  storyInfo: {
    title: 'Middle Ellipsis Pattern',
    pattern:
      '"1 ... 7 8 9 ... 15" - Current page in middle with ellipsis on both sides',
    useCase:
      'User is deep into browsing (research mode, comparison shopping, thorough content review). They need context of where they are while maintaining access to both the beginning and end of results.',
  },
};

export const EndExtended = Template.bind({});
EndExtended.args = {
  currentPage: 13,
  totalPages: 15,
  storyInfo: {
    title: 'End Extended Pattern',
    pattern:
      '"1 ... 12 13 14 15" - 3rd from last shows extended end for easy previous navigation',
    useCase:
      'User is near the end of a large result set but might want to step back a page or two. Common when users reach the end and realize they missed something, or are comparing final options.',
  },
};

export const EndEllipsis = Template.bind({});
EndEllipsis.args = {
  currentPage: 14,
  totalPages: 15,
  storyInfo: {
    title: 'End Ellipsis Pattern',
    pattern: '"1 ... 13 14 15" - Current page near end with ellipsis at start',
    useCase:
      "User has reached the end of results (last page or second-to-last). They can see they're at the conclusion while maintaining easy access to return to the beginning if needed.",
  },
};

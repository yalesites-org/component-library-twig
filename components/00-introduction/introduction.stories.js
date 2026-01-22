export default {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
  },
};

const introductionHTML = `
  <div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: #00356b;">Welcome to the YaleSites Design System</h1>

    <p style="font-size: 1.25rem; line-height: 1.6; color: #4a4a4a; margin-bottom: 2rem;">
      This is the comprehensive component library and design system for Yale University websites, built on atomic design principles.
    </p>

    <div style="background-color: #f8f9fa; border-left: 4px solid #00356b; padding: 20px; margin: 30px 0;">
      <h2 style="margin-top: 0; color: #00356b;">About This Design System</h2>
      <p style="margin-bottom: 0; line-height: 1.6;">
        The YaleSites Design System provides a consistent, accessible, and flexible foundation for building
        websites across Yale University. It includes reusable components, design tokens, and comprehensive
        documentation to ensure brand consistency and excellent user experiences.
      </p>
    </div>

    <h2 style="font-size: 2rem; margin-top: 3rem; margin-bottom: 1rem; color: #00356b;">Atomic Design Principles</h2>

    <p style="line-height: 1.6; margin-bottom: 1.5rem;">
      Our component library is organized using <strong>Atomic Design</strong> methodology, breaking interfaces
      down into fundamental building blocks:
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">

      <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
        <h3 style="margin-top: 0; color: #00356b;">⚛️ Atoms</h3>
        <p style="margin-bottom: 0; font-size: 0.95rem; line-height: 1.5;">
          The foundational building blocks - buttons, links, inputs, headings, images, and other basic HTML elements
          that can't be broken down further.
        </p>
      </div>

      <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
        <h3 style="margin-top: 0; color: #00356b;">🧬 Molecules</h3>
        <p style="margin-bottom: 0; font-size: 0.95rem; line-height: 1.5;">
          Simple groups of atoms functioning together - cards, forms, search bars, navigation items, and other
          relatively simple components.
        </p>
      </div>

      <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
        <h3 style="margin-top: 0; color: #00356b;">🦠 Organisms</h3>
        <p style="margin-bottom: 0; font-size: 0.95rem; line-height: 1.5;">
          Complex components made of molecules and atoms - headers, footers, card collections, galleries, and
          other substantial interface sections.
        </p>
      </div>

      <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 24px;">
        <h3 style="margin-top: 0; color: #00356b;">📄 Pages</h3>
        <p style="margin-bottom: 0; font-size: 0.95rem; line-height: 1.5;">
          Complete page layouts and examples combining organisms, molecules, and atoms into fully functional
          page templates and demonstrations.
        </p>
      </div>

    </div>

    <h2 style="font-size: 2rem; margin-top: 3rem; margin-bottom: 1rem; color: #00356b;">Organization Structure</h2>

    <ul style="line-height: 1.8; margin-bottom: 2rem;">
      <li><strong>00-Tokens:</strong> Design system tokens including colors, typography, spacing, and effects</li>
      <li><strong>01-Atoms:</strong> Basic elements like buttons, links, images, and form controls</li>
      <li><strong>02-Molecules:</strong> Component combinations like cards, banners, navigation items, and content blocks</li>
      <li><strong>03-Organisms:</strong> Complex sections like headers, footers, menus, and content collections</li>
      <li><strong>04-Page Layouts:</strong> Page structure templates with various column configurations</li>
      <li><strong>05-Page Examples:</strong> Complete page demonstrations showing real-world implementations</li>
      <li><strong>Settings:</strong> Configuration options for customizing the design system</li>
    </ul>

    <h2 style="font-size: 2rem; margin-top: 3rem; margin-bottom: 1rem; color: #00356b;">Global Themes & Typography</h2>

    <p style="line-height: 1.6; margin-bottom: 1.5rem;">
      Use the toolbar controls at the top of Storybook to:
    </p>

    <ul style="line-height: 1.8; margin-bottom: 2rem;">
      <li><strong>Site: Global Theme:</strong> Switch between Yale's six global color palettes (Old Blues, New Haven Green, Shoreline Summer, Onha, It's Your Yale, AI)</li>
      <li><strong>Typography: Heading Fonts:</strong> Toggle between YaleNew and Mallory heading font pairings</li>
    </ul>

    <p style="line-height: 1.6; margin-bottom: 2rem; padding: 15px; background-color: #fff3cd; border-radius: 4px;">
      💡 <strong>Tip:</strong> These global controls apply to all components, allowing you to preview how designs
      adapt across different themes and typography settings.
    </p>

    <h2 style="font-size: 2rem; margin-top: 3rem; margin-bottom: 1rem; color: #00356b;">Quick Links</h2>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
      <a href="https://yalesites.yale.edu" target="_blank" rel="noopener noreferrer"
         style="display: block; padding: 15px 20px; background-color: #00356b; color: white; text-decoration: none; border-radius: 4px; text-align: center; font-weight: 600;">
        YaleSites Website →
      </a>
      <a href="https://github.com/yalesites-org" target="_blank" rel="noopener noreferrer"
         style="display: block; padding: 15px 20px; background-color: #286dc0; color: white; text-decoration: none; border-radius: 4px; text-align: center; font-weight: 600;">
        GitHub Organization →
      </a>
      <a href="https://github.com/yalesites-org/component-library-twig" target="_blank" rel="noopener noreferrer"
         style="display: block; padding: 15px 20px; background-color: #5f712d; color: white; text-decoration: none; border-radius: 4px; text-align: center; font-weight: 600;">
        Component Library Repo →
      </a>
    </div>

    <hr style="margin: 40px 0; border: none; border-top: 2px solid #dee2e6;">

    <p style="text-align: center; color: #6c757d; font-size: 0.9rem;">
      Built with ❤️ for the Yale University community
    </p>
  </div>
`;

export const Introduction = () => introductionHTML;

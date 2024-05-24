import hljs from 'highlight.js/lib/core';

import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/vbscript-html';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import twig from 'highlight.js/lib/languages/twig';
import typescript from 'highlight.js/lib/languages/typescript';
import scss from 'highlight.js/lib/languages/scss';
import yaml from 'highlight.js/lib/languages/yaml';
import xml from 'highlight.js/lib/languages/xml';

// Register the languages we need
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('php', php);
hljs.registerLanguage('python', python);
hljs.registerLanguage('twig', twig);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('xml', xml);

hljs.configure({
  languages: [
    'css',
    'html',
    'javascript',
    'php',
    'python',
    'twig',
    'typescript',
    'scss',
    'yaml',
    'xml',
  ],
});

Drupal.behaviors.textHighlight = {
  attach(context) {
    // Selectors
    const codeBlocks = context.querySelectorAll('pre > code');

    codeBlocks.forEach((codeBlock) => {
      if (typeof codeBlock === 'object') {
        hljs.highlightBlock(codeBlock);
      }
    });
  },
};

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

hljs.configure({
  languages: [
    'php',
    'python',
    'javascript',
    'typescript',
    'json',
    'scss',
    'css',
    'yml',
    'twig',
    'html',
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

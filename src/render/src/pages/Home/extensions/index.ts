import hljs from 'highlight.js';
import juice from 'juice';

const generator = (codeStyle: string, contentStyle: string, html: string) => {
  const element = document.createElement('div');
  element.innerHTML = `
    <style>
      ${codeStyle}
      ${contentStyle}
    </style>
    <section>
      ${html}
    </section>
  `;
  element.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block as HTMLElement);
  });

  const result = juice(element.innerHTML, {
    // 支持 !important
    preserveImportant: true
  });

  return result;
};

export default generator;

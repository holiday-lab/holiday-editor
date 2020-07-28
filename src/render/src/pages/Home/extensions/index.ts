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

  let result = element.innerHTML;

  // 错误捕获 自定义样式代码输入不完整时报错
  try {
    result = juice(element.innerHTML, {
      // 支持 !important
      preserveImportant: true
    });
  } catch (err) {
    console.warn('[Juice] Style inject error, please check your custom styles');
  }

  return result;
};

export default generator;

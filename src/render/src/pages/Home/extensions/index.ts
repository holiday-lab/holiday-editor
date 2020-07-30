import hljs from 'highlight.js';
import juice from 'juice';

/**
 * @function 文章生成
 * @param codeStyle 代码主题
 * @param contentStyle 内容主题
 * @param html 内容 HTML
 */
const generator = (codeStyle: string, contentStyle: string, html: string) => {
  const element = document.createElement('div');
  element.innerHTML = `
    <style>
      ${contentStyle}
      ${codeStyle}
    </style>
    <section data-select="root">
      ${html}
    </section>
  `;

  element.querySelectorAll('pre code').forEach((block) => {
    // 修复 代码间空格被吞
    const innerHTML = block.innerHTML.replace(/ /g, '&nbsp;');
    block.innerHTML = innerHTML;
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

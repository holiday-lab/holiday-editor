import hljs from 'highlight.js';
import juice from 'juice';

const generator = (codeStyle: string, contentStyle: string, html: string) => {
  const element = document.createElement('div');
  element.innerHTML = `
    <style>
      ${contentStyle}
      ${codeStyle}
    </style>
    <section>
      ${html}
    </section>
  `;

  element.querySelectorAll('pre code').forEach((block) => {
    // 修复 代码间空格被吞
    const innerHTML = block.innerHTML.replace(/ /g, '&nbsp;');
    block.innerHTML = innerHTML;
    hljs.highlightBlock(block as HTMLElement);
  });

  // 修复 注释后无换行
  element.querySelectorAll('.hljs-comment').forEach((span) => {
    const innerHTML = span.innerHTML;
    if (!/\n$/g.test(innerHTML)) {
      span.innerHTML = `${innerHTML}\n`;
    }
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

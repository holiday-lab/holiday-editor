const linkExtension = {
  type: 'output',
  filter: (text: string) =>
    text.replace(
      /<a(.*)href="(.*)"(.*)>(.*)<\/a>/g,
      (_, _1, linkUrl: string, _2, linkText: string) => {
        if (linkText === linkUrl) {
          return `<a href="${linkUrl}" style="text-decoration: underline;">${linkUrl}</a>`;
        } else {
          return `<a href="${linkUrl}">${linkText}<span style="text-decoration: underline;">(${linkUrl})</span></a>`;
        }
      }
    )
};

export default linkExtension;

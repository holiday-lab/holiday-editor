const imageExtension = {
  type: 'output',
  filter: (text: string) =>
    text.replace(
      /<img(.*)src="(.*)"(.*)\/>/g,
      (_, attr1: string, src: string, attr2: string) =>
        `<img src="${src}" style="width: 100%;"${attr1}${attr2} />`
    )
};

export default imageExtension;

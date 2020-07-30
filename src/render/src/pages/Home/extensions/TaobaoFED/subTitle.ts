const subTitleExtension = {
  type: 'output',
  filter: (text: string) =>
    text.replace(
      /<h3(.*)>(.*)<\/h3>/g,
      (_, _1, subTitle: string) => `<section
  style="
    height: 34px;
    white-space: normal;
    border: none;
    width: 100%;
    margin: 10px auto 0;
    opacity: 1;
    transform: rotateZ(0deg);
  "
  data-width="100%"
  data-opacity="1"
  data-rotate="0"
>
  <section style="display: inline-block;">
    <section
      style="
        padding-right: 40px;
        height: 30px;
        line-height: 30px;
        border-bottom: 2px solid rgb(255, 202, 0);
      "
    >
      <p
        class="active title"
        style="
          font-size: 18px;
          font-weight: bold;
          color: rgb(0, 0, 0);
          min-width: 1px;
          margin-top: 0;
          margin-bottom: 0;
        "
      >
        ${subTitle}
      </p>
    </section>
    <section
      style="
        margin-top: 1px;
        width: 100%;
        border-top: 1px solid rgb(255, 202, 0);
        height: 2px;
        overflow: hidden;
      "
    ></section>
  </section>
</section>`
    )
};

export default subTitleExtension;

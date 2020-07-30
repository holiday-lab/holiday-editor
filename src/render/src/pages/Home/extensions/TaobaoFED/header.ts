const headerExtension = {
  type: 'lang',
  filter: (text: string) => `<p>
  <img
    data-role="image"
    src="https://gw.alicdn.com/tfs/TB16EqoJKL2gK0jSZFmXXc7iXXa-1080-606.png"
    draggable="false"
    style="max-inline-size: 100%; width: 100%; outline: none 0px !important;"
  />
</p>
<section
  data-width="100%"
  data-opacity="1"
  data-rotate="0"
  style="
    width: 100%;
    margin: 0px auto;
    opacity: 1;
    transform: rotateZ(0deg);
    margin-top: 10px;
    margin-bottom: 10px;
  "
>
  <section
    style="
      margin-right: auto;
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <section
      style="
        width: 100%;
        border-radius: 5px;
        border: 1px solid rgb(105, 105, 105);
        padding: 6px;
      "
    >
      <section
        style="
          width: 100%;
          border-radius: 5px;
          border: 1px solid rgb(255, 185, 15);
          padding: 10px;
          text-align: justify;
        "
      >
        <p
          style="
            font-size: 13px;
            color: rgb(51, 51, 51);
            letter-spacing: 1.5px;
            line-height: 1.75;
            min-width: 1px;
            margin-top: 0;
            margin-bottom: 0;
          "
        >
          文末福利：开发者藏经阁
        </p>
      </section>
    </section>
  </section>
</section>${text}`
};

export default headerExtension;

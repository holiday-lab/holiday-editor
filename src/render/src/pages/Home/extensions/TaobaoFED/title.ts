let titleCount = 1;

const titleExtension = {
  type: 'output',
  filter: (text: string) =>
    text.replace(
      /<h2(.*)>(.*)<\/h2>/g,
      (
        _,
        _1,
        title
      ) => `<section style="margin-top: 10px; margin-bottom: 10px;">
  <section
    style="
      margin-right: 3px;
      margin-left: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <section
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <section
        style="
          width: 29px;
          height: 25px;
          background: rgb(255, 185, 15);
          border: 1px solid rgb(64, 56, 127);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          align-self: flex-start;
          z-index: 1;
          margin-bottom: -14px;
          margin-left: -12px;
          text-align: center;
        "
      >
        <p
          class="title active"
          style="
            font-size: 12px;
            color: rgb(250, 250, 250);
            letter-spacing: -1px;
            line-height: 1.75;
            min-width: 1px;
            margin-bottom: 0;
            margin-top: 0;
          "
        >
          NO.${titleCount++}
        </p>
      </section>
      <section style="background: rgb(255, 185, 15); border-radius: 5px;">
        <section
          style="
            background: rgb(255, 255, 255);
            border-radius: 5px;
            border: 1px solid rgb(64, 56, 127);
            padding-right: 15px;
            padding-left: 19px;
            margin: -2px -2px 2px 2px;
            text-align: center;
          "
        >
          <p
            class="title active"
            style="
              color: rgb(51, 51, 51);
              letter-spacing: 1px;
              line-height: 1.75;
              min-width: 1px;
              margin-top: 0;
              margin-bottom: 0;
            "
          >
            ${title}
          </p>
        </section>
      </section>
    </section>
  </section>
</section>`
    )
};

export default titleExtension;

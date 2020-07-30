export default `
section[data-select="root"] {
  font-size: 16px;
  color: black;
  padding: 0 10px;
  line-height: 1.6;
  word-spacing: 0px;
  letter-spacing: 0px;
  word-break: break-word;
  text-align: left;
  font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

p {
  font-size: 16px;
  line-height: 26px;
  margin-top: 10px;
  margin-bottom: 10px;
  word-break: break-word;
}

h1 {
  font-size: 30px;
  font-weight: bold;
}

h2 {
  font-size: 24px;
  font-weight: bold;
}

h3 {
  font-size: 18px;
  font-weight: bold;
}

h4 {
  font-size: 16px;
  font-weight: bold;
}

pre code {
  display: -webkit-box !important;
  overflow-x: scroll;
}

code {
  padding: 2px 6px;
  font-size: 16px;
  line-height: 18px;
  color: #ffb90f;
  overflow-x: scroll;
  border-radius: 4px;
  background: #282c34;
}

table {
  display: table;
  text-align: left;
  border-collapse: collapse;
}

table tr {
  border: none;
  border-top: 1px solid #ccc;
  background-color: white;
}

table tr:nth-child(2n) {
  background-color: #f8f8f8;
}

table tr th,
table tr td {
  font-size: 16px;
  border: 1px solid #ccc;
  padding: 5px 10px;
  text-align: left;
}

table tr th {
  font-weight: bold;
  background-color: #f0f0f0;
}

tbody {
  border: none;
}

strong {
  color: #ffb90f;
}

ul {
  font-size: 16px;
  list-style-type: disc;
  padding-left:30px;
}

ol {
  font-size: 16px;
  list-style-type: decimal;
  padding-left:30px;
}

li {
  font-size: 16px;
}

blockquote {
  display: block;
  font-size: 0.9em;
  overflow: auto;
  overflow-scrolling: touch;
  border-left: 3px solid #ffb90f;
  background: rgba(0, 0, 0, 0.05);
  color: #6a737d;
  padding-left: 20px;
  padding-right: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 0;
}
`;

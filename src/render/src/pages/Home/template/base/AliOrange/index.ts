export default `
pre code {
  display: -webkit-box !important;
}

table {
  display: table;
  text-align: left;
  border-collapse: collapse;
}

table tr {
  border: 0;
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
  border: 0;
}

code {
  padding: 0 6px;
  font-size: 16px;
  line-height: 18px;
  color: #ffb90f;
  border-radius: 4px;
  background-color: #282c34;
}

strong {
  color: #ffb90f;
}

img {
  width: 100%;
}

blockquote {
  box-sizing: content-box;
  padding: 12px;
  border-radius: 4px;
  background-color: #dcdcdc;
}
`;

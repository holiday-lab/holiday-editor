export default `
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
`;

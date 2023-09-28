function TableHeaders() {
  return (
    <thead>
      <tr>
        <th>E-Code</th>
        <th>Name</th>
        <th>Description</th>
        <th>Usage</th>
      </tr>
    </thead>
  );
}
export default function DetailedInfo({ infomation }) {
  console.log(infomation);

  function tableData() {
    return infomation.map((info) => {
      return (
        <tr key={info.code}>
          <td>{info.code}</td>
          <td>{info.name}</td>
          <td>{info.description}</td>
          <td>{info.usage}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <table>
        <TableHeaders />
        {tableData()}
      </table>
    </div>
  );
}

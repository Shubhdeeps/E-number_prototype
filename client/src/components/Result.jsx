export default function ResultComponent({ enumbers }) {
  return (
    <div className="result_component">
      <h5 className="result_header">Result E-numbers</h5>
      <ol>
        {enumbers.map((en) => {
          return <li key={en}>{en}</li>;
        })}
      </ol>
    </div>
  );
}

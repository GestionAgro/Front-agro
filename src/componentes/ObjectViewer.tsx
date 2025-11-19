import "./css/objectviewer.css";

// saca _ y pone mayusculas
const formatKey = (key: string) => {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
};

// Parse si viene como json
export function safeParse(value: any): any {
  let result = value;

  while (typeof result === "string") {
    try {
      result = JSON.parse(result);
    } catch {
      break;
    }
  }

  return result;
}

const ObjectViewer = ({ data }: { data: any }) => {
  if (data === null || data === undefined) {
    return <span className="valor-vacio">-</span>;
  }

  // Si es primitivo
  if (typeof data !== "object") {
    const isEmpty = data === "-" || data === null || data === "";
    return (
      <span className={isEmpty ? "valor-vacio" : ""}>
        {String(data)}
      </span>
    );
  }

  // Si es array
  if (Array.isArray(data)) {
    return (
      <ul className="object-array">
        {data.map((item, index) => (
          <li key={index} className="object-item">
            <ObjectViewer data={item} />
          </li>
        ))}
      </ul>
    );
  }

  // Si es objeto
  return (
    <ul className="object-group">
      {Object.entries(data).map(([key, value]) => (
        <li key={key} className="object-line">
          <strong className="object-key">{formatKey(key)}:</strong>{" "}
          {typeof value === "object" && value !== null ? (
            <ObjectViewer data={value} />
          ) : (
            <span
              className={
                value === "-" || value === null || value === ""
                  ? "valor-vacio"
                  : "object-value"
              }
            >
              {typeof value === "string" &&
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
                ? new Date(value).toLocaleDateString("es-AR")
                : String(value)}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ObjectViewer;

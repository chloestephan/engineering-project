import endpoint from "../../../data/endpoint.json";

const EndpointRedaction = ({ endpointTitle }) => {
  return (
    <>
      <h2>{endpointTitle}</h2>
      {endpoint
        .filter((endpoint) => endpoint.title === endpointTitle)
        .map((endpoint) =>
          endpoint.redaction ? (
            <p>{endpoint.redaction}</p>
          ) : (
            <p>Il n'y a pas d'explication pour cette solution</p>
          )
        )}
    </>
  );
};

export default EndpointRedaction;

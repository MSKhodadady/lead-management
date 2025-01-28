export async function fetchJson(
  url: string,
  options?: {
    method: string;
    body: object;
  }
) {
  return fetch(
    url,
    options != undefined
      ? {
          method: options.method,
          body: JSON.stringify(options.body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      : undefined
  );
}

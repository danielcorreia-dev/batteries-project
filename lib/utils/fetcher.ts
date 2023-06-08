export const fetcher = (url: string, token?: string) =>
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  }).then((r) => r.json());

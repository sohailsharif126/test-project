const API_URL = import.meta.env.VITE_API_URL;

export const createItem = async (item: Omit<Item, 'id'>) => {
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
};

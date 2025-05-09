// App.tsx
import { useEffect, useState } from 'react';
import { Container, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { createItem, getItems, updateItem, deleteItem } from './services/api';
import theme from './theme';

interface Item {
  id: string;
  name: string;
  description: string;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [editItem, setEditItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleSubmit = async (item: Omit<Item, 'id'>) => {
    if (editItem) {
      await updateItem({ ...item, id: editItem.id });
    } else {
      await createItem(item);
    }
    setEditItem(null);
    await fetchItems();
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    await fetchItems();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ItemForm onSubmit={handleSubmit} editItem={editItem} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ItemList 
              items={items} 
              onEdit={setEditItem} 
              onDelete={handleDelete} 
            />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
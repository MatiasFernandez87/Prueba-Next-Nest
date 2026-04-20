'use client';

import { useState, useEffect } from 'react';

interface Item {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

const API_URL = 'http://localhost:3001';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`http://localhost:3001/items`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Failed to connect to backend');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) throw new Error('Failed to create item');
      setName('');
      setDescription('');
      fetchItems();
    } catch (err) {
      setError('Failed to create item');
    }
  };

  const handleDelete = async (id: string) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/items/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete item');
      fetchItems();
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  return (
    <main className="container">
      <h1>Items CRUD</h1>

      {error && <div className="status error">{error}</div>}

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-description">{item.description}</span>
            </div>
            <div className="item-actions">
              <button className="delete" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
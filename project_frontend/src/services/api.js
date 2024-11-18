import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Cambia esto si tu backend tiene una URL diferente
});

export default api; // Asegúrate de exportar el objeto `api` como default

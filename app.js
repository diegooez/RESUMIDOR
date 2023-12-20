const express = require('express');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/config/api');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api', apiRoutes);

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

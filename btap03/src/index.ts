
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import studentRoutes from './routes/studentRoutes';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

mongoose.connect('mongodb+srv://nguyentiendung17062k4:AbT0YnM7gbN0uIdn@cluster0.9rklo.mongodb.net/BT02?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

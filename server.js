const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '3650d';
connectDB();

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl) and any localhost origin
    if (!origin || origin === 'https://bloomcare-chi.vercel.app' || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/health', require('./routes/health'));
app.use('/api/medications', require('./routes/medications'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/baby', require('./routes/baby'));
app.use('/api/community', require('./routes/community'));
app.use('/api/checklist', require('./routes/checklist'));

app.get('/', (req, res) => res.json({ message: 'BloomCare API running 🌸' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌸 BloomCare server running on port ${PORT}`));

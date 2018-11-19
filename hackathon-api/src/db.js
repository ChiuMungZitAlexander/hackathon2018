import mongoose from 'mongoose';
import debug from 'debug';

const log = debug('hackathon-api:db');

mongoose.connect('mongodb://localhost/hackathon2018', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => {
  log('connection error:', err);
});

db.once('open', () => {
  log('mongodb connected!');
});

export default db;

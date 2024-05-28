import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import methodOverride from 'method-override';
import routes from './routes/index.js';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', routes);
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Express is running on port ${server.address().port}: http://localhost:${server.address().port}`);
});
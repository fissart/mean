import express, { Application} from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import news from './3.routes/1_new.route'
import user from './3.routes/1_users.route'
import curse from './3.routes/2_curses.route'
import section from './3.routes/3_sections.route'
import theme from './3.routes/4_themes.route'
import task from './3.routes/5_task.route'
import integer from './3.routes/6_integer.route'

// Initializations
const app: Application = express();
// Settings
app.set('port', process.env.PORT || 3000);
// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/news", news);
app.use('/api/users', user);//usuarios unicamente
app.use("/api/curses", curse);
app.use("/api/sections", section);
app.use("/api/themes", theme);
app.use("/api/task", task);
app.use("/api/integer", integer);

/*
app.use("/api/categories", require("./routes/category.route"));
app.use("/api/curses", require("./routes/curse.route"));
app.use("/api/chapters", require("./routes/chapter.route"));
app.use("/api/seccions", require("./routes/seccion.route"));
app.use("/api/tasks", require("./routes/task.route"));
app.use("/api/comments", require("./routes/comment.route"));
app.use("/api/mycurses", require("./routes/mycurse.route"));
app.use("/api/tests", require("./routes/test.route"));
app.use("/api/links", require("./routes/link.route"));
*/

// this folders for this application will be used to store public file images
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;

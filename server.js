const app = require('./app');

const port = process.env.PORT || 5000;
const host = process.env.HOST;

app.listen(port, host, () => console.log(`Server started on port ${port}`));

const Express = require('express');

const app = Express();
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

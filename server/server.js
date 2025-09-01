import { app, PORT } from "./src/app.js"; 
import { assertDbConnection } from "./src/config/db.js";

app.listen(PORT, async () => {
  await assertDbConnection();
  console.log(`API listening on http://localhost:${PORT}`);
});

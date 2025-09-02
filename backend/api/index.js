// import { logger } from "./application/logging";
// import { web } from "./application/web";

import { logger } from "../src/application/logging.js";
import { web } from "../src/application/web.js";

const PORT = process.env.PORT || 3000;
web.listen(PORT, () => {
  logger.info("Server is running on http://localhost:3000");
});

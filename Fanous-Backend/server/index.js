import Config from "config";
import Routes from "./routes.js";
import Server from "./common/server.js";

// Build MongoDB URI from config if MONGO_URI is not set
const dbUrl = process.env.MONGO_URI || 
  `mongodb://${Config.get("databaseHost")}:${Config.get("databasePort")}/${Config.get("databaseName")}`;


const server = new Server()
  .router(Routes)
  .configureSwagger(Config.get("swaggerDefinition"))
  .handleError()
  .configureDb(dbUrl) // الآن await داخلي يضمن الاتصال قبل أي شيء
  .then((_server) => _server.listen(Config.get("port")));

export default server;

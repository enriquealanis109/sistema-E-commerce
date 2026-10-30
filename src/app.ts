import "dotenv/config";
import express from "express";
import orderRoutes from './routes/order.routes'; //aqui llamo la ruta de las ordenes
import { requestLogger, apiKeyValidator } from './middlewares/order.middleware'; // aqui conecto los middlewares
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./config/swagger_output.json";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(requestLogger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput)); // aqui estan las salidas de swagger
app.use('/api', apiKeyValidator,orderRoutes); // llamo a usar las appas de key y el enrutador
  

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./config/swagger_output.json";
import categoriasRouter from './routes/categoria'; 
import { loggerDePeticiones } from './middlewares/middleware';


const app = express();
const PORT = process.env.PORT ?? 3000;
const opcionesCors: cors.CorsOptions = {
  origin: (origin, callback) => {
    const origenPermitido = process.env.CORS_ORIGIN;
     if (!origin || origin === origenPermitido) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por las políticas estrictas de CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(loggerDePeticiones);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use('/api', categoriasRouter);

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

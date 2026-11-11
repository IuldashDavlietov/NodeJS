
import { Router } from "express";
import redoc from "redoc-express";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "../configs/swagger.json";

const router = Router();
// URL: /documents

router.all("/", (req, res) => {
  res.send({
    swagger: "/documents/swagger",
    redoc: "/documents/redoc",
    json: "/documents/json",
  });
});

// JSON:
router.use("/json", (req, res) => {
  res.sendFile(`/src/configs/swagger.json`, { root: "." });
});

// Redoc:
router.use("/redoc", redoc({ specUrl: "/documents/json", title: "API Docs" }));

// Swagger:
router.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson, { swaggerOptions: { persistAuthorization: true } }),
);

export default router;

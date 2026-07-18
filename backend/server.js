const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const threatRoutes = require("./routes/threatRoutes");
const attackRoutes = require("./routes/attackRoutes");
const alertRoutes = require("./routes/alertRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const aiRoutes = require("./routes/aiRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/threat", threatRoutes);
app.use("/api/attacks", attackRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/ai-investigation", aiRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "🚀 CyberVerse AI Backend is Running!",
    status: "OK",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
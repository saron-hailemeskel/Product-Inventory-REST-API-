const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const PORT = 3000;
//middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Product Inventory API is running");
});

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
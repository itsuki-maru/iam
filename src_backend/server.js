import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// CORSを有効化
app.use(cors());

// JSONリクエストボディのパース
app.use(express.json());

// /contact エンドポイント (POST)
app.post("/contact", (req, res) => {
    console.log("Received POST request at /contact:", req.body);
    
    // 受け取ったデータをそのままレスポンスとして返す
    res.json({
        message: "Data received successfully",
        receivedData: req.body
    });
});

// サーバーを起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

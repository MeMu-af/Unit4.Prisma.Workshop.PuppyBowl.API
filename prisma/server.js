const express = require("express");
const morgan = require("morgan");
const prisma = require("./prisma");

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());

// GET players
app.get("/api/players", async (req, res) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST
app.post("/api/players", async (req, res) => {
  try {
    const { name, breed, imageUrl } = req.body;
    const player = await prisma.player.create({
      data: {
        name,
        breed,
        imageUrl,
      },
    });
    res.json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET id
app.get("/api/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await prisma.player.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT
app.put("/api/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const player = await prisma.player.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status,
      },
    });
    res.json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE
app.delete("/api/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.player.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Player deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

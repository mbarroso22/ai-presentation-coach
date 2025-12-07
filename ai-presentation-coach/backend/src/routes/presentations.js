const express = require("express");
const router = express.Router();

const {
  createPresentation,
  listPresentations,
  getPresentation,
  updatePresentation,
} = require("../data/presentationsStore");

// POST /api/presentations
// Body: { title: string, slides: [{ title, content }] }
router.post("/", (req, res) => {
  const { title, slides } = req.body;
  if (!title || !Array.isArray(slides)) {
    return res.status(400).json({ error: "title and slides[] are required" });
  }

  const pres = createPresentation({ title, slides });
  res.status(201).json(pres);
});

// GET /api/presentations
router.get("/", (req, res) => {
  res.json(listPresentations());
});

// GET /api/presentations/:id
router.get("/:id", (req, res) => {
  const pres = getPresentation(req.params.id);
  if (!pres) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(pres);
});

// POST /api/presentations/:id/analyze
// For now, we mock "AI" analysis. Later we call Azure here.
router.post("/:id/analyze", async (req, res) => {
  const pres = getPresentation(req.params.id);
  if (!pres) {
    return res.status(404).json({ error: "Not found" });
  }

  // Fake AI logic: mark everything medium-importance, 30s per slide.
  const analysis = pres.slides.map((slide, index) => ({
    slideIndex: index,
    importance: "medium",
    expectedTimeSeconds: 30,
    speakerNotes: `Auto-notes for slide "${slide.title}" (placeholder)`,
    keyPoints: [],
  }));

  pres.analyzed = true;
  pres.analysis = analysis;
  updatePresentation(pres.id, pres);

  res.json({
    message: "Analysis complete (mock)",
    presentation: pres,
  });
});

module.exports = router;

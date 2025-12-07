// Very simple in-memory store for now.
// Later we will replace this with a real database layer.

let presentations = [];
let nextId = 1;

function createPresentation({ title, slides }) {
  const newPresentation = {
    id: nextId++,
    title,
    slides: slides || [],
    // place for AI analysis results
    analyzed: false,
    analysis: null,
  };
  presentations.push(newPresentation);
  return newPresentation;
}

function listPresentations() {
  return presentations;
}

function getPresentation(id) {
  return presentations.find((p) => p.id === Number(id)) || null;
}

function updatePresentation(id, data) {
  const pres = getPresentation(id);
  if (!pres) return null;
  Object.assign(pres, data);
  return pres;
}

module.exports = {
  createPresentation,
  listPresentations,
  getPresentation,
  updatePresentation,
};

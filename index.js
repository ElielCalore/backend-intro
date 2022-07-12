const express = require("express");
const app = express();
app.use(express.json());

const data = require("./data");
const { v4: generatorId } = require("uuid");

app.post("/create", (req, res) => {
  data.push({ ...req.body, id: generatorId() });
  return res.status(201).json({ message: "Seu documento foi criado!" });
});

app.get("/read", (req, res) => {
  return res.status(200).json(data);
});

app.get("/details/:id", (req, res) => {
  const { id } = req.params;
  const document = data.filter((currentDocument) => currentDocument.id === id);
  return res.status(200).json(document[0]);
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  data.forEach((currentDocument, i) => {
    if (currentDocument.id === id) {
      data[i] = { ...req.body, id: currentDocument.id };
    }
  });
  const newDocument = data.filter(
    (currentDocument) => currentDocument.id === id
  );
  return res.status(200).json(newDocument[0]);
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const document = data.filter((currentDocument) => currentDocument.id === id);

  document.remove(id);

  return res.status(200).json(data);
});

app.listen(4000, () => {
  console.log("Servidor rodando na porta 4000.");
});

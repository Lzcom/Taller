var admin = require("firebase-admin");
const { response, request } = require("express");

var serviceAccount = require("./heroes-c57e8-firebase-adminsdk-ucy0m-92cfaf4f3e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const heroesRef = db.collection("heroes");

// Función para agregar héroe
const addHeroe = async (req, res = response) => {
  try {
    const heroe = req.body;
    const heroeRef = await heroesRef.add(heroe);

    res.status(201).json({
      "msg": "Héroe creado exitosamente",
      "id": heroeRef.id
    });
  } catch (error) {
    res.status(500).json({
      "msg": "Héroe no agregado correctamente",
      error
    });
  }
};

// Función para eliminar héroe
const delHeroe = async (req, res = response) => {
  try {
    const { heroeId } = req.params;
    const heroeRef = heroesRef.doc(heroeId);
    await heroeRef.delete();
    res.status(200).json({
      "msg": "Héroe eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      "msg": "Error al eliminar el héroe",
      error
    });
  }
};

// Función para actualizar un héroe
const updHeroe = async (req, res = response) => {
  try {
    const { heroeId } = req.params;
    const upHeroe = req.body;
    const heroeRef = heroesRef.doc(heroeId);
    await heroeRef.update(upHeroe);
    res.status(200).json({
      "msg": "Héroe actualizado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      "msg": "Error al actualizar el héroe",
      error
    });
  }
};

// Función para encontrar héroes por criterio
const findHeroeByCriteria = async (req, res = response) => {
  try {
    const { field, operator, value } = req.body;
    const querySnapshot = await heroesRef.where(field, operator, value).get();

    if (querySnapshot.empty) {
      res.status(404).json({
        "msg": "No se encontraron héroes con estos criterios de búsqueda"
      });
    } else {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json({
        "msg": "Héroes encontrados",
        results
      });
    }
  } catch (error) {
    res.status(500).json({
      "msg": "Error al buscar héroe",
      error
    });
  }
};

// Función para ordenar héroes por criterio
const orderHeroeByCriteria = async (req, res = response) => {
  try {
    const { field, order } = req.body;
    const querySnapshot = await heroesRef.orderBy(field, order).get();

    if (querySnapshot.empty) {
      res.status(404).json({
        "msg": "No se encontraron héroes con estos criterios de búsqueda"
      });
    } else {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json({
        "msg": "Héroes ordenados encontrados",
        results
      });
    }
  } catch (error) {
    res.status(500).json({
      "msg": "Error al ordenar los héroes",
      error
    });
  }
};

// Exportar todas las funciones
module.exports = {
  addHeroe,
  delHeroe,
  updHeroe,
  findHeroeByCriteria,
  orderHeroeByCriteria
};

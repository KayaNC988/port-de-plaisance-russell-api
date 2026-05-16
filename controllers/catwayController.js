const Catway = require("../models/Catway");
const Reservation = require("../models/Reservation");

exports.getAllCatwaysApi = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCatwaysPage = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render("catways", { catways });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNewCatwayForm = (req, res) => {
  res.render("new-catway");
};

exports.getEditCatwayForm = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });

    if (!catway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }

    res.render("edit-catway", { catway });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCatwayFromForm = async (req, res) => {
  try {
    await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      {
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState,
      }
    );

    res.redirect("/catways-page");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCatwayReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      catwayNumber: req.params.id,
    });

    res.render("reservations", {
      reservations,
      catwayNumber: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneCatwayApi = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });

    if (!catway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }

    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;

    if (!catwayNumber || !catwayType || !catwayState) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    const newCatway = new Catway({
      catwayNumber,
      catwayType,
      catwayState,
    });

    await newCatway.save();

    res.redirect("/catways-page");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCatwayApi = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });

    if (!catway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }

    if (req.body.catwayState !== undefined) {
      catway.catwayState = req.body.catwayState;
    }

    const updatedCatway = await catway.save();

    res.json(updatedCatway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCatway = async (req, res) => {
  try {
    await Catway.findOneAndDelete({
      catwayNumber: req.params.id,
    });

    res.redirect("/catways-page");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
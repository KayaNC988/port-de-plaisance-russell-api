const Reservation = require("../models/Reservation");

exports.getReservations = async (req, res) => {
  try {
    let reservations;

    if (req.query.catwayNumber) {
      reservations = await Reservation.find({
        catwayNumber: Number(req.query.catwayNumber),
      });

      return res.render("reservations", {
        reservations,
        catwayNumber: req.query.catwayNumber,
      });
    }

    reservations = await Reservation.find();
    res.render("all-reservations", { reservations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNewReservationForm = (req, res) => {
  res.render("new-reservation", {
    catwayNumber: req.query.catwayNumber || req.params.id,
  });
};

exports.getEditReservationForm = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: Number(req.params.id),
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.render("edit-reservation", {
      reservation,
      catwayNumber: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReservationDetail = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: Number(req.params.id),
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.render("reservation-detail", {
      reservation,
      catwayNumber: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

    if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    const newReservation = new Reservation({
      catwayNumber: Number(catwayNumber),
      clientName,
      boatName,
      startDate,
      endDate,
    });

    await newReservation.save();

    res.redirect("/reservations");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.redirectToReservationDetail = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: Number(req.body.catwayNumber || req.params.id),
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.redirect(`/reservations/${reservation._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReservationApi = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: Number(req.params.id),
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    if (req.body.clientName !== undefined) reservation.clientName = req.body.clientName;
    if (req.body.boatName !== undefined) reservation.boatName = req.body.boatName;
    if (req.body.startDate !== undefined) reservation.startDate = req.body.startDate;
    if (req.body.endDate !== undefined) reservation.endDate = req.body.endDate;

    const updatedReservation = await reservation.save();

    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateReservationFromForm = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: Number(req.params.id),
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    reservation.clientName = req.body.clientName;
    reservation.boatName = req.body.boatName;
    reservation.startDate = req.body.startDate;
    reservation.endDate = req.body.endDate;

    await reservation.save();

    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findOneAndDelete({
      _id: req.params.idReservation,
      catwayNumber: Number(req.params.id),
    });

    if (!deletedReservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.redirect("/reservations");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const { v4: uuidv4 } = require ("uuid");


const db = require("../models");
const Pollution = db.pollution;
const Op = db.Sequelize.Op;

// exports.get = (req, res) => {

//      Pollution.findAll()
//     .then(data => {res.send(data);})
//     .catch(err => {
//       res.status(400).send({
//         message: err.message
//       });
//     });

// };

// GET toutes les pollutions
exports.getAll = async (req, res) => {
    try {
        const pollutions = await Pollution.findAll();
        res.status(200).json(pollutions);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET pollution par ID
exports.getById = async (req, res) => {
    try {
        const pollution = await Pollution.findByPk(req.params.id);
        if (!pollution) return res.status(404).json({ message: "Pollution non trouvée" });
        res.status(200).json(pollution);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// POST créer une pollution
exports.create = async (req, res) => {
    try {
        // Ajouter l'ID de l'utilisateur connecté à la pollution
        const pollutionData = {
            ...req.body,
            user_id: req.user.id // L'utilisateur est ajouté par le middleware authenticateToken
        };
        const newPollution = await Pollution.create(pollutionData);
        res.status(201).json(newPollution);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT mettre à jour une pollution
exports.update = async (req, res) => {
    try {
        // Vérifier que la pollution existe
        const pollution = await Pollution.findByPk(req.params.id);
        if (!pollution) return res.status(404).json({ message: "Pollution non trouvée" });
        
        // Vérifier que l'utilisateur est propriétaire (sauf si admin)
        if (req.user.role !== 'admin' && pollution.user_id !== req.user.id) {
            return res.status(403).json({ message: "Non autorisé à modifier cette pollution" });
        }
        
        // Mettre à jour la pollution
        const [updated] = await Pollution.update(req.body, {
            where: { id: req.params.id }
        });
        const updatedPollution = await Pollution.findByPk(req.params.id);
        res.status(200).json(updatedPollution);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE supprimer une pollution
exports.delete = async (req, res) => {
    try {
        // Vérifier que la pollution existe
        const pollution = await Pollution.findByPk(req.params.id);
        if (!pollution) return res.status(404).json({ message: "Pollution non trouvée" });
        
        // Vérifier que l'utilisateur est propriétaire (sauf si admin)
        if (req.user.role !== 'admin' && pollution.user_id !== req.user.id) {
            return res.status(403).json({ message: "Non autorisé à supprimer cette pollution" });
        }
        
        // Supprimer la pollution
        await Pollution.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Pollution supprimée" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
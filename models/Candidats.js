const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
  'candidats',
  { 
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: Sequelize.STRING
    },
    prenom: {
      type: Sequelize.STRING
    },
    dateEmbouche: {
      type: Sequelize.STRING
    },
    postOcupe: {
      type: Sequelize.STRING
    },
    dateEntretienInd: {
      type: Sequelize.STRING
    },
    visiteMedical: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0

    },
    entretienIndividuel: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    },
    commentaire: {
      type: Sequelize.STRING
    },
    dateValidCrtSejour: {
      type: Sequelize.STRING
        },
     entretienIndividuel: {
       type: Sequelize.BOOLEAN
     }
  },
  {
    timestamps: false
  }
)

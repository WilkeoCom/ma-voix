const t = require('tcomb')

const ProjectType = t.enums({
  FOREIGN_AFFAIRS_AND_COOPERATION: 'Affaires étrangères et coopération',
  AGRICULTURE_AND_FISHING: 'Agriculture et pêche',
  TERRITORY_DEVELOPMENT: 'Aménagement du territoire',
  VETERANS: 'Anciens combattants',
  BUDGET: 'Budget',
  TERRITORIAL_COMMUNITIES: 'Collectivités territoriales',
  CULTURE: 'Culture',
  DEFENSE: 'Défense',
  ECONOMY_AND_FINANCE_TAXATION: 'Économie et finances, fiscalité',
  EDUCATION: 'Éducation',
  ENERGY: 'Énergie',
  COMPANIES: 'Entreprises',
  ENVIRONMENT: 'Environnement',
  FAMILY: 'Famille',
  PUBLIC_SERVICE: 'Fonction publique',
  JUSTICE: 'Justice',
  HOUSING_AND_URBAN_PLANNING: 'Logement et urbanisme',
  OVERSEAS: 'Outre-mer',
  SMES_TRADE_AND_CRAFTS: 'PME, commerce et artisanat',
  POLICE_AND_SECURITY: 'Police et sécurité',
  PUBLIC_AUTHORITIES_AND_CONSTITUTION: 'Pouvoirs publics et Constitution',
  SOCIAL_ISSUES_AND_HEALTH: 'Questions sociales et santé',
  RESEARCH_SCIENCE_AND_TECHNOLOGY: 'Recherche, sciences et techniques',
  SOCIAL_SECURITY: 'Sécurité sociale',
  SOCIETY: 'Société',
  SPORTS: 'Sports',
  TREATIES_AND_CONVENTIONS: 'Traités et conventions',
  TRANSPORT: 'Transports',
  JOB: 'Travail',
  EUROPEAN_UNION: 'Union européenne'
}, 'ProjectType')

module.exports = ProjectType

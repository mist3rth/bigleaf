import colliersDePerlesImg from '../assets/colliers_de_perles.webp';
import agaveImg from '../assets/agave.webp';
import figuierImg from '../assets/figuier.webp';
import caillouImg from '../assets/caillou.webp';
import rubisImg from '../assets/rubis.webp';
import echeveriaElegansImg from '../assets/redo.webp';
import cristaImg from '../assets/crista.webp';
import pandaImg from '../assets/panda.webp';
import boulleImg from '../assets/boulle.webp';

export interface Succulent {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: 'interior' | 'exterior' | 'easy' | 'rare';
  categoryLabel: string;
  image: string;
  description: string;
  care: {
    light: string;
    water: string;
    temperature: string;
    difficulty: 'Facile' | 'Modéré' | 'Expert';
  };
  size: string;
  origin: string;
  petFriendly: boolean;
}

export const SUCCULENTS: Succulent[] = [
  {
    id: 'echeveria-elegans',
    name: 'Echeveria Elegans',
    scientificName: 'Echeveria elegans',
    price: 14.00,
    rating: 4.9,
    reviewsCount: 42,
    category: 'interior',
    categoryLabel: 'Succulentes d\'Intérieur',
    image: echeveriaElegansImg,
    description: 'Une somptueuse rosette bleu-argenté rappelant une fleur de lotus. L\'Echeveria Elegans se pare de teintes rosées lorsqu\'elle est exposée à une lumière vive. Idéale pour apporter une touche géométrique et épurée à votre décoration.',
    care: {
      light: 'Lumière vive directe',
      water: 'Modéré (laisser sécher complètement)',
      temperature: '15°C - 26°C, ne supporte pas le gel.',
      difficulty: 'Facile'
    },
    size: '12 cm de diamètre',
    origin: 'Mexique',
    petFriendly: true
  },
  {
    id: 'senecio-rowleyanus',
    name: 'Collier de Perles',
    scientificName: 'Senecio rowleyanus',
    price: 24.00,
    rating: 4.7,
    reviewsCount: 35,
    category: 'interior',
    categoryLabel: 'Succulentes d\'Intérieur',
    image: colliersDePerlesImg,
    description: 'Une plante retombante spectaculaire caractérisée par de petites billes charnues évoquant un collier de perles vertes. Magnifique disposée en suspension pour habiller le coin d\'une pièce lumineuse.',
    care: {
      light: 'Lumière vive indirecte',
      water: 'Faible (dès que les perles se rident)',
      temperature: '15°C - 24°C',
      difficulty: 'Modéré'
    },
    size: 'Tiges de 25-30 cm de long',
    origin: 'Sud-Ouest de l\'Afrique',
    petFriendly: false
  },
  {
    id: 'sansevieria-trifasciata',
    name: 'Langue de Belle-mère',
    scientificName: 'Sansevieria trifasciata',
    price: 22.00,
    rating: 4.8,
    reviewsCount: 19,
    category: 'interior',
    categoryLabel: 'Succulentes d\'Intérieur',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
    description: 'Plante d\'intérieur dépolluante et extrêmement graphique avec ses feuilles érigées bicolores bordées de jaune vif. Elle résiste à presque toutes les conditions de vie en intérieur.',
    care: {
      light: 'Lumière faible à vive',
      water: 'Très faible (1 fois par mois suffira)',
      temperature: '12°C - 30°C',
      difficulty: 'Facile'
    },
    size: '45 cm de hauteur',
    origin: 'Afrique de l\'Ouest',
    petFriendly: false
  },
  {
    id: 'peperomia-prostrata',
    name: 'Chaîne de Tortues',
    scientificName: 'Peperomia prostrata',
    price: 26.00,
    rating: 4.9,
    reviewsCount: 14,
    category: 'interior',
    categoryLabel: 'Succulentes d\'Intérieur',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    description: 'Une minuscule succulente retombante rare et prisée pour ses petites feuilles rondes arborant de délicats motifs imitant la carapace d\'une tortue de terre.',
    care: {
      light: 'Lumière vive tamisée',
      water: 'Modéré (redoute le dessèchement extrême)',
      temperature: '16°C - 25°C',
      difficulty: 'Modéré'
    },
    size: 'Tiges de 15-20 cm de long',
    origin: 'Brésil',
    petFriendly: true
  },
  {
    id: 'aloe-variegata',
    name: 'Aloe Garielle',
    scientificName: 'Aloe variegata',
    price: 19.00,
    rating: 4.8,
    reviewsCount: 15,
    category: 'exterior',
    categoryLabel: 'Cactus d\'Extérieur',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80',
    description: 'Aussi appelée Aloe Faucon, cette plante grasse possède des feuilles triangulaires d\'un vert foncé ornées de bandes transversales blanches très graphiques. Elle produit de magnifiques clochettes orangées au printemps.',
    care: {
      light: 'Lumière vive ou plein soleil',
      water: 'Faible (garder au sec l\'hiver)',
      temperature: '5°C - 28°C, supporte de courtes gelées sèches.',
      difficulty: 'Facile'
    },
    size: '15 cm de hauteur',
    origin: 'Namibie & Afrique du Sud',
    petFriendly: false
  },
  {
    id: 'sempervivum-tectorum',
    name: 'Joubarbe des Toits',
    scientificName: 'Sempervivum tectorum',
    price: 11.50,
    rating: 4.9,
    reviewsCount: 54,
    category: 'exterior',
    categoryLabel: 'Cactus d\'Extérieur',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    description: 'L\'une des succulentes les plus rustiques de notre atelier, capable de survivre à des hivers rigoureux sous la neige. Ses rosettes s\'étalent pour former de magnifiques tapis végétaux colorés.',
    care: {
      light: 'Plein soleil d\'extérieur',
      water: 'Très faible (uniquement si sécheresse prolongée)',
      temperature: '-15°C - 35°C (ultra rustique)',
      difficulty: 'Facile'
    },
    size: '8 cm de diamètre',
    origin: 'Alpes & Pyrénées',
    petFriendly: true
  },
  {
    id: 'agave-americana',
    name: 'Agave Américain',
    scientificName: 'Agave americana',
    price: 34.00,
    rating: 4.8,
    reviewsCount: 21,
    category: 'exterior',
    categoryLabel: 'Cactus d\'Extérieur',
    image: agaveImg,
    description: 'Une plante majestueuse aux larges feuilles bleutées bordées d\'épines sombres. Un élément architectural incontournable pour votre terrasse, balcon exposé ou jardin de rocaille.',
    care: {
      light: 'Plein soleil ardent',
      water: 'Faible (arroser seulement en été)',
      temperature: '-8°C - 40°C',
      difficulty: 'Facile'
    },
    size: '25 cm de hauteur',
    origin: 'Mexique',
    petFriendly: false
  },
  {
    id: 'opuntia-ficus-indica',
    name: 'Figuier de Barbarie',
    scientificName: 'Opuntia ficus-indica',
    price: 28.00,
    rating: 4.7,
    reviewsCount: 16,
    category: 'exterior',
    categoryLabel: 'Cactus d\'Extérieur',
    image: figuierImg,
    description: 'Le célèbre cactus "raquette" d\'extérieur qui produit des fleurs jaunes lumineuses suivies de délicieux fruits comestibles. Extrêmement graphique et résistant à la chaleur caniculaire.',
    care: {
      light: 'Plein soleil obligatoire',
      water: 'Faible (laisser les raquettes se rider un peu)',
      temperature: '-5°C - 45°C',
      difficulty: 'Facile'
    },
    size: '30 cm de hauteur',
    origin: 'Mexique & Bassin Méditerranéen',
    petFriendly: false
  },
  {
    id: 'haworthia-limifolia',
    name: 'Haworthia Limifolia',
    scientificName: 'Haworthia limifolia',
    price: 18.00,
    rating: 4.8,
    reviewsCount: 29,
    category: 'interior',
    categoryLabel: 'Succulentes d\'Intérieur',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    description: 'Aussi appelée "Plante Planche à Laver" en raison des stries régulières sur ses feuilles triangulaires d\'un vert très sombre. C\'est l\'une des plantes grasses les plus robustes qui soient, tolérant très bien la pénombre.',
    care: {
      light: 'Lumière moyenne à vive',
      water: 'Très économique (1 fois par mois l\'hiver)',
      temperature: '10°C - 28°C',
      difficulty: 'Facile'
    },
    size: '10 cm de hauteur',
    origin: 'Afrique du Sud',
    petFriendly: true
  },
  {
    id: 'crassula-ovata',
    name: 'Arbre de Jade',
    scientificName: 'Crassula ovata',
    price: 16.00,
    rating: 4.9,
    reviewsCount: 51,
    category: 'interior',
    categoryLabel: 'Succulentes d\'Intérieur',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    description: 'Un bonsaï naturel aux petites feuilles charnues et luisantes ourlées de rouge sous le soleil. Surnommée plante de la fortune, elle apporte calme et élégance avec sa silhouette d\'arbre miniature centenaire.',
    care: {
      light: 'Soleil direct ou lumière vive',
      water: 'Modéré (terreau complètement sec)',
      temperature: '10°C - 25°C',
      difficulty: 'Facile'
    },
    size: '20 cm de hauteur',
    origin: 'Afrique du Sud',
    petFriendly: false
  },
  {
    id: 'kalanchoe-tomentosa',
    name: 'Kalanchoé Panda',
    scientificName: 'Kalanchoe tomentosa',
    price: 13.00,
    rating: 4.8,
    reviewsCount: 31,
    category: 'interior',
    categoryLabel: 'Succulentes d\'Intérieur',
    image: pandaImg,
    description: 'Une plante veloutée irrésistible aux feuilles épaisses entièrement recouvertes de fins poils gris argentés et bordées de petites taches brunes régulières évoquant la fourrure d\'un panda.',
    care: {
      light: 'Lumière vive sans soleil brûlant',
      water: 'Modéré (ne pas mouiller le feuillage)',
      temperature: '15°C - 25°C',
      difficulty: 'Facile'
    },
    size: '14 cm de hauteur',
    origin: 'Madagascar',
    petFriendly: false
  },
  {
    id: 'sedum-morganianum',
    name: 'Queue d\'Âne',
    scientificName: 'Sedum morganianum',
    price: 17.50,
    rating: 4.7,
    reviewsCount: 23,
    category: 'interior',
    categoryLabel: 'Succulentes d\'Intérieur',
    image: 'https://images.unsplash.com/photo-1536882240095-0379873feb4e?auto=format&fit=crop&w=800&q=80',
    description: 'Une fabuleuse cascade de petites feuilles vert-gris charnues superposées en tresses denses. Très facile à cultiver et idéale pour les étagères ou les suspensions.',
    care: {
      light: 'Lumière vive avec un peu de soleil',
      water: 'Modéré (arroser légèrement en profondeur)',
      temperature: '12°C - 26°C',
      difficulty: 'Facile'
    },
    size: 'Suspension de 20 cm',
    origin: 'Mexique',
    petFriendly: true
  },
  {
    id: 'euphorbia-lactea',
    name: 'Euphorbia Cristata',
    scientificName: 'Euphorbia lactea \'Cristata\'',
    price: 39.00,
    rating: 5.0,
    reviewsCount: 18,
    category: 'rare',
    categoryLabel: 'Espèces Rares',
    image: cristaImg,
    description: 'Une succulente d\'exception à la croissance "cristée" formant des ondulations architecturales uniques rappelant des coraux marins. Chaque spécimen possède une silhouette sculpturale absolument unique.',
    care: {
      light: 'Lumière vive tamisée',
      water: 'Très faible (laisser sécher 100%)',
      temperature: '12°C - 30°C',
      difficulty: 'Expert'
    },
    size: '18 cm de hauteur',
    origin: 'Inde & Asie Tropicale',
    petFriendly: false
  },
  {
    id: 'gymnocalycium-mihanovichii',
    name: 'Cactus Rubis',
    scientificName: 'Gymnocalycium mihanovichii',
    price: 15.00,
    rating: 4.6,
    reviewsCount: 22,
    category: 'rare',
    categoryLabel: 'Espèces Rares',
    image: rubisImg,
    description: 'Une incroyable succulente greffée, surmontée d\'un globe aux teintes rouge pourpre néon éclatant. Ne produisant pas de chlorophylle propre, elle vit en symbiose avec son porte-greffe vert.',
    care: {
      light: 'Lumière vive indirecte',
      water: 'Faible (uniquement à la racine)',
      temperature: '15°C - 26°C',
      difficulty: 'Modéré'
    },
    size: '12 cm de hauteur',
    origin: 'Paraguay (Forme horticole)',
    petFriendly: false
  },
  {
    id: 'lithops-karasmontana',
    name: 'Plante Caillou',
    scientificName: 'Lithops karasmontana',
    price: 21.00,
    rating: 4.9,
    reviewsCount: 11,
    category: 'rare',
    categoryLabel: 'Espèces Rares',
    image: caillouImg,
    description: 'Les incroyables "pierres vivantes". Ces minuscules plantes de collection imitent à la perfection le gravier de leur milieu naturel pour échapper aux herbivores sauvages.',
    care: {
      light: 'Plein soleil et chaleur intense',
      water: 'Extrêmement faible (presque aucun en hiver)',
      temperature: '12°C - 35°C',
      difficulty: 'Expert'
    },
    size: '4 cm de diamètre',
    origin: 'Déserts de Namibie',
    petFriendly: true
  },
  {
    id: 'ariocarpus-fissuratus',
    name: 'Cactus Boule',
    scientificName: 'Ariocarpus fissuratus',
    price: 45.00,
    rating: 5.0,
    reviewsCount: 8,
    category: 'rare',
    categoryLabel: 'Espèces Rares',
    image: boulleImg,
    description: 'Aussi appelé "Rocher vivant", ce cactus sans épines à croissance ultra-lente est une rareté absolue d\'allure fossile géométrique très convoitée par les spécialistes.',
    care: {
      light: 'Exposition ensoleillée intense',
      water: 'Ultra-faible (arroser seulement 3-4 fois par an)',
      temperature: '10°C - 40°C',
      difficulty: 'Expert'
    },
    size: '7 cm de diamètre',
    origin: 'Texas & Mexique',
    petFriendly: true
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Toutes les catégories' },
  { id: 'interior', label: 'Intérieur' },
  { id: 'exterior', label: 'Extérieur / Cactus' },
  { id: 'pets-friendly', label: 'Pet Friendly' },
  { id: 'rare', label: 'Espèces Rares' }
];

export const FAQS = [
  {
    question: 'Commande & Livraison à domicile ?',
    answer: 'Nous expédions nos succulentes dans toute l\'Europe avec un emballage isotherme breveté, assurant la protection thermique et structurelle de la plante. Les frais de livraison sont offerts dès 50 € d\'achat.'
  },
  {
    question: 'Service de Rempotage sur-mesure ?',
    answer: 'Toutes nos plantes grasses sont rempotées à la commande par nos artisans botanistes dans un substrat drainant spécifique à base de pouzzolane et de sable de rivière, logées dans nos magnifiques pots en terre cuite naturelle fabriqués à la main.'
  },
  {
    question: 'Puis-je expédier les succulentes en hiver ?',
    answer: 'Oui, absolument ! Lors des périodes de froid, nous intégrons gratuitement un coussin chauffant biodégradable (heat pack) dans le colis afin de maintenir une température optimale de 12°C à 18°C pendant 72 heures.'
  },
  {
    question: 'Retrait en Boutique (Click & Collect) ?',
    answer: 'Vous pouvez sélectionner l\'option "Retrait gratuit en serre" lors de votre paiement. Votre commande sera préparée avec amour et prête à être récupérée sous 2 heures dans nos ateliers parisiens.'
  }
];

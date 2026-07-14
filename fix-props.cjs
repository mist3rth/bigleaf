const fs = require('fs');

function replaceProps(path, newStartCode) {
  let c = fs.readFileSync(path, 'utf8');
  // inject imports
  if (!c.includes('useUI')) {
    c = c.replace(/import\s+.*?['"].*?['"];?\n/m, (m) => m + "import { useUI } from '../context/UIContext';\nimport { useCart } from '../context/CartContext';\n");
  }
  
  // Try to find the export default function line
  c = c.replace(/export\s+default\s+function\s+(\w+)\([^)]*\)\s*\{/, 'export default function $1() {\n' + newStartCode);
  fs.writeFileSync(path, c);
}

function fixPaths() {
  replaceProps('src/pages/Team.tsx', '  const { navigate } = useUI();\n  const onBack = () => navigate("home");\n');
  replaceProps('src/pages/ProductDetail.tsx', '  const { selectedPlant: plant, navigate, setSelectedPlant } = useUI();\n  const { addToCart } = useCart();\n  const onClose = () => navigate("home");\n  const onAddToCart = (p) => { addToCart(p); navigate("home"); };\n  const onSelectPlant = (p) => setSelectedPlant(p);\n  if (!plant) return null;\n');
  replaceProps('src/pages/Shop.tsx', '  const { navigate, setSelectedPlant, searchQuery, setSearchQuery } = useUI();\n  const { addToCart } = useCart();\n  const onBack = () => navigate("home");\n  const onAddToCart = (p) => addToCart(p);\n  const onOpenProductModal = (p) => { setSelectedPlant(p); navigate("product"); };\n');

  replaceProps('src/components/sections/Hero.tsx', '  const { navigate } = useUI();\n  const onDiscoverClick = () => navigate("shop");\n');
  replaceProps('src/components/sections/FeaturedCollections.tsx', '  const { navigate } = useUI();\n  const onSelectCollection = (c) => navigate("shop");\n');
  replaceProps('src/components/sections/IntroSection.tsx', '  const { navigate } = useUI();\n  const selectedCategory = "all";\n  const onSelectCategory = (c) => navigate("shop");\n  const onExploreAll = () => navigate("shop");\n');
  replaceProps('src/components/sections/NewPlants.tsx', '  const { navigate, setSelectedPlant } = useUI();\n  const { addToCart } = useCart();\n  const selectedCategory = "all";\n  const searchQuery = "";\n  const onAddToCart = (p) => addToCart(p);\n  const onOpenProductModal = (p) => { setSelectedPlant(p); navigate("product"); };\n');
  replaceProps('src/components/sections/IndoorCollectionGrid.tsx', '  const { navigate, setSelectedPlant } = useUI();\n  const onSelectPlant = (p) => { setSelectedPlant(p); navigate("product"); };\n');
}

fixPaths();
console.log('Done');

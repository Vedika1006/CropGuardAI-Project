# Treatment recommendations keyed by the exact class labels used in app.py's
# DISEASE_CLASS_NAMES. Each entry has organic / chemical / preventive advice.
# "Healthy" entries get maintenance-only advice instead of treatments.

HEALTHY_DEFAULT = {
    "organic": ["No disease detected — continue regular organic composting", "Maintain healthy soil microbiome", "Monitor leaves weekly for early signs"],
    "chemical": ["No treatment needed"],
    "preventive": ["Keep up current watering and fertilizing schedule", "Rotate crops each season", "Inspect regularly for early symptoms"],
}

TREATMENTS = {
    # ---------------- Apple ----------------
    "Apple___Apple_scab": {
        "organic": ["Apply sulfur or copper-based organic fungicide", "Remove and destroy fallen leaves in autumn", "Improve air circulation by pruning"],
        "chemical": ["Apply Myclobutanil fungicide", "Use Captan spray", "Apply Mancozeb at bud break"],
        "preventive": ["Plant scab-resistant apple varieties", "Avoid overhead irrigation", "Rake and dispose of leaf litter each fall"],
    },
    "Apple___Black_rot": {
        "organic": ["Prune out cankers and dead wood", "Apply copper-based fungicide", "Remove mummified fruit from tree"],
        "chemical": ["Apply Captan fungicide", "Use Thiophanate-methyl", "Spray Mancozeb during wet periods"],
        "preventive": ["Sanitize pruning tools between cuts", "Remove nearby wild/abandoned apple trees", "Ensure good tree spacing for airflow"],
    },
    "Apple___Cedar_apple_rust": {
        "organic": ["Remove nearby juniper/cedar hosts if possible", "Apply sulfur spray at early leaf stage", "Use neem oil as a preventive spray"],
        "chemical": ["Apply Myclobutanil fungicide", "Use Propiconazole", "Spray Mancozeb from pink bud stage"],
        "preventive": ["Plant rust-resistant apple varieties", "Keep at least 2 miles from cedar/juniper trees if possible", "Apply protective sprays before spring rains"],
    },
    "Apple___healthy": HEALTHY_DEFAULT,

    # ---------------- Corn (maize) ----------------
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
        "organic": ["Rotate with non-host crops for 1-2 seasons", "Apply compost tea to boost plant immunity", "Remove and destroy infected residue"],
        "chemical": ["Apply Azoxystrobin fungicide", "Use Pyraclostrobin", "Spray Propiconazole at early symptoms"],
        "preventive": ["Plant resistant hybrids", "Practice conservation tillage to bury residue", "Avoid dense planting to improve airflow"],
    },
    "Corn_(maize)___Common_rust_": {
        "organic": ["Apply sulfur dust at first sign of pustules", "Use neem oil spray", "Remove severely infected lower leaves"],
        "chemical": ["Apply Azoxystrobin fungicide", "Use Propiconazole", "Spray Mancozeb"],
        "preventive": ["Plant rust-resistant hybrids", "Avoid late planting in humid regions", "Monitor fields weekly during humid weather"],
    },
    "Corn_(maize)___healthy": HEALTHY_DEFAULT,
    "Corn_(maize)___Northern_Leaf_Blight": {
        "organic": ["Rotate crops away from corn for a season", "Apply compost to strengthen plant health", "Remove infected debris after harvest"],
        "chemical": ["Apply Azoxystrobin fungicide", "Use Propiconazole", "Spray Mancozeb at first lesion appearance"],
        "preventive": ["Plant resistant hybrids", "Till under crop residue", "Avoid overhead irrigation late in the season"],
    },

    # ---------------- Guava ----------------
    "Guava_diseased": {
        "organic": ["Apply neem oil spray weekly", "Remove and destroy infected leaves/fruit", "Use Trichoderma-based bio-fungicide"],
        "chemical": ["Apply Copper oxychloride spray", "Use Carbendazim fungicide", "Spray Mancozeb"],
        "preventive": ["Prune for better air circulation", "Avoid waterlogging around roots", "Sanitize tools between plants"],
    },
    "Guava_healthy": HEALTHY_DEFAULT,

    # ---------------- Grape ----------------
    "Grape___Black_rot": {
        "organic": ["Remove mummified berries and infected leaves", "Apply copper-based organic fungicide", "Improve canopy airflow via pruning"],
        "chemical": ["Apply Myclobutanil fungicide", "Use Mancozeb spray", "Apply Captan during wet weather"],
        "preventive": ["Prune for open canopy structure", "Remove wild grapevines nearby", "Apply protective sprays before bloom"],
    },
    "Grape___Esca_(Black_Measles)": {
        "organic": ["Remove and destroy infected wood", "Avoid pruning during wet weather", "Apply Trichoderma to pruning wounds"],
        "chemical": ["Apply fungicidal pruning wound sealant", "Use Thiophanate-methyl on cuts", "No fully effective in-season chemical cure — focus on wound protection"],
        "preventive": ["Prune in dry weather only", "Sanitize pruning tools between vines", "Avoid mechanical trunk injuries"],
    },
    "Grape___healthy": HEALTHY_DEFAULT,
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
        "organic": ["Apply copper-based fungicide", "Remove infected leaves promptly", "Improve canopy ventilation"],
        "chemical": ["Apply Mancozeb spray", "Use Azoxystrobin", "Spray Copper hydroxide"],
        "preventive": ["Avoid overhead irrigation", "Maintain wide vine spacing", "Remove fallen leaf debris each season"],
    },

    # ---------------- Lemon ----------------
    "Lemon_diseased": {
        "organic": ["Apply neem oil spray", "Remove infected leaves and fruit", "Use copper-based organic spray"],
        "chemical": ["Apply Copper oxychloride", "Use Streptocycline for bacterial infections", "Spray Mancozeb"],
        "preventive": ["Avoid overhead watering", "Disinfect pruning tools", "Maintain proper tree spacing"],
    },
    "Lemon_healthy": HEALTHY_DEFAULT,

    # ---------------- Mango ----------------
    "Mango_diseased": {
        "organic": ["Apply neem oil spray", "Remove and burn infected plant parts", "Use Trichoderma-based bio-fungicide"],
        "chemical": ["Apply Carbendazim fungicide", "Use Copper oxychloride spray", "Spray Mancozeb"],
        "preventive": ["Prune for good air circulation", "Avoid excess nitrogen fertilizer", "Remove fallen leaves and fruit debris"],
    },
    "Mango_healthy": HEALTHY_DEFAULT,

    # ---------------- Peach ----------------
    "Peach___Bacterial_spot": {
        "organic": ["Apply copper-based bactericide", "Avoid working in wet foliage", "Remove and destroy infected leaves"],
        "chemical": ["Apply Copper hydroxide spray", "Use Oxytetracycline", "Spray during dormant season with copper"],
        "preventive": ["Plant resistant peach varieties", "Avoid overhead irrigation", "Space trees for good airflow"],
    },
    "Peach___healthy": HEALTHY_DEFAULT,

    # ---------------- Pepper, bell ----------------
    "Pepper,_bell___Bacterial_spot": {
        "organic": ["Apply copper-based bactericide", "Use crop rotation with non-solanaceous crops", "Remove infected plant debris"],
        "chemical": ["Apply Copper hydroxide spray", "Use Streptomycin (where permitted)", "Spray Mancozeb as a tank-mix partner"],
        "preventive": ["Use certified disease-free seed", "Avoid overhead watering", "Disinfect stakes and tools"],
    },
    "Pepper,_bell___healthy": HEALTHY_DEFAULT,

    # ---------------- Pomegranate ----------------
    "Pomegranate_diseased": {
        "organic": ["Apply neem oil spray", "Remove infected fruit and leaves", "Use Bordeaux mixture as organic fungicide"],
        "chemical": ["Apply Carbendazim fungicide", "Use Copper oxychloride spray", "Spray Mancozeb"],
        "preventive": ["Prune for airflow", "Avoid water stagnation around roots", "Bag fruit to protect from infection"],
    },
    "Pomegranate_healthy": HEALTHY_DEFAULT,

    # ---------------- Potato ----------------
    "Potato___Early_blight": {
        "organic": ["Apply copper-based fungicide", "Remove lower infected leaves", "Mulch to reduce soil splash onto leaves"],
        "chemical": ["Apply Chlorothalonil fungicide", "Use Mancozeb spray", "Spray Azoxystrobin"],
        "preventive": ["Rotate crops with non-solanaceous plants", "Use certified disease-free seed potatoes", "Avoid overhead irrigation"],
    },
    "Potato___healthy": HEALTHY_DEFAULT,
    "Potato___Late_blight": {
        "organic": ["Apply copper-based fungicide immediately", "Remove and destroy infected plants", "Improve field drainage"],
        "chemical": ["Apply Metalaxyl + Mancozeb combination", "Use Chlorothalonil spray", "Spray Cymoxanil for active outbreaks"],
        "preventive": ["Use resistant potato varieties", "Avoid planting in low-lying wet fields", "Destroy volunteer potato plants and cull piles"],
    },

    # ---------------- Rice ----------------
    "Rice___Brown_Spot": {
        "organic": ["Apply Trichoderma viride as seed treatment", "Use balanced organic fertilization (avoid nitrogen deficiency)", "Improve field drainage"],
        "chemical": ["Apply Propiconazole fungicide", "Use Mancozeb spray", "Spray Tricyclazole"],
        "preventive": ["Use disease-free certified seed", "Maintain balanced NPK fertilization", "Avoid water stress during grain filling"],
    },
    "Rice___Healthy": HEALTHY_DEFAULT,
    "Rice___Leaf_Blast": {
        "organic": ["Apply neem-based bio-pesticide", "Use Trichoderma viride", "Improve field drainage to reduce humidity"],
        "chemical": ["Apply Tricyclazole fungicide", "Use Carbendazim", "Spray Isoprothiolane"],
        "preventive": ["Use resistant rice varieties", "Avoid excess nitrogen application", "Maintain proper plant spacing"],
    },
    "Rice___Neck_Blast": {
        "organic": ["Apply Trichoderma-based bio-fungicide at booting stage", "Use balanced organic fertilization", "Improve field water management"],
        "chemical": ["Apply Tricyclazole fungicide at panicle initiation", "Use Isoprothiolane spray", "Spray Carbendazim as follow-up"],
        "preventive": ["Use resistant varieties", "Avoid late/excess nitrogen top-dressing", "Time fungicide application to booting and heading stages"],
    },

    # ---------------- Strawberry ----------------
    "Strawberry___healthy": HEALTHY_DEFAULT,
    "Strawberry___Leaf_scorch": {
        "organic": ["Remove and destroy infected leaves", "Apply copper-based organic fungicide", "Improve air circulation between plants"],
        "chemical": ["Apply Captan fungicide", "Use Myclobutanil spray", "Spray Azoxystrobin"],
        "preventive": ["Use resistant strawberry varieties", "Avoid overhead irrigation", "Renovate beds after harvest to remove old foliage"],
    },

    # ---------------- Sugarcane ----------------
    "Sugarcane_Bacterial Blight": {
        "organic": ["Use disease-free seed cane (hot water treatment)", "Apply Trichoderma-based bio-control", "Remove and burn infected stalks"],
        "chemical": ["Apply Copper oxychloride spray", "Use Streptocycline", "Spray Bordeaux mixture"],
        "preventive": ["Use certified disease-free setts", "Avoid waterlogging", "Practice field sanitation and crop rotation"],
    },
    "Sugarcane_Healthy": HEALTHY_DEFAULT,
    "Sugarcane_Red Rot": {
        "organic": ["Use hot-water-treated disease-free setts", "Apply Trichoderma viride to soil", "Remove and burn infected canes"],
        "chemical": ["Treat setts with Carbendazim before planting", "Apply Propiconazole as foliar spray", "Use Copper oxychloride for secondary infections"],
        "preventive": ["Plant resistant sugarcane varieties", "Practice 2-3 year crop rotation", "Avoid ratooning infected fields"],
    },

    # ---------------- Tomato ----------------
    "Tomato___Bacterial_spot": {
        "organic": ["Apply copper-based bactericide", "Remove infected leaves promptly", "Use crop rotation"],
        "chemical": ["Apply Copper hydroxide spray", "Use Mancozeb as tank-mix partner", "Spray Streptomycin (where permitted)"],
        "preventive": ["Use certified disease-free seed/transplants", "Avoid overhead watering", "Disinfect stakes and tools between seasons"],
    },
    "Tomato___Early_blight": {
        "organic": ["Apply copper-based fungicide", "Mulch to prevent soil splash", "Remove lower infected leaves"],
        "chemical": ["Apply Chlorothalonil fungicide", "Use Mancozeb spray", "Spray Azoxystrobin"],
        "preventive": ["Rotate crops with non-solanaceous plants", "Stake plants for airflow", "Avoid overhead irrigation"],
    },
    "Tomato___healthy": HEALTHY_DEFAULT,
    "Tomato___Late_blight": {
        "organic": ["Apply copper spray immediately", "Apply Bacillus subtilis", "Remove infected leaves"],
        "chemical": ["Apply Chlorothalonil", "Use Metalaxyl", "Spray Mancozeb"],
        "preventive": ["Avoid overhead watering", "Improve ventilation", "Remove infected leaves"],
    },
    "Tomato___Leaf_Mold": {
        "organic": ["Improve greenhouse/field ventilation", "Apply copper-based fungicide", "Remove infected lower leaves"],
        "chemical": ["Apply Chlorothalonil fungicide", "Use Mancozeb spray", "Spray Azoxystrobin"],
        "preventive": ["Reduce humidity around plants", "Avoid overhead watering", "Space plants for airflow"],
    },
    "Tomato___Septoria_leaf_spot": {
        "organic": ["Apply copper-based fungicide", "Remove and destroy infected lower leaves", "Mulch to reduce soil splash"],
        "chemical": ["Apply Chlorothalonil fungicide", "Use Mancozeb spray", "Spray Azoxystrobin"],
        "preventive": ["Rotate crops away from tomato/nightshades", "Avoid overhead irrigation", "Stake and prune for airflow"],
    },
    "Tomato___Spider_mites Two-spotted_spider_mite": {
        "organic": ["Spray insecticidal soap or neem oil", "Introduce predatory mites", "Increase humidity to deter mites"],
        "chemical": ["Apply Abamectin miticide", "Use Bifenthrin spray", "Spray Spiromesifen"],
        "preventive": ["Avoid drought-stressing plants", "Regularly hose down foliage to disrupt mites", "Monitor undersides of leaves weekly"],
    },
    "Tomato___Target_Spot": {
        "organic": ["Apply copper-based fungicide", "Remove infected leaves", "Improve air circulation"],
        "chemical": ["Apply Azoxystrobin fungicide", "Use Chlorothalonil spray", "Spray Mancozeb"],
        "preventive": ["Rotate crops", "Avoid overhead watering", "Stake plants for airflow"],
    },
    "Tomato___Tomato_mosaic_virus": {
        "organic": ["Remove and destroy infected plants immediately", "Disinfect tools with milk or bleach solution", "Wash hands before handling plants"],
        "chemical": ["No chemical cure exists — focus on removal and sanitation", "Control aphid vectors with insecticidal soap", "Disinfect greenhouse surfaces"],
        "preventive": ["Use virus-resistant varieties", "Avoid tobacco use near plants (can carry virus)", "Control weeds that host the virus"],
    },
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "organic": ["Use yellow sticky traps for whiteflies", "Apply neem oil to control whitefly vector", "Remove and destroy infected plants"],
        "chemical": ["Apply Imidacloprid to control whitefly vector", "Use insecticidal soap spray", "Spray Spiromesifen for whitefly control"],
        "preventive": ["Use virus-resistant tomato varieties", "Install insect-proof netting/screens", "Control whitefly populations early in season"],
    },

    # ---------------- Wheat ----------------
    "Wheat___Brown_Rust": {
        "organic": ["Apply sulfur dust at early symptoms", "Use neem-based spray", "Remove volunteer wheat plants"],
        "chemical": ["Apply Propiconazole fungicide", "Use Tebuconazole", "Spray Azoxystrobin"],
        "preventive": ["Plant rust-resistant wheat varieties", "Avoid late sowing", "Monitor fields during humid weather"],
    },
    "Wheat___Healthy": HEALTHY_DEFAULT,
    "Wheat___Yellow_Rust": {
        "organic": ["Apply sulfur dust", "Apply garlic extract", "Improve air circulation"],
        "chemical": ["Apply Propiconazole", "Use Tebuconazole", "Spray Azoxystrobin"],
        "preventive": ["Plant resistant varieties", "Remove infected plants", "Crop rotation"],
    },
}


def get_treatments(disease_label: str):
    return TREATMENTS.get(disease_label, HEALTHY_DEFAULT if "healthy" in disease_label.lower() else {
        "organic": ["Consult a local agricultural extension office for this specific condition"],
        "chemical": ["Consult a local agricultural extension office for this specific condition"],
        "preventive": ["Maintain good field/orchard hygiene", "Monitor plants regularly"],
    })

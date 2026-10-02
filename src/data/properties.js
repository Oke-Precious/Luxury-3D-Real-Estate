/**
 * ATELIER ESTATES - Curated Properties Portfolio
 * Editorial properties with architectural specifications, chapters for the 3D walkthrough, and room floor plan data.
 */

export const PROPERTIES = [
  {
    id: "azure-residence",
    slug: "azure-residence",
    title: "The Azure Residence",
    tagline: "Cantilevered Waterfront Sanctuary",
    subtitle: "A monolithic harmony of board-formed concrete, travertine, and boundless lagoon horizons.",
    location: "Ikoyi",
    district: "Old Ikoyi Waterfront",
    city: "Lagos",
    country: "Nigeria",
    type: "Villa",
    listingType: "Sale",
    price: 2850000000, // ₦2.85B
    priceLabel: "₦2.85B",
    priceUsd: 1820000,
    bedrooms: 5,
    bathrooms: 6,
    internalArea: 820, // m²
    externalArea: 460, // m²
    parking: 5,
    yearBuilt: 2024,
    architect: "Studio Monolith & Kéré Collaboratives",
    featured: true,
    status: "Private Portfolio",
    lifestyle: ["Waterfront Living", "Architectural Homes", "Private Estates"],
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        caption: "Cantilevered waterfront terrace and basalt infinity pool"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
        caption: "Double-height living pavilion with floor-to-ceiling acoustic glass"
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
        caption: "Bespoke Poliform culinary gallery with monolithic travertine island"
      },
      {
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
        caption: "Primary suite with dual dressing rooms and sunrise ocean balcony"
      },
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
        caption: "Architectural nocturne with illuminated water court and bronze louvers"
      }
    ],
    amenities: [
      "Private Deep-Water Boat Dock",
      "Basalt Heated Infinity Pool",
      "Subterranean 600-Bottle Wine Cellar",
      "Acoustic Private Cinema (Dolby Atmos)",
      "Wellness Suite with Finnish Sauna",
      "Crestron Architectural Automation",
      "Solar Microgrid & 100% Inverter Redundancy",
      "Enclosed 5-Vehicle Gallery"
    ],
    editorialStory: `The Azure Residence was conceived not merely as a home, but as an architectural observation deck calibrated to the rhythm of the Lagos Lagoon. 

Rising from a quiet promontory in Old Ikoyi, the structure is characterized by massive board-formed concrete cantilevers that appear to hover effortlessly above an expansive black basalt reflecting pool. 

Inside, an uncompromising commitment to natural materials prevails: hand-honed Roman travertine slabs underfoot, custom fluted walnut millwork, and full-height minimalist glass panels engineered to dissolve the threshold between interior luxury and the tranquil water.`,
    
    // Chapters for the "ENTER THE RESIDENCE" interactive walkthrough
    chapters: [
      {
        id: "arrival",
        title: "ARRIVAL",
        phaseNumber: "01",
        heading: "The Threshold of Solitude",
        description: "A monumental weathered bronze gate glides open to reveal a private courtyard bordered by bamboo and quiet water channels.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
        cameraFocus: { x: 0, y: 1.5, z: 9 }
      },
      {
        id: "architecture",
        title: "ARCHITECTURE",
        phaseNumber: "02",
        heading: "Monolithic Cantilevers",
        description: "Raw post-tensioned concrete beams float 6 meters outward, creating deep thermal shading and dramatic sculptural silhouettes against the sky.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
        cameraFocus: { x: -3, y: 2.8, z: 6 }
      },
      {
        id: "living",
        title: "LIVING",
        phaseNumber: "03",
        heading: "Double-Height Volume",
        description: "The 7-meter-high grand salon centers around a suspended steel hearth, offering uninterrupted 270-degree panoramas of the lagoon.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
        cameraFocus: { x: 0, y: 1.2, z: 2 }
      },
      {
        id: "culinary",
        title: "DINING & CULINARY",
        phaseNumber: "04",
        heading: "Sculptural Gastronomy",
        description: "Book-matched travertine island counter, concealed Gaggenau 400 series induction suite, and a secluded private chef preparation laboratory.",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=80",
        cameraFocus: { x: 3, y: 1.2, z: 2.5 }
      },
      {
        id: "primary",
        title: "PRIMARY SUITE",
        phaseNumber: "05",
        heading: "The Upper Sanctuary",
        description: "Occupying the entire western wing of Level 01, featuring a floating cantilevered terrace, dual boutique dressing rooms, and a sculpted marble bath.",
        image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1800&q=80",
        cameraFocus: { x: -2, y: 3.5, z: 4 }
      },
      {
        id: "private",
        title: "PRIVATE SPACES",
        phaseNumber: "06",
        heading: "Subterranean Retreat",
        description: "A private 12-seat acoustic screening room wrapped in cashmere panels, complemented by a temperature-regulated sommelier vault.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80",
        cameraFocus: { x: 0, y: -1, z: 4 }
      },
      {
        id: "amenities",
        title: "AMENITIES",
        phaseNumber: "07",
        heading: "Wellness in Stillness",
        description: "Cedar sauna, eucalyptus steam room, ice-plunge pool, and a private gym opening directly onto the tranquil bamboo court.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=80",
        cameraFocus: { x: 3.5, y: 1, z: 5 }
      },
      {
        id: "outdoor",
        title: "OUTDOOR EXPERIENCE",
        phaseNumber: "08",
        heading: "Lagoon Edge & Infinity Pool",
        description: "A 25-meter black volcanic stone infinity pool merging seamlessly with the coastal horizon, framed by a sunken bronze fire lounge.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
        cameraFocus: { x: 0, y: 0.8, z: 4.5 }
      },
      {
        id: "night",
        title: "NIGHT EXPERIENCE",
        phaseNumber: "09",
        heading: "Nocturnal Illumination",
        description: "Concealed 2700K architectural lighting accentuates the textured concrete grain and creates mirror-like reflections upon the water.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80",
        cameraFocus: { x: 0, y: 2, z: 8 }
      },
      {
        id: "specs",
        title: "PROPERTY DETAILS",
        phaseNumber: "10",
        heading: "Architectural Engineering",
        description: "Detailed blueprints, structural engineering certifications, acoustic ratings, and renewable microgrid telemetry.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
        cameraFocus: { x: 0, y: 2, z: 7 }
      },
      {
        id: "viewing",
        title: "PRIVATE VIEWING",
        phaseNumber: "11",
        heading: "Schedule Exclusive Access",
        description: "Arrange an in-person confidential tour or international VIP video consultation with the principal architect and senior client advisor.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
        cameraFocus: { x: 0, y: 2, z: 8.5 }
      }
    ],

    // Interactive Floor Plan Data
    floorPlans: [
      {
        level: "Level 0 — Ground Pavilion",
        levelCode: "L0",
        description: "Public living spaces, culinary laboratory, infinity pool, and boat dock",
        rooms: [
          { id: "foyer", name: "Grand Entrance & Water Court", area: "65 m²", desc: "Reflecting pool and bronze pivoting portal.", target3D: [0, 1.2, 7] },
          { id: "living", name: "Double-Height Grand Salon", area: "140 m²", desc: "Suspended fireplace with lagoon vista.", target3D: [0, 1.2, 2] },
          { id: "dining", name: "Formal Dining Gallery", area: "55 m²", desc: "Custom 14-seat cast bronze dining table.", target3D: [2.5, 1.2, 2.5] },
          { id: "kitchen", name: "Poliform Chef Studio & Scullery", area: "70 m²", desc: "Bookmatched travertine and Gaggenau appliances.", target3D: [3.5, 1.2, 1] },
          { id: "terrace", name: "Cantilevered Ocean Terrace", area: "180 m²", desc: "Sunken fire pit, outdoor kitchen, lounge.", target3D: [0, 0.8, -2] },
          { id: "pool", name: "Volcanic Basalt Infinity Pool", area: "120 m²", desc: "25-meter temperature controlled lap pool.", target3D: [0, 0.5, -4] }
        ]
      },
      {
        level: "Level 01 — Private Suites",
        levelCode: "L1",
        description: "Primary presidential wing, three guest suites, and sunset library",
        rooms: [
          { id: "primary-suite", name: "Primary Presidential Wing", area: "125 m²", desc: "Dual walk-in wardrobes and marble terrace.", target3D: [-2.5, 3.2, 2] },
          { id: "primary-bath", name: "Spa En-Suite Bathroom", area: "45 m²", desc: "Monolithic freestanding soaking tub.", target3D: [-3.5, 3.2, 0.5] },
          { id: "suite-2", name: "Guest Sanctuary 02", area: "50 m²", desc: "Private balcony with eastern garden view.", target3D: [2.5, 3.2, 2] },
          { id: "suite-3", name: "Guest Sanctuary 03", area: "48 m²", desc: "En-suite bathroom with skylight.", target3D: [3.2, 3.2, 0] },
          { id: "library", name: "Curator's Sky Library", area: "38 m²", desc: "Floor-to-ceiling smoked oak shelving.", target3D: [0, 3.2, 2] }
        ]
      },
      {
        level: "Level -01 — Subterranean Vault",
        levelCode: "B1",
        description: "Wellness sanctuary, acoustic cinema, sommelier vault, and collector garage",
        rooms: [
          { id: "cinema", name: "Dolby Atmos Acoustic Screening", area: "60 m²", desc: "12 custom leather reclining daybeds.", target3D: [-1.5, -1, 3] },
          { id: "wine", name: "Climate Sommelier Cellar", area: "35 m²", desc: "Custom brass racks for 600 vintage bottles.", target3D: [1.5, -1, 3] },
          { id: "spa", name: "Private Thermal Spa & Gym", area: "85 m²", desc: "Sauna, ice bath, and Technogym equipment.", target3D: [0, -1, 0] }
        ]
      }
    ]
  },

  {
    id: "ocean-house",
    slug: "ocean-house",
    title: "Ocean House",
    tagline: "Private Peninsula Sanctuary",
    subtitle: "A secluded modern estate poised on the western tip of Banana Island, commanding uninterrupted water views.",
    location: "Banana Island",
    district: "Zone A Waterfront",
    city: "Lagos",
    country: "Nigeria",
    type: "Waterfront Estate",
    listingType: "Sale",
    price: 3400000000, // ₦3.4B
    priceLabel: "₦3.4B",
    priceUsd: 2170000,
    bedrooms: 6,
    bathrooms: 7,
    internalArea: 1150,
    externalArea: 650,
    parking: 8,
    yearBuilt: 2025,
    architect: "Atelier SAOTA Studio",
    featured: true,
    status: "Exclusive Mandate",
    lifestyle: ["Waterfront Living", "Private Estates", "Penthouses"],
    heroImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
        caption: "Exterior facade featuring floating white limestone terraces"
      },
      {
        url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",
        caption: "Main architectural living lounge looking onto sunset reflection pond"
      },
      {
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
        caption: "Minimalist culinary pavilion with custom dark bronze cabinetry"
      },
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
        caption: "Nocturnal garden and infinity pool with yacht mooring"
      }
    ],
    amenities: [
      "Twin Yacht Slipways & Jet Ski Lifts",
      "Helipad Landing Rights",
      "8-Car Climate-Controlled Gallery",
      "Infinity Glass Swimming Pool",
      "Private Elevators (2)",
      "Dedicated Staff Wing (4 Suites)",
      "Solar Microgrid with Tesla Powerwalls"
    ],
    editorialStory: `Ocean House commands a rare, coveted position on Banana Island's most tranquil coastal edge. 
    
Designed with seamless indoor-outdoor transitions, the residence opens entirely to sea breezes through automated structural glazing. The materials palette honors the coastal environment with saline-resistant white limestone, rich iroko timber accents, and fluted architectural bronze screens that filter the equatorial sunlight into serene geometric shadows.`
  },

  {
    id: "meridian-penthouse",
    slug: "meridian-penthouse",
    title: "The Meridian Penthouse",
    tagline: "Sky Sanctuary Above the Atlantic",
    subtitle: "A duplex sky residence commanding 360-degree vistas across Victoria Island and the Atlantic horizon.",
    location: "Victoria Island",
    district: "Ozumba Mbadiwe Waterfront",
    city: "Lagos",
    country: "Nigeria",
    type: "Penthouse",
    listingType: "Sale",
    price: 1850000000, // ₦1.85B
    priceLabel: "₦1.85B",
    priceUsd: 1180000,
    bedrooms: 4,
    bathrooms: 5,
    internalArea: 640,
    externalArea: 220,
    parking: 4,
    yearBuilt: 2024,
    architect: "Foster + Partners Associated Design",
    featured: true,
    status: "Available",
    lifestyle: ["Penthouses", "City Living"],
    heroImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
        caption: "Duplex sky salon with cantilevered glass terrace overlooking the ocean"
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
        caption: "Sculptural spiral staircase in cast bronze and French oak"
      },
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
        caption: "Master penthouse bedroom with wraparound glass walls"
      }
    ],
    amenities: [
      "Private High-Speed Direct Elevator",
      "Heated Sky Lap Pool on 24th Floor",
      "24-Hour White-Glove Concierge",
      "Private Humidor & Tasting Salon",
      "Smart Acoustic Glass Envelope",
      "Private Residents' Heliport Access"
    ],
    editorialStory: `Suspended high above the vibrant energy of Victoria Island, The Meridian Penthouse reimagines high-altitude urban living as an oasis of quiet contemplation. 

With dramatic 6.5-meter ceilings, the double-height salon captures the shifting moods of the Atlantic Ocean from daybreak to dusk. Every finish, from custom Italian Calacatta marble to bespoke brushed gunmetal fixtures, was curated for sensory elegance.`
  },

  {
    id: "the-monolith",
    slug: "the-monolith",
    title: "The Monolith Pavilion",
    tagline: "Brutalist Elegance by the Shore",
    subtitle: "A daring minimalist composition of raw board-formed concrete, volcanic stone, and warm cedar.",
    location: "Eko Atlantic",
    district: "Marina District",
    city: "Lagos",
    country: "Nigeria",
    type: "Architectural Residence",
    listingType: "Sale",
    price: 2100000000,
    priceLabel: "₦2.1B",
    priceUsd: 1340000,
    bedrooms: 4,
    bathrooms: 5,
    internalArea: 710,
    externalArea: 320,
    parking: 4,
    yearBuilt: 2025,
    architect: "Marchese Architects & David Adjaye Alumni",
    featured: true,
    status: "Private Portfolio",
    lifestyle: ["Architectural Homes", "New Developments", "Waterfront Living"],
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
        caption: "Main architectural living pavilion with floor-to-ceiling glass"
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        caption: "Reflecting courtyard and raw board-formed concrete facade"
      }
    ],
    amenities: [
      "Geothermal Cooling & Ocean Breeze Atrium",
      "Smart Facade with Automated Solar Louvers",
      "Heated Basalt Magnesium Pool",
      "Subterranean Art Gallery",
      "EV Fast Charging Stations"
    ],
    editorialStory: `The Monolith Pavilion celebrates architectural honesty. Raw textures are elevated through precise geometries and delicate bronze detailing. 
    
The central courtyard acts as an environmental lung, pulling cool sea breezes through double-height sliding portals to naturally temper the interior climate with acoustic peace.`
  },

  {
    id: "lumina-villa",
    slug: "lumina-villa",
    title: "Lumina Glass Sanctuary",
    tagline: "Biophilic Tropical Modernism",
    subtitle: "Integrated within lush coastal gardens, featuring reflection channels and organic stone colonnades.",
    location: "Lekki",
    district: "Lekki Phase 1 Waterfront",
    city: "Lagos",
    country: "Nigeria",
    type: "Villa",
    listingType: "Sale",
    price: 1650000000,
    priceLabel: "₦1.65B",
    priceUsd: 1050000,
    bedrooms: 5,
    bathrooms: 6,
    internalArea: 920,
    externalArea: 510,
    parking: 6,
    yearBuilt: 2024,
    architect: "Studio Earthscape",
    featured: false,
    status: "Available",
    lifestyle: ["Family Homes", "Architectural Homes"],
    heroImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
        caption: "Courtyard garden with reflection channel"
      }
    ],
    amenities: [
      "Internal Rain Garden with Native Flora",
      "20m Lap Pool with Sunken Cabana",
      "Rooftop Sunset Yoga Studio",
      "Bespoke Boffi Culinary Suite"
    ],
    editorialStory: `Designed for multi-generational tranquility, Lumina balances spacious communal entertainment pavilions with deeply secluded private bedroom suites nestled behind mature tropical foliage.`
  },

  {
    id: "solaris-crest",
    slug: "solaris-crest",
    title: "Solaris Crest Villa",
    tagline: "Sunset Point on the Lagoon",
    subtitle: "A sculpted architectural landmark featuring an extraordinary cantilevered glass-bottom pool.",
    location: "Banana Island",
    district: "Waterfront Boulevard",
    city: "Lagos",
    country: "Nigeria",
    type: "Villa",
    listingType: "Rent",
    price: 180000000, // ₦180M/year rental
    priceLabel: "₦180M / year",
    priceUsd: 115000,
    bedrooms: 5,
    bathrooms: 6,
    internalArea: 890,
    externalArea: 410,
    parking: 5,
    yearBuilt: 2023,
    architect: "Arch-Design International",
    featured: false,
    status: "Available",
    lifestyle: ["Waterfront Living", "Private Estates"],
    heroImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=85",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
        caption: "Sunset terrace with infinity water margin"
      }
    ],
    amenities: [
      "Glass-Bottom Cantilevered Pool",
      "Private Dock with Shore Power",
      "Executive Boardroom & Home Office Suite",
      "Full Security & Biometric Access"
    ],
    editorialStory: `Positioned to capture the legendary golden hour of Lagos Lagoon, Solaris Crest offers refined privacy combined with effortless waterside entertaining.`
  }
];

export const LIFESTYLE_CATEGORIES = [
  {
    id: "waterfront",
    name: "Waterfront Living",
    count: 4,
    description: "Private docks, boundless marine horizons, and coastal breezes.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "architectural",
    name: "Architectural Homes",
    count: 5,
    description: "Visionary concrete, timber, and glass structures by master architects.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "penthouses",
    name: "Sky Penthouses",
    count: 2,
    description: "Duplex sky sanctuaries commanding 360-degree metropolitan panoramas.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "estates",
    name: "Private Estates",
    count: 3,
    description: "Gated acreage, extensive wellness suites, and sovereign tranquility.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80"
  }
];

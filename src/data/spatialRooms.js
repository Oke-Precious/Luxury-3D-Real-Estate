/**
 * Centralized Spatial Rooms Graph & Camera Coordinates
 * For the flagship demonstration residence: THE AURELIA RESIDENCE (Architectural Digital Twin)
 * Every room has physical coordinates, camera targets, and architectural connections.
 */

export const SPATIAL_ROOMS = [
  {
    id: "exterior",
    name: "Architectural Exterior",
    shortLabel: "Arrival",
    floor: "ground",
    floorNumber: 0,
    cameraPosition: [0, 3.8, 14.5],
    cameraTarget: [0, 1.4, 0],
    fov: 46,
    description: "Monolithic cantilevered volume and basalt reflecting margin viewed from the approach court.",
    connections: [
      { roomId: "entrance", label: "Grand Entrance Portal", pos: [0, 1.0, 7.2] },
      { roomId: "pool", label: "Basalt Infinity Margin", pos: [0, 0.4, 4.0] }
    ],
    hotspots: [
      {
        id: "cantilever-facade",
        title: "Post-Tensioned Concrete Cantilever",
        material: "Board-Formed White Concrete",
        desc: "Structural 6-meter cantilever creating passive solar shading and a floating architectural silhouette.",
        pos: [-2.8, 3.2, 4.0]
      },
      {
        id: "reflecting-court",
        title: "Basalt Reflection Margin",
        material: "Volcanic Basalt & Rainwater Recirculation",
        desc: "Integrated water basin tempering the microclimate through passive evaporative cooling.",
        pos: [0, 0.1, 4.5]
      }
    ]
  },

  {
    id: "entrance",
    name: "Grand Entrance Portal",
    shortLabel: "Entrance",
    floor: "ground",
    floorNumber: 0,
    cameraPosition: [0, 1.4, 7.2],
    cameraTarget: [0, 1.3, 2.5],
    fov: 48,
    description: "Weathered bronze pivot door opening onto the water court and transition vestibule.",
    connections: [
      { roomId: "foyer", label: "Step Inside to Foyer", pos: [-0.6, 1.2, 3.8] },
      { roomId: "exterior", label: "Return to Exterior Courtyard", pos: [0, 2.0, 12.0] }
    ],
    hotspots: [
      {
        id: "pivot-door",
        title: "Oversized Cast Bronze Pivot Portal",
        material: "Patinated Architectural Bronze",
        desc: "3.4-meter single-slab bronze pivot door with concealed magnetic bearings and biometric latch.",
        pos: [-0.8, 1.4, 4.5]
      }
    ]
  },

  {
    id: "foyer",
    name: "Grand Foyer & Gallery",
    shortLabel: "Foyer",
    floor: "ground",
    floorNumber: 0,
    cameraPosition: [-0.8, 1.3, 4.0],
    cameraTarget: [1.2, 1.1, 1.0],
    fov: 50,
    description: "Double-height atrium lined with honed travertine and sculptural fluted oak screens.",
    connections: [
      { roomId: "living", label: "Grand Living Salon", pos: [1.5, 1.2, 1.8] },
      { roomId: "staircase", label: "Upper Floor Staircase", pos: [-1.2, 1.6, 1.5] },
      { roomId: "entrance", label: "Entrance Portal", pos: [0, 1.2, 6.5] }
    ],
    hotspots: [
      {
        id: "travertine-spine",
        title: "Continuous Travertine Spine Wall",
        material: "Unpolished Roman Travertine",
        desc: "Hand-quarried travertine core running the entire longitudinal axis of the residence.",
        pos: [-1.2, 1.5, 2.0]
      },
      {
        id: "skylight-atrium",
        title: "Double-Height Light Chasm",
        material: "Electrochromic Acoustic Glass",
        desc: "7-meter vertical void funneling diffuse zenithal daylight into the central circulation core.",
        pos: [-0.5, 3.5, 2.5]
      }
    ]
  },

  {
    id: "living",
    name: "Grand Living Salon",
    shortLabel: "Living",
    floor: "ground",
    floorNumber: 0,
    cameraPosition: [1.8, 1.25, 2.2],
    cameraTarget: [1.5, 1.0, -1.2],
    fov: 48,
    description: "Expansive 140 m² living pavilion featuring floor-to-ceiling glazing and suspended fireplace.",
    connections: [
      { roomId: "dining", label: "Dining & Culinary Studio", pos: [2.5, 1.2, -1.2] },
      { roomId: "terrace", label: "Outdoor Sunken Terrace", pos: [3.4, 0.9, 2.0] },
      { roomId: "foyer", label: "Return to Foyer", pos: [-0.8, 1.2, 3.8] }
    ],
    hotspots: [
      {
        id: "fireplace",
        title: "Suspended Steel Hearth",
        material: "Blackened Rolled Steel",
        desc: "Minimalist suspended fireplace with 360-degree bio-ethanol flame and flue integrated into roof slab.",
        pos: [1.2, 0.8, 0.2]
      },
      {
        id: "glazing-system",
        title: "Minimal Frame Glazing",
        material: "Triple Low-E Acoustic Glass",
        desc: "Recessed sill-less sliding glass walls opening effortlessly to merge interior with terrace.",
        pos: [2.8, 1.6, 1.0]
      }
    ]
  },

  {
    id: "dining",
    name: "Formal Dining & Wine Vault",
    shortLabel: "Dining",
    floor: "ground",
    floorNumber: 0,
    cameraPosition: [2.4, 1.2, -1.0],
    cameraTarget: [1.0, 1.1, -1.2],
    fov: 48,
    description: "Sculptural dining gallery accommodating 14 guests, adjacent to the wine tasting alcove.",
    connections: [
      { roomId: "kitchen", label: "Poliform Chef Studio", pos: [3.2, 1.2, 0.5] },
      { roomId: "living", label: "Living Salon", pos: [1.8, 1.2, 1.5] }
    ],
    hotspots: [
      {
        id: "dining-plinth",
        title: "Custom Cast Bronze Dining Plinth",
        material: "Solid Bronze & Smoked Oak",
        desc: "One-of-a-kind dining installation weighing 1.2 tonnes, engineered to cantilever from a single central pylon.",
        pos: [1.2, 0.7, -1.2]
      }
    ]
  },

  {
    id: "kitchen",
    name: "Poliform Culinary Studio",
    shortLabel: "Kitchen",
    floor: "ground",
    floorNumber: 0,
    cameraPosition: [3.5, 1.2, 0.4],
    cameraTarget: [1.8, 1.1, 0.2],
    fov: 48,
    description: "Monolithic travertine kitchen island with concealed Gaggenau induction and back preparation scullery.",
    connections: [
      { roomId: "dining", label: "Formal Dining Gallery", pos: [2.2, 1.2, -1.2] },
      { roomId: "terrace", label: "Alfresco Dining Terrace", pos: [3.2, 0.9, 2.2] }
    ],
    hotspots: [
      {
        id: "island",
        title: "Monolithic Travertine Island",
        material: "Honed Roman Travertine",
        desc: "Seamless 4.8m stone block incorporating flush induction cooking zones and concealed touch controls.",
        pos: [2.2, 0.8, 0.2]
      },
      {
        id: "appliances",
        title: "Gaggenau 400 Series Suite",
        material: "Brushed Gunmetal & Glass",
        desc: "Handleless motorized appliance doors, sous-vide vacuum drawer, and combi-steam ovens.",
        pos: [3.2, 1.4, -0.6]
      }
    ]
  },

  {
    id: "terrace",
    name: "Lagoon Sunken Terrace",
    shortLabel: "Terrace",
    floor: "ground",
    floorNumber: 0,
    cameraPosition: [3.6, 0.9, 2.6],
    cameraTarget: [0.5, 0.5, 3.6],
    fov: 50,
    description: "Cantilevered travertine deck with sunken circular fire lounge and outdoor cooking pavilion.",
    connections: [
      { roomId: "pool", label: "Infinity Pool Edge", pos: [0.5, 0.5, 4.0] },
      { roomId: "living", label: "Step Inside to Living Salon", pos: [1.8, 1.2, 1.8] }
    ],
    hotspots: [
      {
        id: "fire-pit",
        title: "Sunken Fire Sanctuary",
        material: "Volcanic Basalt & Lava Stone",
        desc: "Recessed circular conversation pit with automated gas flame burner and weatherproof cashmere seating.",
        pos: [2.8, 0.3, 3.2]
      }
    ]
  },

  {
    id: "pool",
    name: "Basalt Infinity Margin",
    shortLabel: "Pool",
    floor: "ground",
    floorNumber: 0,
    cameraPosition: [0, 0.7, 4.8],
    cameraTarget: [0, 0.3, 1.5],
    fov: 52,
    description: "25-meter temperature-controlled basalt lap pool disappearing seamlessly into the coastal horizon.",
    connections: [
      { roomId: "terrace", label: "Sunken Fire Terrace", pos: [3.2, 0.8, 2.8] },
      { roomId: "exterior", label: "Exterior Approach", pos: [0, 3.5, 14.0] }
    ],
    hotspots: [
      {
        id: "infinity-weir",
        title: "Perimeter Overflow Weir",
        material: "Flamed Nero Assoluto Granite",
        desc: "Zero-edge hydraulic overflow system creating an undisturbed mirror-smooth surface.",
        pos: [0, 0.2, 4.2]
      }
    ]
  },

  {
    id: "staircase",
    name: "Architectural Staircase",
    shortLabel: "Stairs",
    floor: "level1",
    floorNumber: 1,
    cameraPosition: [-1.2, 2.2, 1.6],
    cameraTarget: [-1.8, 2.9, 0.4],
    fov: 48,
    description: "Floating cantilevered timber treads with recessed bronze handrail and overhead skylight.",
    connections: [
      { roomId: "upper_landing", label: "Upper Gallery Landing", pos: [-1.2, 3.2, 1.8] },
      { roomId: "foyer", label: "Descend to Ground Foyer", pos: [-0.8, 1.2, 4.0] }
    ],
    hotspots: [
      {
        id: "floating-treads",
        title: "Cantilevered Smoked Oak Treads",
        material: "Solid Smoked Oak & Steel Anchors",
        desc: "Individual stair treads cantilevered directly out of the reinforced concrete spine wall without stringers.",
        pos: [-1.4, 2.0, 1.2]
      }
    ]
  },

  {
    id: "upper_landing",
    name: "Level 01 Curator Gallery",
    shortLabel: "Gallery",
    floor: "level1",
    floorNumber: 1,
    cameraPosition: [-1.0, 3.3, 1.8],
    cameraTarget: [-2.2, 3.3, 0.8],
    fov: 48,
    description: "Mezzanine gallery overlooking the grand salon and providing access to bedroom suites.",
    connections: [
      { roomId: "primary_suite", label: "Primary Sky Suite", pos: [-2.2, 3.3, 0.8] },
      { roomId: "private_terrace", label: "Upper Sunset Balcony", pos: [1.5, 3.3, 2.8] },
      { roomId: "staircase", label: "Descend to Ground Floor", pos: [-1.2, 2.0, 1.6] }
    ],
    hotspots: [
      {
        id: "mezzanine-glass",
        title: "Structural Glass Mezzanine Rail",
        material: "Laminated SentryGlas",
        desc: "Seamless frameless glass barrier providing clear sightlines down into the double-height living salon.",
        pos: [0.5, 3.2, 1.5]
      }
    ]
  },

  {
    id: "primary_suite",
    name: "Primary Sky Suite",
    shortLabel: "Primary Suite",
    floor: "level1",
    floorNumber: 1,
    cameraPosition: [-2.4, 3.4, 1.4],
    cameraTarget: [-1.0, 3.3, 2.8],
    fov: 46,
    description: "Master sanctuary cantilevered dramatically over the garden with panoramic corner ocean glazing.",
    connections: [
      { roomId: "private_terrace", label: "Private Sunset Balcony", pos: [1.2, 3.3, 2.8] },
      { roomId: "upper_landing", label: "Return to Upper Gallery", pos: [-1.0, 3.3, 1.8] }
    ],
    hotspots: [
      {
        id: "corner-glazing",
        title: "Structural Corner Glass Miter",
        material: "Mullion-Free Glass Miter",
        desc: "Post-less structural corner glass dissolving the visual corner for unobstructed ocean horizon views.",
        pos: [-1.2, 3.6, 2.8]
      },
      {
        id: "timber-headboard",
        title: "Acoustic Fluted Timber Wall",
        material: "Quarter-Cut Walnut Ribs",
        desc: "Bespoke acoustic paneling with integrated brass reading fixtures and hidden dressing room entry.",
        pos: [-2.4, 3.6, 0.2]
      }
    ]
  },

  {
    id: "private_terrace",
    name: "Upper Cantilever Balcony",
    shortLabel: "Sky Terrace",
    floor: "level1",
    floorNumber: 1,
    cameraPosition: [1.8, 3.4, 2.8],
    cameraTarget: [0, 3.3, 0],
    fov: 50,
    description: "Elevated outdoor observation terrace overlooking the pool, lagoon, and sunset horizon.",
    connections: [
      { roomId: "primary_suite", label: "Primary Suite", pos: [-2.0, 3.3, 1.0] },
      { roomId: "upper_landing", label: "Upper Gallery", pos: [-1.0, 3.3, 1.8] }
    ],
    hotspots: [
      {
        id: "cantilever-deck",
        title: "Post-Tensioned Concrete Balcony",
        material: "Exposed Architectural Concrete",
        desc: "Slender 220mm concrete projection hovering 3.5m above the ground reflecting pool.",
        pos: [1.5, 3.2, 3.0]
      }
    ]
  }
];

/**
 * Curated Guided Chapters for Mode 1 (Guided Experience)
 */
export const GUIDED_CHAPTERS = [
  { id: "exterior", roomId: "exterior", chapterNumber: "01", title: "ARRIVAL", subtitle: "Approach Across the Water Margin" },
  { id: "entrance", roomId: "entrance", chapterNumber: "02", title: "ENTRANCE", subtitle: "Bronze Pivot Threshold" },
  { id: "foyer", roomId: "foyer", chapterNumber: "03", title: "FOYER", subtitle: "The Double-Height Travertine Core" },
  { id: "living", roomId: "living", chapterNumber: "04", title: "LIVING", subtitle: "The 140 m² Grand Salon" },
  { id: "dining", roomId: "dining", chapterNumber: "05", title: "DINING", subtitle: "Cast Bronze Banquet Plinth" },
  { id: "kitchen", roomId: "kitchen", chapterNumber: "06", title: "KITCHEN", subtitle: "Poliform Culinary Laboratory" },
  { id: "staircase", roomId: "staircase", chapterNumber: "07", title: "UPPER LEVEL", subtitle: "Cantilevered Floating Treads" },
  { id: "primary_suite", roomId: "primary_suite", chapterNumber: "08", title: "PRIMARY SUITE", subtitle: "The Cantilevered Sky Sanctuary" },
  { id: "terrace", roomId: "terrace", chapterNumber: "09", title: "OUTDOOR", subtitle: "Sunken Fire Pit & Pool Margin" },
  { id: "pool", roomId: "pool", chapterNumber: "10", title: "NIGHT POOL", subtitle: "Basalt Infinity Horizon at Dusk" }
];

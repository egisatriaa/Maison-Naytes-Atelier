export type FragranceVariant = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  accentColor: string;
  modeOverride?: 'dark' | 'light';
  sequencePath: string;
  frameCount: number;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
};

export const FRAGRANCES: FragranceVariant[] = [
  {
    id: 1,
    name: "ROSE NOIR ABSOLUE",
    subtitle: "EAU DE PARFUM",
    description: "A sensual dark floral composition blending velvety rose, warm amber, and deep woody undertones.",
    accentColor: "#8B0000", // Deep Crimson
    sequencePath: "https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/parfume/",
    frameCount: 192,
    notes: {
      top: ["Pink Pepper", "Bergamot", "Red Berries"],
      heart: ["Rose Absolue", "Blackberry", "Violet"],
      base: ["Patchouli", "Amber", "Musk"]
    }
  },
  {
    id: 2,
    name: "BLEU DE MONTREUIL",
    subtitle: "EAU DE PARFUM",
    description: "A refined aquatic French fragrance with citrus brightness, marine depth, and modern woody structure.",
    accentColor: "#003366", // Deep ocean blue
    sequencePath: "https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/parfume2/",
    frameCount: 192,
    notes: {
      top: ["Citrus Zest", "Sea Salt", "Mint"],
      heart: ["Lavender", "Driftwood", "Geranium"],
      base: ["Sandalwood", "Vetiver", "Oakmoss"]
    }
  },
  {
    id: 3,
    name: "BOIS IMPÉRIAL NUIT",
    subtitle: "EAU DE PARFUM",
    description: "A powerful woody-night composition with smoky vetiver, amber richness, and nocturnal elegance.",
    accentColor: "#191970", // Midnight blue
    sequencePath: "https://rfmtslkobdgbujmosgxw.supabase.co/storage/v1/object/public/parfume3/",
    frameCount: 192,
    notes: {
      top: ["Smoky Incense", "Black Cardamom"],
      heart: ["Vetiver", "Dark Chocolate", "Cedar"],
      base: ["Ambergris", "Tobacco Leaf", "Leather"]
    }
  }
];

export const formatFrameUrl = (path: string, index: number): string => {
  const padded = index.toString().padStart(3, '0');
  return `${path}frame_${padded}_delay-0.041s.webp`;
};

export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: 'theme_park' | 'museum' | 'nature' | 'entertainment' | 'cultural' | 'aquarium';
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  imageUrl: string;
  basePrice: number;
  currency: string;
  tags: string[];
  rating: number;
  totalReviews: number;
  capacity: number;
  openHours: Record<string, string>;
}

export const attractions: Attraction[] = [
  {
    id: 'attr_001',
    name: 'Dufan (Dunia Fantasi)',
    description: 'Jakarta\'s largest theme park with thrilling rides, family attractions, and entertainment shows at Ancol',
    category: 'theme_park',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1247,
      longitude: 106.8420
    },
    imageUrl: 'https://images.unsplash.com/photo-1594753657788-7e3791d3a475?w=800',
    basePrice: 200000,
    currency: 'IDR',
    tags: ['family-friendly', 'outdoor', 'entertainment', 'rides', 'waterfront'],
    rating: 4.3,
    totalReviews: 45230,
    capacity: 25000,
    openHours: {
      monday: '10:00-18:00',
      tuesday: '10:00-18:00',
      wednesday: '10:00-18:00',
      thursday: '10:00-18:00',
      friday: '10:00-20:00',
      saturday: '09:00-20:00',
      sunday: '09:00-20:00'
    }
  },
  {
    id: 'attr_002',
    name: 'Taman Mini Indonesia Indah (TMII)',
    description: 'Cultural park showcasing Indonesian diversity with pavilions representing all provinces, museums, and gardens',
    category: 'cultural',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.3025,
      longitude: 106.8953
    },
    imageUrl: 'https://images.unsplash.com/photo-1555881673-7e5e48f10a60?w=800',
    basePrice: 25000,
    currency: 'IDR',
    tags: ['cultural', 'educational', 'outdoor', 'family-friendly', 'museum'],
    rating: 4.4,
    totalReviews: 38900,
    capacity: 30000,
    openHours: {
      monday: '07:00-22:00',
      tuesday: '07:00-22:00',
      wednesday: '07:00-22:00',
      thursday: '07:00-22:00',
      friday: '07:00-22:00',
      saturday: '07:00-22:00',
      sunday: '07:00-22:00'
    }
  },
  {
    id: 'attr_003',
    name: 'Jakarta Aquarium & Safari',
    description: 'Modern aquarium featuring diverse marine life, interactive exhibits, and safari-themed experiences',
    category: 'aquarium',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.2254,
      longitude: 106.8209
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    basePrice: 150000,
    currency: 'IDR',
    tags: ['family-friendly', 'indoor', 'educational', 'marine-life', 'interactive'],
    rating: 4.5,
    totalReviews: 28450,
    capacity: 8000,
    openHours: {
      monday: '10:00-20:00',
      tuesday: '10:00-20:00',
      wednesday: '10:00-20:00',
      thursday: '10:00-20:00',
      friday: '10:00-21:00',
      saturday: '09:00-21:00',
      sunday: '09:00-21:00'
    }
  },
  {
    id: 'attr_004',
    name: 'Ragunan Zoo',
    description: 'One of the oldest and largest zoos in Southeast Asia with over 2,000 animals in natural habitats',
    category: 'nature',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.3106,
      longitude: 106.8201
    },
    imageUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800',
    basePrice: 5000,
    currency: 'IDR',
    tags: ['family-friendly', 'outdoor', 'nature', 'educational', 'wildlife'],
    rating: 4.2,
    totalReviews: 52100,
    capacity: 35000,
    openHours: {
      monday: 'Closed',
      tuesday: '06:00-16:00',
      wednesday: '06:00-16:00',
      thursday: '06:00-16:00',
      friday: '06:00-16:00',
      saturday: '06:00-16:30',
      sunday: '06:00-16:30'
    }
  },
  {
    id: 'attr_005',
    name: 'Museum Nasional Indonesia',
    description: 'National Museum showcasing Indonesian history, art, and culture with extensive archaeological collections',
    category: 'museum',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1762,
      longitude: 106.8227
    },
    imageUrl: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3a6?w=800',
    basePrice: 10000,
    currency: 'IDR',
    tags: ['cultural', 'educational', 'indoor', 'history', 'art'],
    rating: 4.6,
    totalReviews: 15680,
    capacity: 5000,
    openHours: {
      monday: 'Closed',
      tuesday: '08:00-16:00',
      wednesday: '08:00-16:00',
      thursday: '08:00-16:00',
      friday: '08:00-16:00',
      saturday: '08:00-16:00',
      sunday: '08:00-16:00'
    }
  },
  {
    id: 'attr_006',
    name: 'Trans Studio Cibubur',
    description: 'Indoor theme park with various rides, attractions, and entertainment zones perfect for all ages',
    category: 'theme_park',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.3716,
      longitude: 106.8945
    },
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
    basePrice: 175000,
    currency: 'IDR',
    tags: ['family-friendly', 'indoor', 'entertainment', 'rides', 'climate-controlled'],
    rating: 4.4,
    totalReviews: 32800,
    capacity: 18000,
    openHours: {
      monday: '10:00-18:00',
      tuesday: '10:00-18:00',
      wednesday: '10:00-18:00',
      thursday: '10:00-18:00',
      friday: '10:00-20:00',
      saturday: '09:00-20:00',
      sunday: '09:00-20:00'
    }
  },
  {
    id: 'attr_007',
    name: 'Kota Tua Jakarta',
    description: 'Historic old town area with colonial architecture, museums, cafes, and cultural performances',
    category: 'cultural',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1351,
      longitude: 106.8133
    },
    imageUrl: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=800',
    basePrice: 0,
    currency: 'IDR',
    tags: ['cultural', 'outdoor', 'history', 'photography', 'architecture'],
    rating: 4.3,
    totalReviews: 67500,
    capacity: 50000,
    openHours: {
      monday: '07:00-22:00',
      tuesday: '07:00-22:00',
      wednesday: '07:00-22:00',
      thursday: '07:00-22:00',
      friday: '07:00-22:00',
      saturday: '07:00-23:00',
      sunday: '07:00-23:00'
    }
  },
  {
    id: 'attr_008',
    name: 'Waterbom Jakarta',
    description: 'Premier water park with thrilling slides, lazy river, and family-friendly water attractions',
    category: 'theme_park',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.2346,
      longitude: 106.8042
    },
    imageUrl: 'https://images.unsplash.com/photo-1581361796865-2ce8a63d2e86?w=800',
    basePrice: 250000,
    currency: 'IDR',
    tags: ['family-friendly', 'outdoor', 'water-park', 'summer', 'slides'],
    rating: 4.5,
    totalReviews: 41250,
    capacity: 15000,
    openHours: {
      monday: '10:00-18:00',
      tuesday: '10:00-18:00',
      wednesday: '10:00-18:00',
      thursday: '10:00-18:00',
      friday: '10:00-19:00',
      saturday: '09:00-19:00',
      sunday: '09:00-19:00'
    }
  },
  {
    id: 'attr_009',
    name: 'Kidzania Jakarta',
    description: 'Interactive edutainment center where children can role-play various professions in a mini city',
    category: 'entertainment',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.2254,
      longitude: 106.8209
    },
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800',
    basePrice: 150000,
    currency: 'IDR',
    tags: ['family-friendly', 'indoor', 'educational', 'children', 'interactive'],
    rating: 4.7,
    totalReviews: 36900,
    capacity: 5000,
    openHours: {
      monday: '09:00-19:00',
      tuesday: '09:00-19:00',
      wednesday: '09:00-19:00',
      thursday: '09:00-19:00',
      friday: '09:00-19:00',
      saturday: '09:00-20:00',
      sunday: '09:00-20:00'
    }
  },
  {
    id: 'attr_010',
    name: 'Sea World Ancol',
    description: 'Oceanarium featuring underwater tunnel, touch pool, and various marine species from Indonesian waters',
    category: 'aquarium',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1237,
      longitude: 106.8485
    },
    imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800',
    basePrice: 120000,
    currency: 'IDR',
    tags: ['family-friendly', 'indoor', 'educational', 'marine-life', 'aquarium'],
    rating: 4.4,
    totalReviews: 29850,
    capacity: 10000,
    openHours: {
      monday: '09:00-18:00',
      tuesday: '09:00-18:00',
      wednesday: '09:00-18:00',
      thursday: '09:00-18:00',
      friday: '09:00-18:00',
      saturday: '09:00-18:00',
      sunday: '09:00-18:00'
    }
  },
  {
    id: 'attr_011',
    name: 'Museum Macan',
    description: 'Modern and contemporary art museum featuring Indonesian and international artists with rotating exhibitions',
    category: 'museum',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1701,
      longitude: 106.7950
    },
    imageUrl: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800',
    basePrice: 100000,
    currency: 'IDR',
    tags: ['cultural', 'indoor', 'art', 'modern', 'photography'],
    rating: 4.8,
    totalReviews: 18400,
    capacity: 3000,
    openHours: {
      monday: 'Closed',
      tuesday: '10:00-18:00',
      wednesday: '10:00-18:00',
      thursday: '10:00-18:00',
      friday: '10:00-18:00',
      saturday: '10:00-20:00',
      sunday: '10:00-20:00'
    }
  },
  {
    id: 'attr_012',
    name: 'Taman Impian Jaya Ancol',
    description: 'Beachfront recreation area with various attractions, restaurants, and entertainment venues by the sea',
    category: 'entertainment',
    location: {
      city: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.1239,
      longitude: 106.8396
    },
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    basePrice: 25000,
    currency: 'IDR',
    tags: ['family-friendly', 'outdoor', 'beach', 'entertainment', 'waterfront'],
    rating: 4.2,
    totalReviews: 89300,
    capacity: 100000,
    openHours: {
      monday: '06:00-18:00',
      tuesday: '06:00-18:00',
      wednesday: '06:00-18:00',
      thursday: '06:00-18:00',
      friday: '06:00-18:00',
      saturday: '06:00-18:00',
      sunday: '06:00-18:00'
    }
  }
];

export function getAttractionById(id: string): Attraction | undefined {
  return attractions.find(attr => attr.id === id);
}

export function searchAttractions(query: string): Attraction[] {
  const lowerQuery = query.toLowerCase();
  return attractions.filter(attr =>
    attr.name.toLowerCase().includes(lowerQuery) ||
    attr.description.toLowerCase().includes(lowerQuery) ||
    attr.tags.some(tag => tag.includes(lowerQuery))
  );
}

export function getAttractionsByCategory(category: string): Attraction[] {
  return attractions.filter(attr => attr.category === category);
}

export function getAttractionsByCity(city: string): Attraction[] {
  return attractions.filter(attr => attr.location.city.toLowerCase() === city.toLowerCase());
}

export function formatPrice(price: number, currency: string = 'IDR'): string {
  if (currency === 'IDR') {
    return `Rp ${price.toLocaleString('id-ID')}`;
  }
  return `${currency} ${price.toLocaleString()}`;
}

export const categories = [
  { id: 'all', label: 'All Attractions', icon: '🎯' },
  { id: 'theme_park', label: 'Theme Parks', icon: '🎢' },
  { id: 'museum', label: 'Museums', icon: '🏛️' },
  { id: 'nature', label: 'Nature & Wildlife', icon: '🌳' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎭' },
  { id: 'cultural', label: 'Cultural Sites', icon: '🕌' },
  { id: 'aquarium', label: 'Aquariums', icon: '🐠' },
];

export const cities = [
  { id: 'jakarta', label: 'Jakarta', count: 12 },
  // Add more cities as you expand
];

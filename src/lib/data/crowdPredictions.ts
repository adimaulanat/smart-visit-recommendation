export interface CrowdPrediction {
  date: string;
  level: 'low' | 'moderate' | 'high' | 'very-high';
  score: number;
  expectedVisitors: number;
  capacityPercentage: number;
  factors: string[];
}

export function generateCrowdPredictions(
  attractionId: string,
  capacity: number,
  days: number = 14
): CrowdPrediction[] {
  const predictions: CrowdPrediction[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dayOfWeek = date.getDay();

    // Base visitor calculation
    let expectedVisitors = capacity * 0.5;
    const factors: string[] = [];

    // Weekend multiplier (higher in Indonesia)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      expectedVisitors *= 1.5;
      factors.push('Weekend peak - libur akhir pekan');
    } else {
      factors.push('Weekday normal pattern');
    }

    // Friday is popular (preparing for weekend)
    if (dayOfWeek === 5) {
      expectedVisitors *= 1.3;
      factors.push('Jumat - preparing for weekend');
    }

    // Monday is typically quieter
    if (dayOfWeek === 1) {
      expectedVisitors *= 0.85;
      factors.push('Senin - mulai pekan, lebih sepi');
    }

    // Indonesian holiday detection
    const holiday = getIndonesianHoliday(date);
    if (holiday) {
      expectedVisitors *= 1.8;
      factors.push(`Libur nasional: ${holiday}`);
    }

    // School holiday periods
    if (isSchoolHoliday(date)) {
      expectedVisitors *= 1.4;
      factors.push('Libur sekolah - family season');
    }

    // Add randomness
    expectedVisitors *= (0.85 + Math.random() * 0.3);
    expectedVisitors = Math.round(expectedVisitors);

    const capacityPercentage = Math.min(100, Math.round((expectedVisitors / capacity) * 100));

    let level: 'low' | 'moderate' | 'high' | 'very-high';
    if (capacityPercentage < 40) level = 'low';
    else if (capacityPercentage < 70) level = 'moderate';
    else if (capacityPercentage < 90) level = 'high';
    else level = 'very-high';

    predictions.push({
      date: date.toISOString().split('T')[0],
      level,
      score: 100 - capacityPercentage,
      expectedVisitors,
      capacityPercentage,
      factors
    });
  }

  return predictions;
}

// Indonesian public holidays (2025)
function getIndonesianHoliday(date: Date): string | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const holidays: { [key: string]: string } = {
    '1-1': 'Tahun Baru',
    '3-29': 'Isra Mi\'raj',
    '3-31': 'Hari Raya Nyepi',
    '4-18': 'Wafat Yesus Kristus',
    '5-1': 'Hari Buruh',
    '5-29': 'Kenaikan Yesus Kristus',
    '6-1': 'Hari Pancasila',
    '8-17': 'Hari Kemerdekaan',
    '12-25': 'Hari Natal',
  };

  return holidays[`${month}-${day}`] || null;
}

// School holiday periods in Indonesia
function isSchoolHoliday(date: Date): boolean {
  const month = date.getMonth() + 1;
  // June-July and mid-December
  return (month === 6 || month === 7 || (month === 12 && date.getDate() >= 15));
}

// Peak hours for Indonesian context
export function getPeakHours(date: Date): string[] {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return ['10:00-12:00', '13:00-15:00'];
  }
  return ['15:00-17:00', '18:00-20:00'];
}

// Get crowd level text in Indonesian
export function getCrowdLevelText(level: string): string {
  const texts: { [key: string]: string } = {
    'low': 'Sepi - Waktu terbaik berkunjung',
    'moderate': 'Ramai sedang - Cukup nyaman',
    'high': 'Ramai - Perlu sabar',
    'very-high': 'Sangat ramai - Hindari jika bisa'
  };
  return texts[level] || level;
}

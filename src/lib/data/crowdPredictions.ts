import { CrowdPrediction } from '../types/recommendation';

export const generateCrowdPredictions = (attractionId: string, days: number = 7): CrowdPrediction[] => {
  const predictions: CrowdPrediction[] = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseVisitors = isWeekend ? 5000 : 3000;
    const variance = Math.random() * 2000;
    const predictedVisitors = Math.floor(baseVisitors + variance);
    
    let crowdLevel: 'low' | 'medium' | 'high';
    if (predictedVisitors < 3500) crowdLevel = 'low';
    else if (predictedVisitors < 5000) crowdLevel = 'medium';
    else crowdLevel = 'high';
    
    predictions.push({
      date: date.toISOString().split('T')[0],
      crowdLevel,
      predictedVisitors,
    });
  }
  
  return predictions;
};

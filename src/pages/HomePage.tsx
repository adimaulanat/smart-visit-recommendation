import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, CloudSun, Users, Sparkles } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-scale-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Recommendations</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Visit Smarter, Not Harder
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get personalized visit recommendations based on real-time weather, crowd predictions, and AI insights.
            </p>
            
            <Link to="/recommendations">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow">
                Start Planning Your Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CloudSun className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Weather Integration</h3>
            <p className="text-muted-foreground">
              Real-time weather forecasts help you plan the perfect visit day with ideal conditions.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Crowd Predictions</h3>
            <p className="text-muted-foreground">
              Avoid the crowds with intelligent predictions based on historical data and trends.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Get personalized recommendations powered by Google Gemini AI for the best experience.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-card rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to plan your perfect visit?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose your destination and let AI find the best time to visit.
          </p>
          <Link to="/recommendations">
            <Button size="lg" variant="secondary" className="h-12 px-8 font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

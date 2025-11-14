import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, CloudSun, Users, Sparkles, ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-scale-in hover:bg-primary/20 transition-colors cursor-default">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">AI-Powered Recommendations</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-primary bg-clip-text text-transparent leading-tight">
              Visit Smarter, Not Harder
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get personalized visit recommendations based on real-time weather, crowd predictions, and AI insights.
            </p>

            <Link to="/recommendations">
              <Button
                size="lg"
                className="group h-16 px-10 text-lg font-bold bg-primary hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-glow hover:shadow-2xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Planning Your Visit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group bg-card rounded-2xl p-8 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up border border-transparent hover:border-primary/20" style={{ animationDelay: '0.1s' }}>
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <CloudSun className="w-8 h-8 text-white group-hover:animate-pulse" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Weather Integration</h3>
            <p className="text-muted-foreground">
              Real-time weather forecasts help you plan the perfect visit day with ideal conditions.
            </p>
          </div>

          <div className="group bg-card rounded-2xl p-8 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up border border-transparent hover:border-secondary/20" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Users className="w-8 h-8 text-white group-hover:animate-pulse" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-colors">Crowd Predictions</h3>
            <p className="text-muted-foreground">
              Avoid the crowds with intelligent predictions based on historical data and trends.
            </p>
          </div>

          <div className="group bg-card rounded-2xl p-8 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-slide-up border border-transparent hover:border-accent/20" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <Calendar className="w-8 h-8 text-white group-hover:animate-pulse" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Get personalized recommendations powered by Google Gemini AI for the best experience.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-card rounded-3xl p-12 text-center shadow-xl hover:shadow-2xl transition-shadow border border-primary/10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to plan your perfect visit?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose your destination and let AI find the best time to visit.
          </p>
          <Link to="/recommendations">
            <Button
              size="lg"
              variant="secondary"
              className="group h-14 px-10 font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

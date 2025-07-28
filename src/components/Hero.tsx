import { Button } from "@/components/ui/button";
import { ArrowRight, Vote, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="AGORA - Plataforma Electoral 2025"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <div className="mb-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            AGORA
            <span className="block text-4xl md:text-5xl font-normal text-primary-glow">
              Plataforma Electoral 2025
            </span>
          </h1>
        </div>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
          Sistema integral para la gestión de campañas políticas con{" "}
          <span className="font-semibold text-primary-glow">IA avanzada</span>,{" "}
          análisis de datos en tiempo real y{" "}
          <span className="font-semibold text-primary-glow">arquitectura híbrida moderna</span>
        </p>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-soft">
            <Vote className="w-12 h-12 text-primary-glow mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Gestión Electoral</h3>
            <p className="text-white/80 text-sm">
              Herramientas completas para campañas políticas modernas
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-soft">
            <BarChart3 className="w-12 h-12 text-primary-glow mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Analytics IA</h3>
            <p className="text-white/80 text-sm">
              Análisis inteligente con Vertex AI y datos en tiempo real
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-soft">
            <Users className="w-12 h-12 text-primary-glow mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Gestión de Equipos</h3>
            <p className="text-white/80 text-sm">
              Sistema de roles jerárquico con Factory Pattern
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
            <Link to="/auth">
              Acceder al Sistema
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
            <Link to="/auth">
              Registrarse Gratis
            </Link>
          </Button>
        </div>

        {/* Technical Badge */}
        <div className="mt-12 inline-block bg-black/20 backdrop-blur-sm rounded-full px-6 py-3">
          <p className="text-sm text-white/70">
            <span className="font-semibold text-primary-glow">Arquitectura Híbrida</span> •{" "}
            Supabase + FastAPI + PostgreSQL + IA
          </p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="absolute bottom-8 left-8 right-8 z-10">
        <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-glow">35%</div>
            <div>Mejora Performance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-glow">28%</div>
            <div>Reducción Bundle</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-glow">110</div>
            <div>Niveles de Acceso</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
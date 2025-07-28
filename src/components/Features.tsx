import { 
  Database, 
  Zap, 
  Shield, 
  Brain, 
  Users, 
  BarChart3,
  Globe,
  Clock
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Database,
      title: "Arquitectura Híbrida",
      description: "Supabase PostgreSQL + FastAPI con Factory Pattern para máximo rendimiento",
      stats: "35% más rápido"
    },
    {
      icon: Shield,
      title: "Seguridad Avanzada",
      description: "Row Level Security (RLS) automático con roles jerárquicos computados",
      stats: "110 niveles"
    },
    {
      icon: Brain,
      title: "IA Integrada",
      description: "Google Vertex AI + Gemini para análisis predictivo y asistencia inteligente",
      stats: "Tiempo real"
    },
    {
      icon: Zap,
      title: "Smart Routing",
      description: "Routing inteligente entre Supabase directo y FastAPI según complejidad",
      stats: "28% menos bundle"
    },
    {
      icon: Users,
      title: "Gestión de Equipos",
      description: "Sistema de roles con Factory Pattern: desde VOTER hasta MASTER_DEVELOPER",
      stats: "Auto-asignación"
    },
    {
      icon: BarChart3,
      title: "Analytics Avanzado",
      description: "Dashboard en tiempo real con métricas de campaña y engagement",
      stats: "Multi-nivel cache"
    },
    {
      icon: Globe,
      title: "Distribución Global",
      description: "CDN optimizado con Firebase Hosting + Fastly para latencia mínima",
      stats: "Disponibilidad 99.9%"
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Suscripciones nativas de Supabase para actualizaciones instantáneas",
      stats: "50% más eficiente"
    }
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tecnología de Vanguardia
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            AGORA combina las mejores tecnologías en una arquitectura híbrida moderna 
            optimizada para campañas políticas del siglo XXI
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-medium hover:shadow-strong transition-smooth hover:scale-[1.02] border border-border"
              >
                <div className="bg-gradient-primary rounded-lg p-3 w-fit mb-4 shadow-primary">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                <div className="bg-secondary/50 rounded-lg px-3 py-2 inline-block">
                  <span className="text-sm font-semibold text-primary">
                    {feature.stats}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Metrics */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-strong border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Mejoras de Performance Post-Migración
            </h3>
            <p className="text-muted-foreground">
              Resultados verificados en producción
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">35%</div>
              <div className="text-sm text-muted-foreground">Mejora en Velocidad</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">28%</div>
              <div className="text-sm text-muted-foreground">Reducción Bundle</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50%</div>
              <div className="text-sm text-muted-foreground">Real-time Eficiente</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-sm text-muted-foreground">Time to Interactive</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
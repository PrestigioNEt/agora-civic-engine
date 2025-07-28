import { Vote, Github, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white/10 p-2 rounded-lg">
                <Vote className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-bold">AGORA</span>
                <span className="text-sm ml-2 text-primary-glow">2025</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed mb-6 max-w-md">
              Sistema integral para la gestión de campañas políticas con arquitectura híbrida moderna, 
              IA avanzada y análisis de datos en tiempo real.
            </p>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Autoría y Desarrollo:</span> Daniel Lopez (@sademarquez)</p>
              <p><span className="font-semibold">Arquitectura:</span> Hybrid Supabase + FastAPI + Factory Pattern</p>
              <p><span className="font-semibold">Estado:</span> Producción ✅</p>
            </div>
          </div>

          {/* Technical Stack */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Tecnología</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>PostgreSQL + Supabase</li>
              <li>FastAPI + Python</li>
              <li>React + TypeScript</li>
              <li>Vertex AI + Gemini</li>
              <li>Factory Pattern</li>
              <li>Real-time Updates</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Github className="w-4 h-4" />
                <span>@sademarquez</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>dalopez56740@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Chile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-glow">35%</div>
              <div className="text-xs text-primary-foreground/60">Mejora Performance</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-glow">28%</div>
              <div className="text-xs text-primary-foreground/60">Reducción Bundle</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-glow">110</div>
              <div className="text-xs text-primary-foreground/60">Niveles de Acceso</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-glow">99.9%</div>
              <div className="text-xs text-primary-foreground/60">Disponibilidad</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2025 AGORA - Plataforma Electoral. Desarrollo: Daniel Lopez (@sademarquez)
          </p>
          <p className="text-xs text-primary-foreground/40 mt-2">
            Arquitectura Híbrida: Supabase + FastAPI + Factory Pattern + Smart Routing
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
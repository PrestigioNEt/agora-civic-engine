import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Vote, 
  BarChart3, 
  Users, 
  Settings, 
  MapPin,
  Brain
} from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { name: "Territorios", icon: MapPin, href: "/territorios" },
    { name: "Equipos", icon: Users, href: "/equipos" },
    { name: "IA Assistant", icon: Brain, href: "/ia" },
    { name: "Configuración", icon: Settings, href: "/configuracion" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-primary">
              <Vote className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-primary">AGORA</span>
              <span className="text-xs text-muted-foreground ml-2">2025</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-secondary/50"
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Iniciar Sesión</Button>
            <Button variant="political">Panel de Control</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-smooth"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
              <div className="border-t border-border mt-4 pt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Iniciar Sesión
                </Button>
                <Button variant="political" className="w-full">
                  Panel de Control
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
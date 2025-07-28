import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Vote, 
  BarChart3, 
  Users, 
  Settings, 
  MapPin,
  Brain,
  LogOut,
  User
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

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
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-primary">
              <Vote className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-primary">AGORA</span>
              <span className="text-xs text-muted-foreground ml-2">2025</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user && profile && navigationItems
              .filter(item => profile.capabilities.menus.includes(item.name.toLowerCase()) || item.name === 'Dashboard')
              .map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-2 text-foreground hover:text-primary transition-smooth px-3 py-2 rounded-md hover:bg-secondary/50"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user && profile ? (
              <>
                <Badge variant="secondary" className="text-xs">
                  {profile.role}
                </Badge>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard">
                    <User className="w-4 h-4 mr-2" />
                    Panel
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">Iniciar Sesión</Link>
                </Button>
                <Button variant="political" asChild>
                  <Link to="/auth">Registrarse</Link>
                </Button>
              </>
            )}
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
              {user && profile && (
                <div className="px-4 py-2 bg-secondary/30 rounded-lg mx-4 mb-4">
                  <p className="text-sm font-medium text-foreground">
                    {profile.full_name || profile.email}
                  </p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {profile.role}
                  </Badge>
                </div>
              )}
              
              {user && profile ? (
                <>
                  {navigationItems
                    .filter(item => profile.capabilities.menus.includes(item.name.toLowerCase()) || item.name === 'Dashboard')
                    .map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center space-x-3 px-4 py-3 text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-smooth"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                  <div className="border-t border-border mt-4 pt-4 space-y-2">
                    <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </div>
                </>
              ) : (
                <div className="border-t border-border mt-4 pt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      Iniciar Sesión
                    </Link>
                  </Button>
                  <Button variant="political" className="w-full" asChild>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      Registrarse
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
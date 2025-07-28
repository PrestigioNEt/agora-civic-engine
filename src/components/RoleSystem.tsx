import { 
  Crown, 
  Shield, 
  MapPin, 
  Users, 
  Heart, 
  UserCheck,
  ChevronRight,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";

const RoleSystem = () => {
  const roles = [
    {
      name: "MASTER_DEVELOPER",
      level: 110,
      icon: Crown,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description: "Acceso completo + herramientas de desarrollo",
      features: [
        "Control total del sistema",
        "Herramientas de desarrollo",
        "Gestión de infraestructura",
        "Analytics completos"
      ],
      autoAssigned: ["dalopez56740@gmail.com", "bastianvalenciago@gmail.com"]
    },
    {
      name: "ADMIN",
      level: 100,
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      description: "Funciones administrativas completas",
      features: [
        "Gestión de usuarios",
        "Configuración de campaña",
        "Reportes avanzados",
        "Gestión de territorios"
      ]
    },
    {
      name: "COORDINATOR",
      level: 70,
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Coordinación regional y gestión de territorios",
      features: [
        "Gestión territorial",
        "Coordinación regional",
        "Reportes territoriales",
        "Gestión de equipos locales"
      ]
    },
    {
      name: "LEADER",
      level: 50,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Liderazgo local y gestión de equipos",
      features: [
        "Gestión de voluntarios",
        "Coordinación local",
        "Reportes de actividad",
        "Organización de eventos"
      ]
    },
    {
      name: "VOLUNTEER",
      level: 30,
      icon: Heart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description: "Funciones de voluntario y soporte básico",
      features: [
        "Registro de actividades",
        "Soporte básico",
        "Participación en eventos",
        "Comunicación con equipo"
      ]
    },
    {
      name: "VOTER",
      level: 10,
      icon: UserCheck,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      description: "Acceso básico de usuario",
      features: [
        "Consulta de información",
        "Participación en encuestas",
        "Acceso a noticias",
        "Registro básico"
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-gradient-primary rounded-lg p-3 w-fit mx-auto mb-6 shadow-primary">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sistema de Roles con Factory Pattern
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Gestión jerárquica automatizada con capacidades computadas en PostgreSQL. 
            Cada rol obtiene automáticamente permisos, funciones y límites específicos.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <div
                key={index}
                className={`bg-card rounded-xl p-6 shadow-medium hover:shadow-strong transition-smooth hover:scale-[1.02] border-2 ${role.borderColor}`}
              >
                <div className={`${role.bgColor} rounded-lg p-3 w-fit mb-4`}>
                  <Icon className={`w-6 h-6 ${role.color}`} />
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-foreground">
                    {role.name}
                  </h3>
                  <span className={`text-sm font-bold px-2 py-1 rounded ${role.bgColor} ${role.color}`}>
                    Nivel {role.level}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {role.description}
                </p>
                
                <ul className="space-y-2">
                  {role.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {role.autoAssigned && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs font-semibold text-primary mb-1">Auto-asignación:</p>
                    {role.autoAssigned.map((email, emailIndex) => (
                      <p key={emailIndex} className="text-xs text-primary/80 font-mono">
                        {email}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Factory Pattern Explanation */}
        <div className="bg-gradient-card rounded-2xl p-8 shadow-strong border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Factory Pattern en PostgreSQL
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                El sistema utiliza columnas computadas automáticamente para asignar 
                capacidades, permisos y configuraciones específicas basadas en el rol del usuario.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-sm text-foreground">Jerarquía automática (10-110)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-sm text-foreground">Capacidades JSON auto-generadas</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-sm text-foreground">RLS policies automáticas</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-sm text-foreground">Sin overhead de aplicación</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-soft border border-border">
              <h4 className="font-semibold text-foreground mb-3">Ejemplo JSON Auto-generado:</h4>
              <pre className="bg-muted/50 rounded-lg p-4 text-xs overflow-x-auto">
{`{
  "permissions": ["user.read", "territory.update"],
  "features": ["ai_assistant", "real_time"],
  "menus": ["dashboard", "territories"],
  "dashboard": {
    "layout": "coordinator",
    "refreshInterval": 15000
  },
  "limits": {
    "maxUsers": 100,
    "apiCallsPerHour": 1000
  }
}`}
              </pre>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button variant="political" size="lg">
              Ver Documentación Técnica
            </Button>
            <Button variant="outline" size="lg">
              Probar Sistema de Roles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleSystem;
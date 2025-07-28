import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Crown, 
  Shield, 
  MapPin, 
  Users, 
  Heart, 
  UserCheck,
  BarChart3,
  Settings,
  LogOut,
  Loader2
} from 'lucide-react';

const Dashboard = () => {
  const { user, profile, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/auth" replace />;
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'MASTER_DEVELOPER': return Crown;
      case 'ADMIN': return Shield;
      case 'COORDINATOR': return MapPin;
      case 'LEADER': return Users;
      case 'VOLUNTEER': return Heart;
      case 'VOTER': return UserCheck;
      default: return UserCheck;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'MASTER_DEVELOPER': return 'bg-yellow-500 text-yellow-50';
      case 'ADMIN': return 'bg-red-500 text-red-50';
      case 'COORDINATOR': return 'bg-blue-500 text-blue-50';
      case 'LEADER': return 'bg-green-500 text-green-50';
      case 'VOLUNTEER': return 'bg-purple-500 text-purple-50';
      case 'VOTER': return 'bg-gray-500 text-gray-50';
      default: return 'bg-gray-500 text-gray-50';
    }
  };

  const RoleIcon = getRoleIcon(profile.role);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-white shadow-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-primary p-2 rounded-lg shadow-primary">
                <RoleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Panel de Control AGORA
                </h1>
                <p className="text-muted-foreground">
                  Bienvenido/a, {profile.full_name || profile.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className={getRoleColor(profile.role)}>
                {profile.role} - Nivel {profile.hierarchy}
              </Badge>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RoleIcon className="w-6 h-6" />
              <span>Información del Usuario</span>
            </CardTitle>
            <CardDescription>
              Detalles de tu perfil y permisos en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Información Personal</h3>
                <p className="text-sm text-muted-foreground">Email: {profile.email}</p>
                <p className="text-sm text-muted-foreground">
                  Nombre: {profile.full_name || 'No especificado'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Miembro desde: {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Rol y Jerarquía</h3>
                <p className="text-sm text-muted-foreground">Rol: {profile.role}</p>
                <p className="text-sm text-muted-foreground">Nivel: {profile.hierarchy}</p>
                <p className="text-sm text-muted-foreground">
                  Llamadas API/hora: {profile.capabilities.limits.apiCallsPerHour}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Capacidades</h3>
                <p className="text-sm text-muted-foreground">
                  Permisos: {profile.capabilities.permissions.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Funciones: {profile.capabilities.features.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Menús: {profile.capabilities.menus.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Permisos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.capabilities.permissions.map((permission, index) => (
                  <Badge key={index} variant="secondary">
                    {permission}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Funciones Disponibles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.capabilities.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Menus */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Menús Accesibles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.capabilities.menus.map((menu, index) => (
                  <Badge key={index} variant="default">
                    {menu}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Role Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RoleIcon className="w-5 h-5" />
                <span>Acciones Disponibles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.capabilities.menus.includes('dashboard') && (
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Ver Dashboard
                  </Button>
                )}
                {profile.capabilities.menus.includes('territories') && (
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Gestionar Territorios
                  </Button>
                )}
                {profile.capabilities.menus.includes('team') && (
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Administrar Equipos
                  </Button>
                )}
                {profile.capabilities.menus.includes('admin') && (
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Panel de Administración
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
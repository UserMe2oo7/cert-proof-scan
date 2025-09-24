import { Shield, FileCheck, Users, Menu, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">EduAuth Validator</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            <FileCheck className="h-4 w-4" />
            <span>Validate</span>
          </button>
          {user?.role === 'admin' && (
            <button 
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Admin</span>
            </button>
          )}
        </nav>

        <div className="flex items-center space-x-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user.fullName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/')}>
                  <FileCheck className="mr-2 h-4 w-4" />
                  Validate
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <Users className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate('/auth')} variant="outline">
              Login
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/')}>
                <FileCheck className="mr-2 h-4 w-4" />
                Validate
              </DropdownMenuItem>
              {user?.role === 'admin' && (
                <DropdownMenuItem onClick={() => navigate('/admin')}>
                  <Users className="mr-2 h-4 w-4" />
                  Admin
                </DropdownMenuItem>
              )}
              {user && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
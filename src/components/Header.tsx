import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-gradient-card shadow-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-elegant">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EduAuth Validator</h1>
              <p className="text-sm text-muted-foreground">Certificate Verification System</p>
            </div>
          </div>
          <nav className="flex space-x-6">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              Verify
            </a>
            <a href="/admin" className="text-foreground hover:text-primary transition-colors">
              Admin
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
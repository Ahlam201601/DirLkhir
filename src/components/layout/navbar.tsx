import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth/get-session";
import { NavbarSignOut } from "./navbar-signout";
import { Home, PlusCircle, User, LogIn, UserPlus, HandHeart, MapPin, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export async function Navbar() {
  const session = await getServerSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto flex h-18 items-center justify-between px-6">
        {/* Advanced Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-105">
              <HandHeart className="w-6 h-6" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-primary to-primary/70 rounded-full shadow-lg animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
              Dir-Lkhir
            </span>
            <span className="text-xs text-muted-foreground font-medium tracking-wide">
              Solidarité Marocaine
            </span>
          </div>
        </Link>

        {/* Advanced Navigation */}
        <nav className="flex items-center gap-1">
          {session ? (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="h-10 px-4 hover:bg-primary/5 hover:text-primary transition-all duration-200 rounded-lg font-medium"
              >
                <Link href="/proposer-un-besoin" className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>Proposer</span>
                </Link>
              </Button>
              
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="h-10 px-3 hover:bg-primary/5 transition-all duration-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-foreground hidden sm:block">
                        {session.user.name || session.user.email?.split('@')[0]}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 border-b">
                    <p className="text-sm font-medium text-foreground">
                      {session.user.name || session.user.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.user.email}
                    </p>
                  </div>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/mon-espace" className="flex items-center gap-2 w-full">
                      <User className="w-4 h-4" />
                      <span>Mon espace</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                    <NavbarSignOut />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="h-10 px-4 hover:bg-primary/5 hover:text-primary transition-all duration-200 rounded-lg font-medium"
              >
                <Link href="/login" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  <span>Connexion</span>
                </Link>
              </Button>
              <Button 
                size="sm" 
                asChild
                className="h-10 px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-primary/25 transition-all duration-300 rounded-lg font-medium"
              >
                <Link href="/register" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Inscription</span>
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

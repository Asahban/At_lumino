
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Shield, ArrowLeft, Mail, LockKeyhole, User, Store, Gem } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

// User type definition
type UserType = 'customer' | 'retailer';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [retailerStoreNow, setRetailerStoreNow] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkSession();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate('/');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in.",
      });
      
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in. Please try again.');
      toast({
        title: "Sign in failed",
        description: error.message || 'Failed to sign in. Please try again.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Prepare user metadata based on user type
      const metadata = {
        full_name: name,
        user_type: userType
      };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) throw error;
      
      if (userType === 'retailer' && retailerStoreNow === true) {
        navigate('/store-registration');
      } else {
        toast({
          title: "Account created!",
          description: "Your account has been successfully created.",
        });
        navigate('/');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to create account. Please try again.');
      toast({
        title: "Sign up failed",
        description: error.message || 'Failed to create account. Please try again.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`
        }
      });
      
      if (error) throw error;
      
      // The redirect happens automatically, no need to navigate
    } catch (error: any) {
      setError(error.message || 'Failed to authenticate with Google. Please try again.');
      toast({
        title: "Google sign-in failed",
        description: error.message || 'Failed to authenticate with Google. Please try again.',
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Continue to user type selection or retailer store options
  const handleContinue = () => {
    if (userType === 'retailer') {
      setRetailerStoreNow(null);
    } else {
      // If customer, proceed with signup
      handleSignUp({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </button>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gold/20 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-gold" />
                </div>
                <h1 className="text-2xl font-serif font-bold">
                  Welcome to Atlumino
                </h1>
                <p className="text-graphite/70 mt-1">
                  The gold standard in jewelry price transparency
                </p>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <Tabs value={authTab} onValueChange={(value) => setAuthTab(value as 'signin' | 'signup')}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="signin-email" 
                          type="email" 
                          placeholder="you@example.com" 
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="signin-password">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-gold hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="signin-password" 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full bg-gold hover:bg-gold-dark" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gold/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full border-gold/20 hover:bg-gold/5"
                      onClick={handleGoogleAuth}
                      disabled={loading}
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Sign in with Google
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-gold/20 hover:bg-gold/5"
                      disabled={loading}
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                      Sign in with Facebook
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="signup">
                  {/* Step 1: Account Type Selection */}
                  {userType === null && (
                    <div className="space-y-6">
                      <p className="text-center text-muted-foreground">
                        Please select your account type to continue
                      </p>
                      
                      <RadioGroup 
                        defaultValue="customer" 
                        className="grid grid-cols-2 gap-4"
                        onValueChange={(value) => setUserType(value as UserType)}
                      >
                        <div>
                          <RadioGroupItem 
                            value="customer" 
                            id="customer" 
                            className="peer sr-only" 
                          />
                          <Label 
                            htmlFor="customer" 
                            className="flex flex-col items-center justify-between rounded-xl border-2 border-gold/20 bg-white p-6 hover:bg-gold/5 peer-data-[state=checked]:border-gold [&:has([data-state=checked])]:border-gold"
                          >
                            <User className="mb-3 h-6 w-6 text-gold" />
                            <span className="text-base font-medium">Customer</span>
                            <span className="text-xs text-center text-muted-foreground mt-2">
                              Looking for jewelry or comparing prices
                            </span>
                          </Label>
                        </div>
                        
                        <div>
                          <RadioGroupItem 
                            value="retailer" 
                            id="retailer" 
                            className="peer sr-only" 
                          />
                          <Label 
                            htmlFor="retailer" 
                            className="flex flex-col items-center justify-between rounded-xl border-2 border-gold/20 bg-white p-6 hover:bg-gold/5 peer-data-[state=checked]:border-gold [&:has([data-state=checked])]:border-gold"
                          >
                            <Store className="mb-3 h-6 w-6 text-gold" />
                            <span className="text-base font-medium">Retailer</span>
                            <span className="text-xs text-center text-muted-foreground mt-2">
                              Jewelry store or brand owner
                            </span>
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      <Button 
                        className="w-full bg-gold hover:bg-gold-dark"
                        onClick={() => handleContinue()}
                        disabled={!userType}
                      >
                        Continue
                      </Button>
                    </div>
                  )}
                  
                  {/* Step 2: Retailer Store Options */}
                  {userType === 'retailer' && retailerStoreNow === null && (
                    <div className="space-y-6">
                      <div className="bg-gold/5 border border-gold/20 rounded-lg p-4 text-center">
                        <Store className="h-8 w-8 text-gold mx-auto mb-2" />
                        <h3 className="font-medium text-lg">Would you like to register your store now?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          You can set up your store profile immediately or add it later from your account settings.
                        </p>
                        
                        <div className="flex justify-center gap-4">
                          <Button 
                            variant="outline" 
                            className="border-gold/20 hover:bg-gold/5"
                            onClick={() => setRetailerStoreNow(false)}
                          >
                            Register Later
                          </Button>
                          
                          <Button 
                            className="bg-gold hover:bg-gold-dark"
                            onClick={() => setRetailerStoreNow(true)}
                          >
                            Register Now
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        className="w-auto p-0 h-auto text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          setUserType(null);
                          setRetailerStoreNow(null);
                        }}
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to user type selection
                      </Button>
                    </div>
                  )}
                  
                  {/* Step 3: Signup Form (For both customer and retailer who chose "register later") */}
                  {(userType === 'customer' || (userType === 'retailer' && retailerStoreNow !== null)) && (
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-name" 
                            type="text" 
                            placeholder="John Doe" 
                            className="pl-10"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-email" 
                            type="email" 
                            placeholder="you@example.com" 
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-password" 
                            type="password" 
                            placeholder="••••••••" 
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Password must be at least 6 characters long
                        </p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gold hover:bg-gold-dark"
                        disabled={loading}
                      >
                        {loading ? "Creating account..." : "Create Account"}
                      </Button>
                      
                      {userType === 'retailer' && (
                        <Button 
                          variant="ghost" 
                          className="w-auto p-0 h-auto text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            setRetailerStoreNow(null);
                          }}
                          type="button"
                        >
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          Back to store options
                        </Button>
                      )}
                    </form>
                  )}
                  
                  {/* Authentication options */}
                  {(userType === 'customer' || (userType === 'retailer' && retailerStoreNow !== null)) && (
                    <>
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gold/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-2 bg-white text-muted-foreground">Or sign up with</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full border-gold/20 hover:bg-gold/5"
                          onClick={handleGoogleAuth}
                          disabled={loading}
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                          Sign up with Google
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full border-gold/20 hover:bg-gold/5"
                          disabled={loading}
                        >
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                          </svg>
                          Sign up with Facebook
                        </Button>
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                {authTab === 'signin' ? (
                  <>
                    Don't have an account?{" "}
                    <button 
                      className="text-gold hover:underline font-medium"
                      onClick={() => {
                        setAuthTab('signup');
                        setUserType(null);
                        setRetailerStoreNow(null);
                      }}
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button 
                      className="text-gold hover:underline font-medium"
                      onClick={() => setAuthTab('signin')}
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;

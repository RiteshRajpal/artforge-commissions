import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Palette, Plus, Eye, MessageSquare, DollarSign, User, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Commission {
  id: string;
  title: string;
  description: string;
  status: string;
  budget_min: number;
  budget_max: number;
  created_at: string;
  customer_id: string;
  artist_id: string | null;
  category: string | null;
  profiles?: {
    full_name: string;
    avatar_url: string | null;
  } | null;
}

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not authenticated
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    if (user) {
      fetchCommissions();
    }
  }, [user]);

  const fetchCommissions = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('commissions')
        .select(`
          *,
          profiles!customer_id (
            full_name,
            avatar_url
          )
        `);

      // Filter based on user role
      if (profile?.role === 'customer') {
        query = query.eq('customer_id', user.id);
      } else if (profile?.role === 'artist') {
        // Show commissions assigned to this artist or open commissions
        query = query.or(`artist_id.eq.${user.id},status.eq.open`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching commissions:', error);
        return;
      }

      setCommissions((data as any) || []);
    } catch (error) {
      console.error('Error fetching commissions:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'assigned': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'completed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cents / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback>
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || 'User'}!</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={profile?.role === 'artist' ? 'secondary' : 'secondary'} className={profile?.role === 'artist' ? 'bg-gradient-creative text-white' : ''}>
                    {profile?.role === 'artist' ? 'Artist' : 'Customer'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="commissions">
                {profile?.role === 'artist' ? 'Available Work' : 'My Commissions'}
              </TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Commissions</p>
                      <p className="text-2xl font-bold">{commissions.length}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Projects</p>
                      <p className="text-2xl font-bold">
                        {commissions.filter(c => c.status === 'in_progress').length}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">
                        {commissions.filter(c => c.status === 'completed').length}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                {commissions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Palette className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No commissions yet. {profile?.role === 'customer' ? 'Create your first commission!' : 'Browse available work!'}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {commissions.slice(0, 3).map((commission) => (
                      <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(commission.status)}>
                            {commission.status}
                          </Badge>
                          <div>
                            <h4 className="font-semibold">{commission.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {commission.budget_min && commission.budget_max && 
                                `${formatCurrency(commission.budget_min)} - ${formatCurrency(commission.budget_max)}`
                              }
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="commissions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  {profile?.role === 'artist' ? 'Available Commissions' : 'My Commissions'}
                </h2>
                {profile?.role === 'customer' && (
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Commission
                  </Button>
                )}
              </div>

              <div className="grid gap-6">
                {commissions.map((commission) => (
                  <Card key={commission.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{commission.title}</h3>
                          <Badge className={getStatusColor(commission.status)}>
                            {commission.status}
                          </Badge>
                          {commission.category && (
                            <Badge variant="outline">{commission.category}</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-2">{commission.description}</p>
                        {commission.profiles && (
                          <p className="text-sm text-muted-foreground">
                            by {commission.profiles.full_name}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        {commission.budget_min && commission.budget_max && (
                          <div className="text-lg font-semibold text-primary mb-2">
                            {formatCurrency(commission.budget_min)} - {formatCurrency(commission.budget_max)}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {profile?.role === 'artist' && commission.status === 'open' && (
                            <Button size="sm">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Bid
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <p className="text-muted-foreground">{profile?.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <p className="text-muted-foreground">{profile?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <Badge variant="secondary" className={profile?.role === 'artist' ? 'bg-gradient-creative text-white' : ''}>
                      {profile?.role}
                    </Badge>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <p className="text-muted-foreground">{profile?.bio || 'No bio added yet'}</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
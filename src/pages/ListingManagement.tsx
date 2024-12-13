import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const ListingManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Redirect if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  const { data: listings, isLoading, error } = useQuery({
    queryKey: ['listings', user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('centers')
        .select('*')
        .eq('owner_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: Boolean(user?.id)
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('centers')
        .delete()
        .eq('id', id)
        .eq('owner_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      toast({
        title: "Listing Deleted",
        description: "The listing has been deleted successfully.",
      });
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: "Could not delete the listing. Please try again.",
        variant: "destructive"
      });
    }
  });

  const filteredListings = listings?.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="text-center text-destructive">
          <p>Error loading listings. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Listings</h1>
          <Button 
            className="flex items-center gap-2"
            onClick={() => navigate('/listings/new')}
          >
            <Plus className="w-4 h-4" /> Add New Listing
          </Button>
        </div>

        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search listings..."
            className="max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <Card key={n}>
                <CardHeader>
                  <Skeleton className="h-8 w-1/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredListings?.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              {searchTerm ? "No listings match your search" : "No listings yet"}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredListings?.map((listing) => (
              <Card key={listing.id} className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">
                    {listing.title}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => navigate(`/listings/${listing.id}/edit`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this listing?')) {
                          deleteMutation.mutate(listing.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <p className="text-2xl font-bold">{listing.status || 'Active'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Views</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-2xl font-bold">
                        {new Date(listing.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ListingManagement;
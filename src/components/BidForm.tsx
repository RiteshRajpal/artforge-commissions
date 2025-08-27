import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

interface BidFormProps {
  commissionId: string;
  onSuccess?: () => void;
}

const BidForm = ({ commissionId, onSuccess }: BidFormProps) => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bid_amount: "",
    estimated_days: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place a bid.",
        variant: "destructive",
      });
      return;
    }

    if (profile?.role !== "artist") {
      toast({
        title: "Artist Account Required",
        description: "Only artists can place bids on commissions.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("commission_bids").insert({
        commission_id: commissionId,
        artist_id: user.id,
        bid_amount: parseInt(formData.bid_amount) * 100, // Convert to cents
        estimated_days: formData.estimated_days ? parseInt(formData.estimated_days) : null,
        message: formData.message || null,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Bid Submitted!",
        description: "Your bid has been submitted successfully.",
      });

      setFormData({
        bid_amount: "",
        estimated_days: "",
        message: "",
      });
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting bid:", error);
      toast({
        title: "Error",
        description: "Failed to submit bid. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 bg-gradient-creative text-white">
          <MessageSquare className="w-4 h-4" />
          Place Bid
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-creative bg-clip-text text-transparent">
            Place Your Bid
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bid_amount">Your Bid ($)</Label>
            <Input
              id="bid_amount"
              type="number"
              value={formData.bid_amount}
              onChange={(e) => setFormData({ ...formData, bid_amount: e.target.value })}
              placeholder="150"
              min="1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimated_days">Estimated Days</Label>
            <Input
              id="estimated_days"
              type="number"
              value={formData.estimated_days}
              onChange={(e) => setFormData({ ...formData, estimated_days: e.target.value })}
              placeholder="7"
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message to Client</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell the client why you're the perfect artist for this project..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-gradient-creative text-white">
              {loading ? "Submitting..." : "Submit Bid"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BidForm;
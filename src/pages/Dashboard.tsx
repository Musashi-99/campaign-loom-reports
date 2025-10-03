import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { listCampaigns } from "@/services/api";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let active = true;
    setLoading(true);
    listCampaigns({ skip: 0, limit: 100 })
      .then((data) => {
        if (!active) return;
        setCampaigns(Array.isArray(data) ? data : []);
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Completed": return "bg-muted text-muted-foreground";
      case "Draft": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // const getSentimentColor = (sentiment: string) => {
  //   switch (sentiment) {
  //     case "Positive": return "text-success";
  //     case "Mixed": return "text-warning";
  //     case "Negative": return "text-destructive";
  //     default: return "text-muted-foreground";
  //   }
  // };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your campaigns and analytics</p>
        </div>
        <Button className="gap-2 transition-smooth hover:shadow-elegant" onClick={() => navigate("/campaigns/new") }>
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats Grid - not needed now */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">...</div> */}

      {/* Campaigns Section */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Campaigns</h2>
            <p className="text-muted-foreground text-sm">All campaigns from backend</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {loading ? (
            <Card><CardContent className="py-10 text-center text-muted-foreground">Loading campaigns...</CardContent></Card>
          ) : campaigns.length === 0 ? (
            <Card><CardContent className="py-10 text-center text-muted-foreground">No campaigns found</CardContent></Card>
          ) : campaigns.map((campaign) => (
            <Card 
              key={campaign.id} 
              className="transition-smooth hover:shadow-elegant-md hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/campaign/${campaign.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{campaign.title}</CardTitle>
                    <CardDescription>
                      {campaign.start_date} → {campaign.end_date}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor("Active")}>
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Extra stats not needed now */}
                <Button variant="outline" className="w-full mt-4 transition-smooth" onClick={(e) => { e.stopPropagation(); navigate(`/campaign/${campaign.id}`); }}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

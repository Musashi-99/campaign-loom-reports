import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, MessageSquare, Plus, Search } from "lucide-react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { title: "Total Campaigns", value: "24", icon: BarChart3, trend: "+12%", color: "text-primary" },
    { title: "Total Comments", value: "1,284", icon: MessageSquare, trend: "+8%", color: "text-secondary" },
    { title: "Engagement Rate", value: "68%", icon: TrendingUp, trend: "+5%", color: "text-success" },
    { title: "Active Users", value: "342", icon: Users, trend: "+15%", color: "text-warning" },
  ];

  const campaigns = [
    { 
      id: 1, 
      name: "Summer Product Launch", 
      status: "Active", 
      comments: 156, 
      sentiment: "Positive",
      engagement: "72%",
      date: "2025-09-15"
    },
    { 
      id: 2, 
      name: "Brand Awareness Campaign", 
      status: "Active", 
      comments: 243, 
      sentiment: "Mixed",
      engagement: "65%",
      date: "2025-09-20"
    },
    { 
      id: 3, 
      name: "Customer Feedback Survey", 
      status: "Completed", 
      comments: 412, 
      sentiment: "Positive",
      engagement: "81%",
      date: "2025-08-30"
    },
    { 
      id: 4, 
      name: "Holiday Promotion", 
      status: "Draft", 
      comments: 0, 
      sentiment: "N/A",
      engagement: "N/A",
      date: "2025-10-01"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Completed": return "bg-muted text-muted-foreground";
      case "Draft": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive": return "text-success";
      case "Mixed": return "text-warning";
      case "Negative": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your campaigns and analytics</p>
        </div>
        <Button className="gap-2 transition-smooth hover:shadow-elegant">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-smooth hover:shadow-elegant-md hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-success mt-1">
                {stat.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaigns Section */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Campaigns</h2>
            <p className="text-muted-foreground text-sm">Manage and monitor your campaigns</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-smooth"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {campaigns.map((campaign) => (
            <Card 
              key={campaign.id} 
              className="transition-smooth hover:shadow-elegant-md hover:-translate-y-1 cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{campaign.name}</CardTitle>
                    <CardDescription>Created on {campaign.date}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Comments</p>
                    <p className="font-semibold text-lg">{campaign.comments}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sentiment</p>
                    <p className={`font-semibold text-lg ${getSentimentColor(campaign.sentiment)}`}>
                      {campaign.sentiment}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Engagement</p>
                    <p className="font-semibold text-lg">{campaign.engagement}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 transition-smooth">
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

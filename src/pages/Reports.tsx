import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, MessageSquare, Users, Activity } from "lucide-react";

const Reports = () => {
  const sentimentData = [
    { name: "Positive", value: 68, color: "hsl(var(--success))" },
    { name: "Neutral", value: 20, color: "hsl(var(--warning))" },
    { name: "Negative", value: 12, color: "hsl(var(--destructive))" },
  ];

  const engagementData = [
    { month: "Jun", engagement: 45 },
    { month: "Jul", engagement: 52 },
    { month: "Aug", engagement: 61 },
    { month: "Sep", engagement: 68 },
    { month: "Oct", engagement: 72 },
  ];

  const campaignPerformance = [
    { campaign: "Summer Launch", comments: 156, engagement: 72 },
    { campaign: "Brand Awareness", comments: 243, engagement: 65 },
    { campaign: "Feedback Survey", comments: 412, engagement: 81 },
    { campaign: "Holiday Promo", comments: 89, engagement: 58 },
  ];

  const topKeywords = [
    { word: "Amazing", count: 89 },
    { word: "Great", count: 76 },
    { word: "Love", count: 65 },
    { word: "Excellent", count: 54 },
    { word: "Quality", count: 48 },
    { word: "Price", count: 42 },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Analytics & Reports</h1>
        <p className="text-muted-foreground">Comprehensive insights into your campaigns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Engagement
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68%</div>
            <p className="text-xs text-success mt-1">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Comments
            </CardTitle>
            <MessageSquare className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,284</div>
            <p className="text-xs text-success mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <Users className="h-5 w-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">342</div>
            <p className="text-xs text-success mt-1">+15% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sentiment Score
            </CardTitle>
            <Activity className="h-5 w-5 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8.2</div>
            <p className="text-xs text-success mt-1">+0.4 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Sentiment Distribution */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
            <CardDescription>Overall sentiment across all campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Trend */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Engagement Trend</CardTitle>
            <CardDescription>Monthly engagement rate over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Comparison of comments and engagement across campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="campaign" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Bar dataKey="comments" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="engagement" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Keywords */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Top Keywords</CardTitle>
          <CardDescription>Most frequently mentioned words in comments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {topKeywords.map((keyword, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-smooth"
              >
                <div className="text-lg font-semibold text-primary">{keyword.word}</div>
                <div className="text-sm text-muted-foreground">{keyword.count} mentions</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;

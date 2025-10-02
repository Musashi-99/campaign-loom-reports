import { useState } from "react";
import { ArrowLeft, MessageSquare, ThumbsUp, ThumbsDown, Meh, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CampaignDetails = () => {
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");

  const campaign = {
    id: 1,
    name: "Summer Product Launch",
    status: "Active",
    description: "A comprehensive campaign to launch our new summer product line with focus on social media engagement and customer feedback.",
    startDate: "2025-09-15",
    endDate: "2025-10-15",
    totalComments: 156,
    sentiment: {
      positive: 68,
      neutral: 20,
      negative: 12
    }
  };

  const comments = [
    {
      id: 1,
      author: "Sarah Johnson",
      content: "This product looks amazing! Can't wait to try it out.",
      sentiment: "positive",
      date: "2025-09-20",
      likes: 12
    },
    {
      id: 2,
      author: "Mike Chen",
      content: "The pricing seems a bit high compared to competitors.",
      sentiment: "negative",
      date: "2025-09-19",
      likes: 5
    },
    {
      id: 3,
      author: "Emma Davis",
      content: "Interesting concept. Would love to see more color options.",
      sentiment: "neutral",
      date: "2025-09-18",
      likes: 8
    },
    {
      id: 4,
      author: "James Wilson",
      content: "Great campaign! The visuals are stunning.",
      sentiment: "positive",
      date: "2025-09-17",
      likes: 15
    },
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <ThumbsUp className="h-4 w-4 text-success" />;
      case "negative": return <ThumbsDown className="h-4 w-4 text-destructive" />;
      default: return <Meh className="h-4 w-4 text-warning" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "border-l-success";
      case "negative": return "border-l-destructive";
      default: return "border-l-warning";
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      toast.success("Comment added successfully!");
      setNewComment("");
    }
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/dashboard")}
          className="transition-smooth"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold">{campaign.name}</h1>
            <Badge className="bg-success text-success-foreground">{campaign.status}</Badge>
          </div>
          <p className="text-muted-foreground">{campaign.description}</p>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-elegant">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Comments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold">{campaign.totalComments}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Positive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-success" />
              <span className="text-3xl font-bold">{campaign.sentiment.positive}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Neutral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Meh className="h-5 w-5 text-warning" />
              <span className="text-3xl font-bold">{campaign.sentiment.neutral}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Negative
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ThumbsDown className="h-5 w-5 text-destructive" />
              <span className="text-3xl font-bold">{campaign.sentiment.negative}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Comment Section */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Add New Comment</CardTitle>
          <CardDescription>Contribute to the campaign discussion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Your Comment</Label>
              <Textarea
                id="comment"
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] transition-smooth"
              />
            </div>
            <Button onClick={handleAddComment} className="gap-2 transition-smooth hover:shadow-elegant">
              <Plus className="h-4 w-4" />
              Add Comment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card 
              key={comment.id} 
              className={`transition-smooth hover:shadow-elegant-md border-l-4 ${getSentimentColor(comment.sentiment)}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{comment.author}</CardTitle>
                      <CardDescription>{comment.date}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSentimentIcon(comment.sentiment)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-3">{comment.content}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{comment.likes} likes</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;

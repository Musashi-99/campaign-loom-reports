import { useEffect, useMemo, useState } from "react";
import { MessageSquare, ThumbsUp, ThumbsDown, Meh, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { addComment, getCampaign, listCampaignComments } from "@/services/api";
import { Input } from "@/components/ui/input";

const CampaignDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const campaignId = useMemo(() => Number(id), [id]);
  const [newComment, setNewComment] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [campaign, setCampaign] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let active = true;
    if (!campaignId) return;
    setLoading(true);
    Promise.all([
      getCampaign(campaignId),
      listCampaignComments(campaignId, { skip: 0, limit }),
    ])
      .then(([c, cmts]) => {
        if (!active) return;
        setCampaign(c);
        setComments(cmts || []);
        setSkip((cmts?.length || 0));
        setHasMore((cmts?.length || 0) === limit);
      })
      .catch(() => {
        toast.error("Failed to load campaign");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [campaignId]);

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

  const handleAddComment = async () => {
    if (!newComment.trim() || !email.trim()) {
      toast.error("Email and comment are required");
      return;
    }
    try {
      setSubmitting(true);
      const created = await addComment({ campaign_id: campaignId, email, comment: newComment });
      setComments((prev) => [created, ...prev]);
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  const loadMore = async () => {
    try {
      const next = await listCampaignComments(campaignId, { skip, limit });
      setComments((prev) => [...prev, ...(next || [])]);
      setSkip(skip + (next?.length || 0));
      setHasMore((next?.length || 0) === limit);
    } catch {
      toast.error("Failed to load more comments");
    }
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold">{campaign?.title || "Campaign"}</h1>
          <Badge className="bg-success text-success-foreground">Active</Badge>
        </div>
        <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: campaign?.body || "" }} />
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
              <span className="text-3xl font-bold">{comments.length}</span>
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
              <span className="text-3xl font-bold">-</span>
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
              <span className="text-3xl font-bold">-</span>
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
              <span className="text-3xl font-bold">-</span>
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
              <Label htmlFor="email">Your Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
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
            <Button onClick={handleAddComment} disabled={submitting} className="gap-2 transition-smooth hover:shadow-elegant">
              <Plus className="h-4 w-4" />
              {submitting ? "Submitting..." : "Add Comment"}
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
              className={`transition-smooth hover:shadow-elegant-md border-l-4 ${getSentimentColor(comment.sentiment?.label || "neutral")}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">
                        {comment.email ? comment.email[0].toUpperCase() : "U"}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{comment.email || "User"}</CardTitle>
                      <CardDescription>{comment.created_at || ""}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSentimentIcon(comment.sentiment?.label || "neutral")}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-3">{comment.comment}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>0 likes</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {hasMore && (
          <div className="mt-6">
            <Button variant="outline" onClick={loadMore} className="transition-smooth">Load more</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;

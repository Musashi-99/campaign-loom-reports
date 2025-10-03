import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getReportSummary, getReportSentiments } from "@/services/api";
import { ArrowLeft } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import WordCloud from "@/components/WordCloud";

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaignId = Number(id);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any | null>(null);
  const [sentiments, setSentiments] = useState<any[]>([]);
  const hasKey = Boolean(sessionStorage.getItem("X-Admin-Key"));
  const PIE_COLORS = ["hsl(var(--success))", "hsl(var(--warning))", "hsl(var(--destructive))"];

  useEffect(() => {
    let active = true;
    if (!campaignId || !hasKey) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      getReportSummary(campaignId, { top_n: 50, batch_size: 100 }),
      getReportSentiments(campaignId, { batch_size: 100 })
    ]).then(([sum, sens]) => {
      if (!active) return;
      setSummary(sum);
      setSentiments(Array.isArray(sens) ? sens : []);
    }).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [campaignId, hasKey]);

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="transition-smooth">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Campaign Reports</h1>
          <p className="text-muted-foreground">Campaign ID: {campaignId}</p>
        </div>
      </div>

      {!hasKey && (
        <Card>
          <CardHeader>
            <CardTitle>Admin key required</CardTitle>
            <CardDescription>Open the Reports tab and set your admin key to view reports.</CardDescription>
          </CardHeader>
        </Card>
      )}

      {hasKey && loading && (
        <Card><CardContent className="py-10 text-center text-muted-foreground">Loading report...</CardContent></Card>
      )}

      {hasKey && !loading && summary && (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Total comments: {summary.total_comments}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <div className="text-sm text-muted-foreground">Average Compound</div>
                <div className="text-2xl font-semibold">{summary.average_compound}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Positive</div>
                <div className="text-xl">{summary.sentiment_distribution?.positive}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Negative</div>
                <div className="text-xl">{summary.sentiment_distribution?.negative}</div>
              </div>
            </div>

            {/* Sentiments Pie */}
            {summary.sentiments_pie && (
              <div className="mt-6">
                <div className="text-sm font-medium mb-2">Sentiments</div>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={summary.sentiments_pie.labels.map((label: string, idx: number) => ({
                          name: label,
                          value: summary.sentiments_pie.values[idx],
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={90}
                        dataKey="value"
                      >
                        {summary.sentiments_pie.labels.map((_: string, idx: number) => (
                          <Cell key={`cell-${idx}`} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Word Cloud */}
            {summary.word_cloud?.words?.length ? (
              <div className="mt-6">
                <div className="text-sm font-medium mb-2">Word Cloud</div>
                <WordCloud words={summary.word_cloud.words} />
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {hasKey && !loading && sentiments.length > 0 && (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Sentiments</CardTitle>
            <CardDescription>Latest analyzed comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sentiments.map((s) => (
                <div key={s.comment_id} className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">#{s.comment_id}</div>
                    <div className="text-sm text-muted-foreground">{s.sentiment?.label}</div>
                  </div>
                  <div className="mt-3 grid gap-3">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground">Original</div>
                      <div className="text-sm text-foreground">{s.comment}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground">English</div>
                      <div className="text-sm text-foreground">{s.comment_en || s.comment}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportDetails;



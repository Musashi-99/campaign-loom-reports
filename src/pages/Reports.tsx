import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const Reports = () => {
  const [open, setOpen] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("X-Admin-Key") || "";
    if (!saved) {
      setOpen(true);
    } else {
      setHasKey(true);
    }
  }, []);

  const saveKey = () => {
    if (!keyInput.trim()) {
      toast.error("Please enter an admin key");
      return;
    }
    sessionStorage.setItem("X-Admin-Key", keyInput.trim());
    setHasKey(true);
    setOpen(false);
    toast.success("Admin key saved to this session");
  };

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Reports</h1>
          <p className="text-muted-foreground">Enter your admin key to access reports APIs</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">{hasKey ? "Change Admin Key" : "Set Admin Key"}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Admin Key</DialogTitle>
              <DialogDescription>
                This key will be stored in session storage and used for reports API requests.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter X-Admin-Key"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={saveKey}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Next steps</CardTitle>
          <CardDescription>Choose a campaign to view its report</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Go to the Dashboard and select a campaign. On its details page, you can fetch summaries
            and sentiments using your saved admin key.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;

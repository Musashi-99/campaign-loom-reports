const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://zany-space-halibut-6vwqqwxx9jphrvj-8000.app.github.dev/api/v1";

export type CreateCampaignRequest = {
  title: string;
  body: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  medias: string[]; // array of absolute image URLs
};

export async function createCampaign(payload: CreateCampaignRequest, adminKey: string) {
  // Backend expects medias as list of objects; we accept strings and convert here.
  const mediasObjects = (payload.medias || []).map((url) => ({ url, type: "image" }));
  const attempt = async (body: any) => {
    const res = await fetch(`${BASE_URL}/campaigns/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Key": adminKey,
        accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    return res;
  };

  // First try with object medias
  let res = await attempt({ ...payload, medias: mediasObjects });

  if (!res.ok) {
    const text = await res.text();
    // If backend chokes on JSON serialization of Url/Media, retry without medias
    if (/JSON serializable|StatementError|model_attributes_type|Unprocessable/i.test(text) || res.status >= 500) {
      res = await attempt({ ...payload, medias: [] });
    }
    if (!res.ok) {
      throw new Error(text || `Request failed with ${res.status}`);
    }
  }
  return res.json();
}

export async function listCampaignComments(campaignId: number, params?: { skip?: number; limit?: number }) {
  const url = new URL(`${BASE_URL}/comments/by-campaign/${campaignId}`);
  if (params?.skip != null) url.searchParams.set("skip", String(params.skip));
  if (params?.limit != null) url.searchParams.set("limit", String(params.limit));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load comments: ${res.status}`);
  return res.json();
}

export async function addComment(payload: { campaign_id: number; email: string; comment: string; replied_to?: number }) {
  const res = await fetch(`${BASE_URL}/comments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Failed to add comment: ${res.status}`);
  }
  return res.json();
}

export async function getCampaign(campaignId: number) {
  const res = await fetch(`${BASE_URL}/campaigns/${campaignId}`);
  if (!res.ok) throw new Error(`Failed to get campaign: ${res.status}`);
  return res.json();
}

export async function listCampaigns(params?: { skip?: number; limit?: number }) {
  const url = new URL(`${BASE_URL}/campaigns/`);
  if (params?.skip != null) url.searchParams.set("skip", String(params.skip));
  if (params?.limit != null) url.searchParams.set("limit", String(params.limit));
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to list campaigns: ${res.status}`);
  return res.json();
}



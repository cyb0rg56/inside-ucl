import { useCallback } from 'react';
import { useAsyncResource, AsyncResource } from './use-async-resource';

export interface StaffNewsItem {
  title: string;
  url: string;
  summary: string;
  date: number;
  imageUrl?: string;
}

const STAFF_NEWS_URL =
  'https://search.ucl.ac.uk/s/search.json?collection=drupal-meta-news-news&meta_UclAudience=%22Staff%22&f.Audiences%7CUclAudience=Staff';

export function useStaffNews(): AsyncResource<StaffNewsItem[]> {
  const loader = useCallback(async (signal: AbortSignal) => {
    const res = await fetch(STAFF_NEWS_URL, { signal });
    if (!res.ok) throw new Error(`Staff news fetch failed: ${res.status}`);
    const json = await res.json();

    const results = json?.response?.resultPacket?.results ?? [];
    return results.map((item: any) => ({
      title: item.metaData?.FeedTitle ?? item.title,
      url: item.liveUrl,
      summary: item.metaData?.c ?? item.summary ?? '',
      date: item.date,
      imageUrl: item.metaData?.I,
    }));
  }, []);

  return useAsyncResource(loader);
}

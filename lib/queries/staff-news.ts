import { queryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queries/keys';

export type StaffNewsItem = {
  title: string;
  url: string;
  summary: string;
  date: number;
  imageUrl?: string;
};

const STAFF_NEWS_URL =
  'https://search.ucl.ac.uk/s/search.json?collection=drupal-meta-news-news&meta_UclAudience=%22Staff%22&f.Audiences%7CUclAudience=Staff';

type StaffNewsResult = {
  title?: string;
  liveUrl?: string;
  summary?: string;
  date?: number;
  metaData?: {
    FeedTitle?: string;
    c?: string;
    I?: string;
  };
};

export const staffNewsQueries = {
  list: () =>
    queryOptions({
      queryKey: queryKeys.staffNews.list(),
      queryFn: async ({ signal }) => {
        const res = await fetch(STAFF_NEWS_URL, { signal });
        if (!res.ok) {
          throw new Error(`Staff news fetch failed: ${res.status}`);
        }
        const json = await res.json();
        const results: StaffNewsResult[] = json?.response?.resultPacket?.results ?? [];
        return results.map((item) => ({
          title: item.metaData?.FeedTitle ?? item.title ?? '',
          url: item.liveUrl ?? '',
          summary: item.metaData?.c ?? item.summary ?? '',
          date: item.date ?? 0,
          imageUrl: item.metaData?.I,
        }));
      },
    }),
};

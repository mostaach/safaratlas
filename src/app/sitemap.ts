import { MetadataRoute } from 'next';
import { DESTINATIONS, BUSINESS_LISTINGS } from '../data/mockData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://safaratlas.com';

  // Core static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Dynamic routes for destinations
  const destinationRoutes = DESTINATIONS.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic routes for business listings (hosts)
  const listingRoutes = BUSINESS_LISTINGS.map((biz) => ({
    url: `${baseUrl}/hosts/${biz.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...destinationRoutes, ...listingRoutes];
}

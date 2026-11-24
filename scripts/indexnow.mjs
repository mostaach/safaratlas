/**
 * Submit every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam,
 * Naver, Yep). This is the fastest way to get new pages discovered on Bing.
 *
 * Usage:
 *   npm run indexnow
 *
 * The key file must already be deployed at:
 *   https://safaratlas.com/<key>.txt
 */
const KEY = "f4c1a9d7e2b6480c9a3f5d71b8e2c604";
const HOST = "safaratlas.com";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function main() {
  const sitemapResponse = await fetch(SITEMAP_URL);
  if (!sitemapResponse.ok) {
    throw new Error(`Could not fetch sitemap: ${sitemapResponse.status}`);
  }

  const xml = await sitemapResponse.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

  if (urls.length === 0) {
    throw new Error("No URLs found in sitemap");
  }

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  };

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  console.log(`IndexNow: ${response.status} ${response.statusText}`);
  console.log(`Submitted ${urls.length} URLs`);
  if (text) console.log(text);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

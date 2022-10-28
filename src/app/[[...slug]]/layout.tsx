export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { [key: string]: string | string[] };
}) {
  const wagtailData = await getWagtailPageData(
    getPathnameFromSlug(params.slug ?? "")
  );
  return (
    <html>
      <head>
        <title>{wagtailData.meta?.seo_title || wagtailData.title}</title>
      </head>
      <body>
        <nav>Here&apos;s a nav</nav>
        <h1>{wagtailData.title}</h1>
        <main>{children}</main>
      </body>
    </html>
  );
}

function getPathnameFromSlug(arg: string | string[]) {
  if (typeof arg === "string") return `/${arg}`;
  else return `/${arg.join("/")}`;
}

async function getWagtailPageData(path: string) {
  const response = await fetch(
    `https://cdn.dev.emtekaws.com/api/v2/pages/detail_by_path/?html_path=${path}`
  );
  console.log(path);
  return await response.json();
}

export const revalidate = 0;

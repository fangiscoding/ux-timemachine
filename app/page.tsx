import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client } from "./lib/sanity";
import Image from "next/image";
import { urlFor } from "./lib/sanity";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 10

async function getData() {
  const query = `
   *[_type == 'blog'] | order(_createdAt desc) {
  title,
    description,
    "slug": slug.current,
    featuredImage
}
  `

  const data = await client.fetch(query)
  // const data = await res.json()

  return data
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData()

  console.log({ data })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">

      {data.map((post, idx) => (
        <Card key={idx} >
          <Image src={urlFor(post.featuredImage).url()} alt="image" width={500} height={500} className="rounded-t-lg h-[200px] object-cover" />
          <CardContent className="mt-5">
            <h3 className="text-xl line-clamp-2">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{post.description}</p>
            <Button asChild className="w-full mt-7">
              <Link href={`/blog/${post.slug}`}>
                Read More
              </Link>
            </Button>
          </CardContent>

        </Card>
      ))}

    </div>
  );
}

import { client, urlFor } from "@/app/lib/sanity"
import { fullBlog } from "@/app/lib/interface"
import Image from "next/image"
import { PortableText } from "next-sanity"

async function getData(slug: string) {
    const query = `
*[_type == "blog" && slug.current == '${slug}'] {
  "slug": slug.current,
    title,
    content,
    featuredImage
}[0]`

    const data = await client.fetch(query)

    return data
}


export default async function BlogArticle({ params }: { params: { slug: string } }) {
    const data: fullBlog = await getData(params.slug)
    console.log(data);
    return (
        <div className="mt-8">
            <h1>
                <span className="block text-base text-center text-primary font-semibold tracking-wide">UX time machine - blog</span>
                <span className="mt-2 block text-3xl text-center leading-8 tracking-tight sm:text-4xl">{data.title}</span>
            </h1>

            <Image className="mt-8 rounded-lg border" src={urlFor(data.featuredImage).url()} width={800} height={800} alt="Featured Image" />

            <div className="mt-16 prose prose-blue prose-lg dark:prose-invert">
                <PortableText value={data.content} />
            </div>
        </div>
    )
}

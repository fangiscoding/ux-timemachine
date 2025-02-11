export default {
  name: 'blog',
  type: 'document',
  titile: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Descripiton',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
}

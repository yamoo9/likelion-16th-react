import { PostCard, type Post } from './post-card'

export interface UserData {
  id: number
  email: string
  name: string
  posts: Post[]
}

export default function PostGrid({ data }: { data: UserData[] }) {
  const allPosts = data.flatMap((user) =>
    user.posts.map((post) => ({ ...post, authorName: user.name })),
  )

  return (
    <div className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post) => (
            <PostCard key={post.id} post={post} authorName={post.authorName} />
          ))}
        </div>
      </div>
    </div>
  )
}

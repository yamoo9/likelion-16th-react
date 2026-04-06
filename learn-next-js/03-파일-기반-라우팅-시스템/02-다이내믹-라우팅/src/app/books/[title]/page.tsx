import { Book } from "../_resources/data"



interface Props {
  params: Promise<{ title: Book['title'] }>
}

export default async function BookDetailPage({ params }: Props) {

  const title = (await params).title
  console.log(title)

  return null
}

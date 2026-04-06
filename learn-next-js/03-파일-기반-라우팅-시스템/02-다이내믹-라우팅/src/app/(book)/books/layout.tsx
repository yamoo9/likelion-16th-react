import Breadcrumbs from "@/components/ui/breadcrumbs"

export default function BooksLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto max-w-5xl mt-2 flex flex-col gap-4">
      <Breadcrumbs />
      {children}
    </div>
  )
}

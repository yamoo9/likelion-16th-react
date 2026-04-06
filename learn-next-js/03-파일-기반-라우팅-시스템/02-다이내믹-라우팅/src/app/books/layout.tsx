
export default function BooksLayout({ children }: LayoutProps<'/books'>) {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-12">
      {children}
    </div>
  )
}

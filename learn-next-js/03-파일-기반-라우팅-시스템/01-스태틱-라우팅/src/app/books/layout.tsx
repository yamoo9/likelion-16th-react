import SearchForm from "./_components/search-form"

export default function BooksLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto max-w-5xl mt-6">
      <SearchForm />
      {children}
    </div>
  )
}

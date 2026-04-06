import Breadcrumbs from '@/components/ui/breadcrumbs'

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto max-w-5xl mt-2 flex flex-col gap-4">
      <Breadcrumbs />
      {children}
    </div>
  )
}

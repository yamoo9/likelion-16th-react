export default function DemoLayout({
  /* @children/page.tsx */

  /* app/demo/@children/page.tsx = app/demo/page.tsx */
  /* app/demo/@stack/page.tsx */
  children,
  stack,
}: LayoutProps<'/demo'>) {
  return (
    <div className="border p-5 flex flex-col gap-5">
      <div>{children}</div>
      <div>{stack}</div>
    </div>
  )
}

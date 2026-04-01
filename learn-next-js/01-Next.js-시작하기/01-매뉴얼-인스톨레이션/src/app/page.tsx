import VercelLogo from "@/components/ui/vercel-logo"

export default function Page() {
 
  return (
    <header className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-black">Hello Next.js</h1>
      <VercelLogo className="size-8 mt-2 text-rose-500 dark:text-yellow-400" />
    </header>
  );
}

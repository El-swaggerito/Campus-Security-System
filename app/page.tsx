import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to Al-hikmah Campus Security Analysis</h1>
        <p className="text-xl mb-8 text-gray-700">Ensuring a safer environment for our campus community</p>
        <Link href="/overview">
          <Button size="lg">View Security Overview</Button>
        </Link>
      </div>
    </Layout>
  )
}

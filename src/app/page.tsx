import { auth } from "@/auth"

export default async function Home() {
  const session = await auth()

  if (!session) return null

  return (
    <main className="text-white">
      <h1>Homepage</h1>
      <ul>
        <li>Id: {session.user?.id}</li>
        <li>Email: {session.user?.email}</li>
        <li>Name: {session.user?.name}</li>
        <li>Image: {session.user?.image}</li>
      </ul>
    </main>
  );
}

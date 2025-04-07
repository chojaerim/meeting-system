import AgendaForm from "@/components/AgendaForm";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">회의 안건 작성</h1>
      <AgendaForm />
    </main>
  );
}

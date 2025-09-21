import CompanionCard from "@/components/companioncard";
import SearchInputs from "@/components/searchinputs";
import SubjectFilter from "@/components/subjectfilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const companions = await getAllCompanions({ subject, topic });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>My Companions</h1>
        <div className="flex gap-4">
          <SearchInputs />
          <SubjectFilter />
        </div>
      </section>

      {companions.length === 0 ? (
        <section className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No companions found
          </h2>
          <p className="text-gray-500 mb-6">
            {subject || topic 
              ? "No companions match your current filters. Try adjusting your search criteria."
              : "You haven't created any companions yet. Start by creating your first AI learning companion!"
            }
          </p>
          {!subject && !topic && (
            <Link 
              href="/companions/new" 
              className="btn-primary inline-flex items-center gap-2"
            >
              Create Your First Companion
            </Link>
          )}
        </section>
      ) : (
        <section className="companions-grid">
          {companions.map((companion) => (
            <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)}/>
          ))}
        </section>
      )}
    </main>
  )
};

export default CompanionsLibrary;

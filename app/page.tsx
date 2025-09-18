import CompanionCard from "@/components/companioncard";
import CompanionList from "@/components/companionlist";
import Cta from "@/components/cta";
import { recentSessions } from "@/constants";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionCompanions = await getRecentSessions(10);

  return (
    <main>
      <section className="grid gap-6 lg:grid-cols-[minmax(260px,380px),1fr]">
        {/* Left column: companions list stacked */}
        <div className="flex flex-col gap-4">
          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </div>

        {/* Right column: CTA (top right) */}
        <div className="flex flex-col gap-6">
          <Cta />
          <CompanionList
            title="Recent Lessons"
            companions={recentSessionCompanions}
            classNames="w-full"
          />
        </div>

        {/* Right column: Recent lessons (bottom right) */}
        <div className="lg:col-start-2 lg:row-start-2">
        </div>
      </section>
    </main>
  );
};

export default Page;

import CompanionCard from "@/components/companioncard";
import CompanionList from "@/components/companionlist";
import Cta from "@/components/cta";
import { recentSessions } from "@/constants";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionCompanions = await getRecentSessions(10);

  return (
    <main>
      {/* Sign-in section for unregistered users */}
      <SignedOut>
        <section className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Dialogica
            </h2>
            <p className="text-gray-600 mb-4">
              Start your AI-powered learning journey today. Sign in to access personalized companions and track your progress.
            </p>
            <SignInButton>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                Get Started - Sign In
              </button>
            </SignInButton>
          </div>
        </section>
      </SignedOut>

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

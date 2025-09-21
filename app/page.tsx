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
import Link from "next/link";

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
          <SignedIn>
            {companions.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No companions yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Create your first AI learning companion to get started!
                </p>
                <Link 
                  href="/companions/new" 
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Create Companion
                </Link>
              </div>
            ) : (
              companions.map((companion) => (
                <CompanionCard
                  key={companion.id}
                  {...companion}
                  color={getSubjectColor(companion.subject)}
                />
              ))
            )}
          </SignedIn>
          <SignedOut>
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Sign in to see your companions
              </h3>
              <p className="text-gray-500">
                Create and manage your AI learning companions after signing in.
              </p>
            </div>
          </SignedOut>
        </div>

        {/* Right column: CTA (top right) */}
        <div className="flex flex-col gap-6">
          <Cta />
          <SignedIn>
            {recentSessionCompanions.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No recent lessons
                </h3>
                <p className="text-gray-500">
                  Start a conversation with one of your companions to see your recent lessons here.
                </p>
              </div>
            ) : (
              <CompanionList
                title="Recent Lessons"
                companions={recentSessionCompanions}
                classNames="w-full"
              />
            )}
          </SignedIn>
          <SignedOut>
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Recent Lessons
              </h3>
              <p className="text-gray-500">
                Sign in to track your learning progress and see your recent lessons here.
              </p>
            </div>
          </SignedOut>
        </div>

        {/* Right column: Recent lessons (bottom right) */}
        <div className="lg:col-start-2 lg:row-start-2">
        </div>
      </section>
    </main>
  );
};

export default Page;

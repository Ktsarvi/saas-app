import Link from "next/link";

const CompanionsLimitPage = () => {
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      <article className="companion-limit">
        <div className="cta-badge">Upgrade your plan</div>
        <h1>You’ve Reached Your Companion Limit</h1>
        <p>You have reached the maximum number of companions allowed on your current plan. Upgrade to create more companions and unlock premium features.</p>
        <Link href="/premium" className="btn-primary w-full justify-center">Upgrade My Plan</Link>
      </article>
    </main>
  );
};

export default CompanionsLimitPage;



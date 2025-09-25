import Link from "next/link";

const ConversationsLimitPage = () => {
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      <article className="companion-limit">
        <div className="cta-badge">Upgrade your plan</div>
        <h1>You’ve Reached Your Conversation Limit</h1>
        <p>You have reached the maximum number of monthly conversations on your current plan. Upgrade for unlimited conversations.</p>
        <Link href="/premium" className="btn-primary w-full justify-center">Upgrade My Plan</Link>
      </article>
    </main>
  );
};

export default ConversationsLimitPage;



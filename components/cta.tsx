import Link from "next/link";
import Image from "next/image";

const Cta = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning your way.</div>
      <h2 className="text-xl font-bold">
        Build and Personalize Learning Companion
      </h2>
      {/* <Image src="/images/cta.svg" alt="cta" width={362} height={232}/> */}
      <button className="btn-primary">
            <Image src="/icons/plus.svg" alt="plus" width={12} height={12}/>
            <Link href="/companions/new">
                <p>Create a new companion</p>
            </Link> 
      </button>
    </section>
  );
};

export default Cta;

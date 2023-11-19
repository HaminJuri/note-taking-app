//! Components
import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";
import Footer from "./_components/Footer";

//! Template
const MarketingPage = () => {
    return (
        <main className="flex min-h-full flex-col dark:bg-neutral-900">
            <header className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start">
                <Heading />
                <Heroes />
            </header>
            <Footer />
        </main>
    );
};
export default MarketingPage;

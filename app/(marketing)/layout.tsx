import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("./_components/Navbar"));

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full dark:bg-neutral-900">
            <Navbar />
            <main className="h-full">{children}</main>
        </div>
    );
};

export default MarketingLayout;

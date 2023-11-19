import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

const Logo = () => {
    return (
        <div className="grow items-center gap-x-2 md:flex">
            <p className={cn("font-semibold", font.className)}>Note It.</p>
        </div>
    );
};

export default Logo;

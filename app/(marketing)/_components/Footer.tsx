import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Footer = () => {
    return (
        <div className="z-50 flex w-full items-center bg-background p-2 dark:bg-neutral-900">
            <Logo />
            <Button variant="link" size="sm">
                Privacy Policy
            </Button>
            <Button variant="link" size="sm">
                Terms & Conditions
            </Button>
        </div>
    );
};

export default Footer;

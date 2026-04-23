import { assets } from "@/assets/assets";

export default function ApplicationLogo(props) {
    return (
        <img
            src={assets.logo}
            alt="Application Logo"
            {...props}
        />
    );
}

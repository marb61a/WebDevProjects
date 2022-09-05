import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";

import { 
    ArrowDown,
    Friends,
    Gaming,
    HomeActive,
    Logo,
    Market,
    Menu,
    Messenger,
    Notifications,
    Search,
    Watch
} from "../../svg";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";

export default function Header() {
    const { user } = useSelector((user) => ({ ...user }));
    const color = "#65676b";
    const [showSearchMenu, setShowSearchMenu] = useState(false);
    const [showAllMenu, setShowAllMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const allmenu = useRef(null);
    const usermenu = useRef(null);
    useClickOutside(allmenu, () => {
        setShowAllMenu(false);
    });
    useClickOutside(usermenu, () => {
        setShowUserMenu(false);
    });

    return(
        <header>
            <div className="header_left">
                <Link to="/" className="header_logo">
                    <div className="circle">
                        <Logo />
                    </div>
                </Link>
            </div>
        </header>
    )
}
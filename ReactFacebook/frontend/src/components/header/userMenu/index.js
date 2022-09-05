import { useState } from "react";
import { Link } from "react-router-dom";

import DisplayAccessibility from "./DisplayAccessibility";
import HelpSupport from "./HelpSupport";
import SettingsPrivacy from "./SettingsPrivacy";

export default function UserMenu({ user }) {
    const [visible, setVisible] = useState(0);

    return(
        <div className="mmenu">
            {visible && (
                <div>
                    <Link to="/profile" className="mmenu_header hover3">
                        <img src={user?.picture} alt="" />
                        <div className="mmenu_col">
                            <span>
                                {user?.first_name} {user?.last_name}
                            </span>
                            <span>See your profile</span>
                        </div>
                    </Link>
                    <div className="mmenu_splitter"></div>
                    <div className="mmenu_item hover3" onClick={() => {setVisible(1)}}>
                        <div className="small_circle">
                            <i className="settings_filled_icon"></i>
                        </div>
                        <span>Settings & privacy</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>
                        </div>
                    </div>
                    <div className="mmenu_item hover3" onClick={() => {setVisible(2)}}>
                        <div className="small_circle">
                            <i className="help_filled_icon"></i>
                        </div>
                        <span>Help & Support</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>
                        </div>
                    </div>
                    
                </div>
            )}
        </div>
    );
}
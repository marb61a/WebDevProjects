import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserMenu({ user }) {
    const [visible, setVisible] = useState(0);

    return(
        <div className="mmenu">
            {visible && (
                <div>
                    <Link>
                    
                    </Link>
                    <div className="mmenu_splitter"></div>
                    <div >

                    </div>
                </div>
            )}
        </div>
    );
}
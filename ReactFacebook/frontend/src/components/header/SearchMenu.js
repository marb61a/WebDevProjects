import { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";

import useClickOutside from "../../helpers/clickOutside";
import {
    addToSearchHistory,
    getSearchHistory,
    removeFromSearch,
    search,
} from "../../functions/user";

export default function SearchMenu({ color, setShowSearchMenu }) {
    const [iconVisible, setIconVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const menu = useRef(null);
    const input = useRef(null);

    useClickOutside(menu, () => {
        setShowSearchMenu(false);
    });
    useEffect(() => {
        input.current.focus();
    });
    const getHistory = async () => {
        const res = await getSearchHistory(token);
        setSearchHistory(res);
    };
    useEffect(() => {
        input.current.focus();
    }, []);

    const searchHandler = async() => {
        if(searchTerm === ""){
            setResults("");
        } else {
            const res = await search(searchTerm, token);
            getHistory();
        }
    };
    
    return(
        <div className="header_left search_area scrollbar" ref={menu}>
            <div className="search_wrap">
                <div header_logo>
                    <div className="circle hover1" onClick={() => {setShowSearchMenu(false)}}>
                        <Return color={color} />
                    </div>
                </div>
                <div className="search" onClick={() => {input.current.focus();}}>
                    {iconVisible && (
                        <div>
                            <Search color={color} />
                        </div>
                    )}
                    <input 
                        type="text"
                        placeholder="Search Facebook"
                        ref={input}
                        onFocus={() => {
                            setIconVisible(false);
                        }}
                        onBlur={() => {
                            setIconVisible(true);
                        }}  
                    />
                </div>
            </div>
            <div className="search_history_header">
                <span>Recent searches</span>
                <a>Edit</a>
            </div>
            <div className="search_history"></div>
            <div className="search_results scrollbar"></div>
        </div>
    )
}
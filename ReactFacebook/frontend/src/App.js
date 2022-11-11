import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";

import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import { postsReducer } from "./functions/reducers";
import Friends from "./pages/friends";

function App() {
    const [visible, setVisible] = useState(false);
    const { user, darkTheme } = useSelector((state) => ({ ...state }));
    const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
        loading: false,
        posts: [],
        error: ""
    });
    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async() => {
        try{
            dispatch({
                type: "POSTS_REQUEST"
            });

            const { data } = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            )

            dispatch({
                type: "POSTS_SUCCESS",
                payload: data
            });
        } catch(error){
            dispatch({
                type: "POSTS_ERROR",
                payload: error.response.data.message
            });
        }
    }

    return (
        <div className={darkTheme && "dark"}>
            {visible && (
                <CreatePostPopup 
                    user={user}
                    setVisible={setVisible}
                    posts={posts}
                    dispatch={dispatch}
                />
            )}
            <Routes>
                <Route element={<LoggedInRoutes />}>
                    <Route path="/profile" element={<Profile />} exact />
                    <Route path="/" element={<Home />} exact />
                </Route>
                <Route element={<NotLoggedInRoutes />}>
                    <Route path="/login" element={<Login />} exact />
                </Route>
            </Routes>
        </div>
    );
}
  
export default App;
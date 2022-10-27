import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
} from "../../functions/user";

export default function Card({ user, type, getData}){
    const { user } = useSelector((state) => ({ ...state }));

    const cancelRequestHandler = async(userId) => {
        const res = await cancelRequest(userId, user.token);
        if(res == "ok"){
            getData();
        }
    };

    const confirmHandler = async (userId) => {
        const res = await acceptRequest(userId, user.token);
        if (res == "ok") {
            getData();
        }
    };

    return(
        <div className="req_card">
            <Link to={`/profile/${userr.username}`}>
                <img src={userr.picture} alt="" />
            </Link>
        </div>
    );
}
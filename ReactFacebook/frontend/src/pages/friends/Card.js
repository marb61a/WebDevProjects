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

    const deleteHandler = async (userId) => {
        const res = await deleteRequest(userId, user.token);
        if (res == "ok") {
            getData();
        }
    };

    return(
        <div className="req_card">
            <Link to={`/profile/${userr.username}`}>
                <img src={userr.picture} alt="" />
            </Link>
            <div className="req_name">
                {user.first_name} {user.last_name}
            </div>
            {type === "sent" ? (
                <button className="blue_btn" onClick={() => cancelRequestHandler(userr._id)}>
                    Cancel Request
                </button>
            ) : type === "request" ? (
                <>
                    <button className="blue_btn" onClick={() => confirmHandler(user._id)}>
                        Confirm
                    </button>
                    <button className="gray_btn" onClick={() => deleteHandler(user._id)}>
                        Delete
                    </button>
                </>
            ) : (
                ""
            )}
        </div>
    );
}
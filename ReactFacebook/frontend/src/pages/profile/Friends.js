import { Link } from 'react-router-dom';

export default function Friends({ friends }){
    return(
        <div className='profile_card'>
            <div className='profile_card_header'>
                Friends
                <div className='profile_header_link'>See All Friends</div>
            </div>
            {friends && (
                <div className='profile_card_count'>
                    {friends.length === 0 ? "" : friends.length === 1 ? "1 Friend" : `${friends.length} Friends`}
                </div>
            )}
            <div className='profile_card_grid'>
                {friends && friends.slice(0, 9)
                    .map(
                        (friend) => (
                            <Link to={`/profile/${friend.username}`} className="profile_phot_card">
                                <img src={friend.picture} alt="" />
                                <span>
                                    {friend.first_name} {friend.last_name}
                                </span>
                            </Link>
                        )
                    )}
            </div>
        </div>
    );
}
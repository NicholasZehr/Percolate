import { fetchFeedReviews } from "../../redux/feed";
import {useDispatch} from "react-redux";

const useFeedPopulate = (currentUser, setFollowers, setFollowing) => {
    const dispatch = useDispatch()
    const list = [];
    const fol = [];
    let mounted = true;
        //======push followers in list,and following in fol
        if (currentUser) {
            if (currentUser.following && currentUser.followers) {
                currentUser.followers.forEach((element) => {
                    //========== find wether the current profile page is followed
                    list.push(element);
                });
                currentUser.following.forEach((each) => {
                    // this is push to followiing
                    fol.push(each);
                });
            }
        }
        //fetching posts from firestore
        if (currentUser) {
            // dispatch(fetchReviews("user", user.uid));
            dispatch(fetchFeedReviews(currentUser.uid));
        }
        if (mounted) {
            setFollowers(list);
            setFollowing(fol);
        }
}
 export default useFeedPopulate
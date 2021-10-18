import { combineReducers } from "redux";
import Register from './Register'
import Login from './Login'
import Auth from './Auth'
import EditProfile from './EditProfile'
import HelpInput from './HelpInput'
import MyHelp from './MyHelp'
import HelpDetail from './HelpDetail'
import HelpForHome from './HelpForHome'
import HelpSendRequest from './HelpSendRequest'
import HelpSendReview from './HelpSendReview'
import HelpResponseRequest from './HelpResponseRequest'
import Message from './Message'

const reducer = combineReducers({
    Register,
    Login,
    Auth,
    EditProfile,
    HelpInput,
    MyHelp,
    HelpDetail,
    HelpForHome,
    HelpSendRequest,
    HelpSendReview,
    HelpResponseRequest,
    Message
})

export default reducer;
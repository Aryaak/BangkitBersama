import { combineReducers } from "redux";
import Register from './Register'
import Login from './Login'
import Auth from './Auth'
import EditProfile from './EditProfile'
import HelpInput from './HelpInput'
import MyHelp from './MyHelp'
import HelpDetail from './HelpDetail'

const reducer = combineReducers({
    Register,
    Login,
    Auth,
    EditProfile,
    HelpInput,
    MyHelp,
    HelpDetail
})

export default reducer;
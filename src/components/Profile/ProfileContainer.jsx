import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../Redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../HOC/withAuthRedirect"
import { compose } from "redux";
import {getStatus} from "../../Redux/profileReducer"
import {updateStatus} from "../../Redux/profileReducer"


class ProfileContainer extends React.Component {
    
    componentDidMount() {
        // debugger;
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);
            this.props.getStatus(userId);
 
        
    }  

    render() {
        return (
                <Profile {...this.props} 
                profile={this.props.profile} 
                status={this.props.status} 
                updateStatus={this.props.updateStatus}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose (
    connect (mapStateToProps, {getUserProfile, getStatus, updateStatus }),
    withRouter,
    withAuthRedirect,
)
(ProfileContainer)


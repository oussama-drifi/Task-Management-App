import './contactSkeleton.css';

const ContactSkeleton = ({isContentLoaded}) => {
    return (
        <div className={`skeleton ${isContentLoaded ? "done-loading" : "" }`}>
            <div className="profile-image"></div>
            <div className="content">
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default ContactSkeleton;
import './contactSkeleton.css';

const ContactSkeleton = () => {
    return (
        <div className="skeleton">
            <div className="profile-image"></div>
            <div className="content">
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default ContactSkeleton;
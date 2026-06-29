import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '../../store/slices/uiSlice';
import './Notification.css';

const ICONS = {
    success: 'bi-check-circle-fill',
    error:   'bi-x-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info:    'bi-info-circle-fill',
};

const AUTO_DISMISS_MS = 4000;

const Notification = () => {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.ui.notification);

    // Auto-dismiss after AUTO_DISMISS_MS
    useEffect(() => {
        if (!notification) return;
        const timer = setTimeout(() => dispatch(clearNotification()), AUTO_DISMISS_MS);
        return () => clearTimeout(timer);
    }, [notification, dispatch]);

    if (!notification) return null;

    return (
        <div
            className={`notification notification--${notification.type}`}
            role="alert"
            aria-live="assertive"
        >
            <i className={`bi ${ICONS[notification.type] || ICONS.info} notification__icon`}></i>
            <span className="notification__message">{notification.message}</span>
            <button
                className="notification__close"
                onClick={() => dispatch(clearNotification())}
                aria-label="Dismiss notification"
            >
                <i className="bi bi-x"></i>
            </button>
        </div>
    );
};

export default Notification;

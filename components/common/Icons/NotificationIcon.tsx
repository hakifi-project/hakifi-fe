import React from 'react';

const NotificationIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12.7117 17.1579C11.0741 18.2807 8.92575 18.2807 7.28807 17.1579M4.2801 7.89474C4.2801 4.63916 6.84099 2 10 2C13.159 2 15.7199 4.63916 15.7199 7.89474V10.0655C15.7199 11.3955 16.1019 12.6958 16.8178 13.8024L16.9307 13.977C17.1117 14.2568 16.9171 14.6316 16.5907 14.6316H3.40925C3.08293 14.6316 2.8883 14.2568 3.06931 13.977L3.18221 13.8024C3.89809 12.6958 4.2801 11.3955 4.2801 10.0655V7.89474Z" stroke="#768394" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

    );
};

export default NotificationIcon;

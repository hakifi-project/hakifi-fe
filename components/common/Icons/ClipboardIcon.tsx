import React from 'react';

const ClipboardIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M13.6 14.2C14.4401 14.2 14.8601 14.2 15.181 14.0474C15.4632 13.9132 15.6927 13.699 15.8365 13.4356C16 13.1361 16 12.7441 16 11.96V5.24C16 4.45593 16 4.06389 15.8365 3.76441C15.6927 3.50099 15.4632 3.28681 15.181 3.15259C14.8601 3 14.4401 3 13.6 3H9.4C8.55992 3 8.13988 3 7.81901 3.15259C7.53677 3.28681 7.3073 3.50099 7.16349 3.76441C7 4.06389 7 4.45593 7 5.24M6.4 17H10.6C11.4401 17 11.8601 17 12.181 16.8474C12.4632 16.7132 12.6927 16.499 12.8365 16.2356C13 15.9361 13 15.5441 13 14.76V8.04C13 7.25593 13 6.86389 12.8365 6.56441C12.6927 6.30099 12.4632 6.08681 12.181 5.95259C11.8601 5.8 11.4401 5.8 10.6 5.8H6.4C5.55992 5.8 5.13988 5.8 4.81901 5.95259C4.53677 6.08681 4.3073 6.30099 4.16349 6.56441C4 6.86389 4 7.25593 4 8.04V14.76C4 15.5441 4 15.9361 4.16349 16.2356C4.3073 16.499 4.53677 16.7132 4.81901 16.8474C5.13988 17 5.55992 17 6.4 17Z" stroke="#768394" strokeWidth="1.5" />
        </svg>
    );
};

export default ClipboardIcon;


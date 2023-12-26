import React from 'react';

const ErrorIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M16.707 2.293C16.52 2.105 16.266 2 16 2H8C7.734 2 7.48 2.105 7.293 2.293L2.293 7.293C2.105 7.48 2 7.734 2 8V16C2 16.266 2.105 16.52 2.293 16.707L7.293 21.707C7.48 21.895 7.734 22 8 22H16C16.266 22 16.52 21.895 16.707 21.707L21.707 16.707C21.895 16.52 22 16.266 22 16V8C22 7.734 21.895 7.48 21.707 7.293L16.707 2.293ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#F02C62" />
        </svg>
    );
};

export default ErrorIcon;

import React from 'react';
const authIndexPage = (props) => (
    <div>
        <h1>The Auth Index Page: {props.appName}</h1>
    </div>
);

authIndexPage.getInitialProps = async ({req}) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({appName: 'Super App Auth'});
        }, 1000);
    });
    
    return promise;
}
export default authIndexPage;

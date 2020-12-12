import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import User from '../components/User';

class IndexPage extends Component {

    static getInitialProps(context) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({appName: 'Super App'});
            }, 1000);
        });
        
        return promise;
    }

    render() {
        return (
            <div>
                <h1>The Main Page of {this.props.appName}</h1>
                <p>Go to <Link href="/auth"><a>Auth</a></Link></p>
                <button onClick={() => Router.push('/auth')}> Go To Auth</button>
                <User name="Damien" age="36" />
            </div>
        );
    }

}
export default IndexPage;

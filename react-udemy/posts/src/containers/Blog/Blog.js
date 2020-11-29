import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
//import NewPost from './NewPost/NewPost';

// const AsyncNewPost = asyncComponent(() => {
//     return import('./NewPost/NewPost');
// });
const AsyncNewPost = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: true
    }
    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink 
                                activeClassName="my-active"
                                to="/posts" 
                                exact>Posts</NavLink>
                                </li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>}/>
                <Route path="/" render={() => <h1>Home 2 </h1>}/>
                <Route path="/" exact render={() => <Posts/>}/> */}

                <Switch>
                    {/* {this.state.auth? <Route path="/new-post" component={AsyncNewPost} />: null}                     */}
                    {this.state.auth? <Route path="/new-post" render={() => <Suspense fallback={<div>Loading</div>}><AsyncNewPost/></Suspense>} />: null}    
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <h1>Not Found</h1>}/>
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;
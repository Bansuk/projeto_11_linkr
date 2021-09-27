import { Route } from "react-router";
import { CSSTransition } from "react-transition-group";
import MyLikes from "./myLikes";
import UsersPosts from "./usersPosts";
import MyPosts from "./myPosts";
import Hashtag from "./Hashtag";
import Timeline from "./Timeline";

export default function AnimatedTransition() {
    const routes = [
        { path: "/timeline", Component: Timeline },
        { path: "/my-posts", Component: MyPosts },
        { path: "/hashtag/:idHashtag", Component: Hashtag },
        { path: "/user/:id", Component: UsersPosts },
        { path: "/my-likes", Component: MyLikes },
    ];

    return (
        <>
            {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                    {({ match }) => (
                        <CSSTransition
                            in={match != null}
                            timeout={1000}
                            classNames="page"
                            unmountOnExit
                        >
                            <div className="page">
                                <Component />
                            </div>
                        </CSSTransition>
                    )}
                </Route>
            ))}
        </>
    );
}

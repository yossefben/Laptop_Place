import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../../services/usersService";

const ProtectedRoute = ({ component: Component, render, biz, ...rest }) => {
  const currentUser = getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser || (biz && !currentUser.biz)) {
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;

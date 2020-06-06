import React from "react";
import HomePage from "./pages/HomePage";
import UsersListPage, { loadData } from "./pages/UsersListPage";
import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";
import AdminsListPage from "./pages/AdminsListPage";

//for ssr, instead of using normal react router, we have to use react-router-config, and pass it an array of objects as routes instead of the easier to read syntax.
// import { Route } from "react-router-dom";

// export default () => {
//   return (
//     <div>
//       <Route exact path="/" component={Home} />
//       {/* <Route path="/test" component={() => "test route works fine!"} /> test worked fine */}
//       <Route path="/users" component={UsersList} />
//     </div>
//   );
// };

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: "/",
        // component: HomePage,
        exact: true,
      },
      {
        ...AdminsListPage,
        path: "/admins",
      },
      {
        ...UsersListPage,
        path: "/users",
        // loadData: loadData,
        // component: UsersListPage,
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];

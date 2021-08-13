export function getUserPath(token) {
  // Convert the JWT To Object
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  let tokenObj = JSON.parse(jsonPayload);
  // Get the role
  switch (tokenObj.role) {
    case "User":
      return "/UserDashboard/Meals";

    case "Manager":
      return "/managerDashboard";

    case "Admin":
      return "/AdminDashboard/Users";

    default:
      return "/";
  }
}

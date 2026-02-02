/**
 * PATH를 추가한 뒤, middleware에 public, private을 반드시 추가해야함
 */
export const PATH = {
  /* public route */
  //root
  HOME: "/",

  // auth
  LOGIN: "/login",
  SIGNUP: "/signup",

  /* private route */
  //member
  PROFILE_CREATE: "/profile/new",

  //타이머
  TIMER: "/",
  TODO: "/todo",
};

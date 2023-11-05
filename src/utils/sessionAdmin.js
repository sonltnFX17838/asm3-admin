const sessionAdmin = () => {
  const session = JSON.parse(localStorage.getItem("sessionAdmin"));
  if (session) {
    return session;
  } else {
    return false;
  }
};

export default sessionAdmin;

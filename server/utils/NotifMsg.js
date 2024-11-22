export const notif = (str) => {
  const msg = {
    to: str,
    from: "lesterabao@gmail.com", // Use the email address or domain you verified above
    subject: "New Comment to your post",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>There is a new comment in one of your post. Please check you Aperture account</strong>",
  };
  return msg;
};

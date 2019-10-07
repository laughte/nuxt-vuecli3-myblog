export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
  // if (!state.user.userName) {
  //   return redirect('/signin')
  // }
}

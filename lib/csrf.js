/**
 * app.dynamicHelpers({
 *   csrf: csrf.token
 * });
 * 
 * Add csrf parameter to view (ejs example):
 * <form>
 *   <input type="hidden" name="csrf" value="<%- csrf %>" />
 * </form>
 */
exports.token = function(req, res) {
  if(req.session.csrf == null) {
      req.session.csrf = '' + new Date().getTime() + Math.random();
  }
  return req.session.csrf;
};

/**
 * Express/Connect middleware function for checking csrf token. Usage:
 * 
 * app.use(csrf.check());
 */
exports.check = function() {
  return function(req, res, next) {
    // If request is ajax, no need to check csrf.
    if (!req.xhr && req.body && req.method.toLowerCase() === 'post') {
      var session_csrf = req.session.csrf;
      req.session.csrf = null;
      if (req.body.csrf !== session_csrf) {
        return res.send("Cross-site request forgery attempt discovered!", 403);
      }
    }
    return next();
  };
};

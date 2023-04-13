let token = ''
const urls = {
  prev: '',

  // Admin Auth
  register: '/admin/auth/register', // POST
  login: '/admin/auth/login', // POST
  logout: '/admin/auth/logout', // POST

  // Admin Quiz Management
  getQuizList: '/admin/quiz', // GET
  createQuiz: '/admin/quiz/new', // POST
  getQuizById: '/admin/quiz/{quizid}', // GET
  updateQuizById: '/admin/quiz/{quizid}', // PUT
  deleteQuizById: '/admin/quiz/{quizid}', // DELETE
  startQuizById: '/admin/quiz/{quizid}/start', // POST
  advanceQuizById: '/admin/quiz/{quizid}/advance', // POST
  endQuizById: '/admin/quiz/{quizid}/end', // POST
  getStatusBySessionid: '/admin/session/{sessionid}/status', // GET
  getResultsBySessionid: '/admin/session/{sessionid}/results', // GET

  // Player
  joinBySessionid: '/play/join/{sessionid}', // POST
  getPlayStatus: '/play/{playerid}/status', // GET
  getQuestion: '/play/{playerid}/question', // GET
  getAnswer: '/play/{playerid}/answer', // GET
  submitAnswer: '/play/{playerid}/answer', // PUT
  getresults: '/play/{playerid}/results', // GET

}

const util = {}
util.fetch = (url, method, okCallback, errorCallback, data, headers) => {
  const option = {
    method,
    credentials: 'include',
    headers: { }
  };
  if (data) {
    option.body = data;
  }
  if (headers) {
    option.headers = { ...headers, ...option.headers };
  }
  if (token) {
    option.headers.Authorization = `Bearer ${token}`
    console.log('Has token req:', option.headers.Authorization)
  }
  fetch(urls.prev + url, option)
    .then(response => response.json())
    .then(response => {
      if (okCallback) okCallback(response);
    })
    .catch(error => {
      if (errorCallback) errorCallback(error);
    });
}
util.postJson = (url, okCallback, errorCallback, data) => {
  util.fetch(url, 'POST', okCallback, errorCallback, JSON.stringify(data), util.fetchConfig.contentTypeJson);
}
util.putJson = (url, okCallback, errorCallback, data) => {
  util.fetch(url, 'PUT', okCallback, errorCallback, JSON.stringify(data), util.fetchConfig.contentTypeJson);
}
util.delete = (url, okCallback, errorCallback) => {
  util.fetch(url, 'DELETE', okCallback, errorCallback);
}
util.getJson = (url, okCallback, errorCallback) => {
  util.fetch(url, 'GET', okCallback, errorCallback, null, null);
}
util.fetchConfig = {
  contentTypeJson: {
    'content-type': 'application/json'
  },
  contentTypeText: {
    'content-type': 'application/txt'
  }
};

util.deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}
util.getSession = (key) => {
  return sessionStorage.getItem(key);
}
util.getObjSession = (key) => {
  return JSON.parse(util.getSession(key));
}
util.setSession = (key, value) => {
  return sessionStorage.setItem(key, typeof (value) === 'string' ? value : JSON.stringify(value));
}
util.clearSession = () => {
  sessionStorage.clear();
}
util.isLogin = () => {
  return util.getObjSession('userinfo')
}
util.getLoginInfo = () => {
  return util.getObjSession('userinfo')
}
util.setLoginInfo = (obj) => {
  return util.setSession('userinfo', obj)
}
export default {
  getLoginInfo: util.getLoginInfo,
  setLoginInfo: util.setLoginInfo,
  setSession: util.setSession,
  login ({ email, password }, cb) {
    util.postJson(urls.login, res => {
      if (res.token) {
        token = res.token
      }
      cb(res)
    }, null, { email, password })
  },
  reg ({ email, password, name }, cb) {
    util.postJson(urls.register, res => {
      if (res.token) {
        token = res.token
      }
      cb(res)
    }, null, { email, password, name })
  },
  logout (cb) {
    util.postJson(urls.register, res => {
      if (!res.error) {
        token = null
        console.log('-----< Clear token')
      }
      cb(res)
    }, null, null)
  }
}

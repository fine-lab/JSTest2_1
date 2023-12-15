let AbstractAPIHandler = require("AbstractAPIHandler");
class MyAPIHandler extends AbstractAPIHandler {
  execute(request) {
    var token = "yourtokenHere";
    var url = "https://www.example.com/" + token;
    var header = { "Content-Type": "application/json;charset=UTF-8" };
    var body = {
      fields: ["id", "code", "name"]
    };
    let apiResponse = postman("post", url, JSON.stringify(header), JSON.stringify(body));
    return { apiResponse };
  }
}
exports({ entryPoint: MyAPIHandler });
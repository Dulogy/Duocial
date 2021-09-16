export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%name'
    let encodedValue = encodeURIComponent(params[property]); // ak 123456  => ak123456

    formBody(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&'); // username=ak&password=123456
}

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  if (options) {
    const xhr = new XMLHttpRequest();
    let formData = new FormData();
    let sendURL = options.url;
    if (options.method !== "GET") {
      Object.entries(options.data).forEach(([key, value]) =>
        formData.append(key, value)
      );
    } else {
      formData = "";
      if (!sendURL.includes("/account")) {
        const params = new URLSearchParams();
        if (options.data) {
          Object.entries(options.data).forEach(([key, value]) =>
            params.append(key, value)
          );
          sendURL = sendURL + "?" + params;
        }
      }
    }
    try {
      xhr.open(options.method, sendURL);
      xhr.send(formData);
    } catch (err) {
      options.callback(err, null);
    }
    xhr.responseType = "json";

    xhr.addEventListener("load", () => {
      if (xhr.response.success) {
        options.callback(null, xhr.response);
      } else {
        options.callback(new Error(xhr.response.error), null);
      }
    });
  }
};

// createRequest({
//   url: "/", // адрес
//   data: {
//     // произвольные данные, могут отсутствовать
//     email: "ivan@poselok.ru",
//     password: "odinodin",
//   },
//   method: "GET", // метод запроса
//   /*
//       Функция, которая сработает после запроса.
//       Если в процессе запроса произойдёт ошибка, её объект
//       должен быть в параметре err.
//       Если в запросе есть данные, они должны быть переданы в response.
//     */
//   callback: (err, response) => {
//     // console.log("Ошибка, если есть", err);
//     // console.log("Данные, если нет ошибки", response);
//   },
// });

export const generateRandomId = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const debounce = (func, delay) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
};

export const sortedToDos = (data) => {
  return data.slice().sort((a, b) => {
    const aValue = a.title;
    const bValue = b.title;
    return aValue.localeCompare(bValue);
  });
};

export const searchToDos = (data, searchToDo) => {
  console.log(data);
  let regex = new RegExp(`\\b(${searchToDo}|${searchToDo}\\w*)\\b`, "i");

  let filterdata = {};
  for (let key in data) {
    let resultRegex = regex.test(key.title);
    if (resultRegex) {
    }
  }
  const newData = Object.entries(data).filter(([id, { title }]) => {
    console.log(id, title);
    let regex = new RegExp(`\\b(${searchToDo}|${searchToDo}\\w*)\\b`, "i");
    let resultRegex = regex.test(title);
    if (resultRegex) {
      return [id, { title }];
    }
  });
  console.log(newData);
};



const createObject = (fields, gObject) => {
  let obj = null;
  for (const key of Object.keys(fields)) {
    let value = null;
    if (typeof fields[key] === 'object') {
      value = createObject(fields[key], gObject);
    }
    if (typeof fields[key] === 'string') {
      try {
        const field = eval(`gObject.${fields[key]}`);
        value = typeof field === 'string' ? field : null;
        value = !value && typeof field === 'object' && field.text ? field.text : value;
      } catch (err) {
        // do nothing;
      }
    }
    if (value) {
      obj = obj || {};
      obj[key] = value;
    }
  }
  return obj;
};

const createShelves = (user) => {
  if (user.user_shelves
    && user.user_shelves.user_shelf && user.user_shelves.user_shelf.length > 0) {
    return { shelves: user.user_shelves.user_shelf.map((value) => value.name.text) };
  }
  return null;
};

export const modelUser = (user) => {
  const fields = {
    id: 'id',
    name: 'name',
    link: 'link',
    image: {
      default: 'image_url',
      small: 'small_image_url',
    },
  };
  return Object.assign({},
    createObject(fields, user),
    createShelves(user));
};

export const modelShelfItem = (item) => {
  const fields = {
    id: 'book.id',
    dateAdded: 'date_added',
    dateUpdated: 'date_updated',
  };
  return createObject(fields, item);
};

export const modelBook = (book) => {
  const fields = {
    id: 'id',
    title: 'title',
    description: 'description',
    isbn: 'isbn',
    isbn13: 'isbn13',
    image: {
      default: 'image_url',
      small: 'small_image_url',
    },
    author: 'authors.author.name',
  };
  return createObject(fields, book);
};

const generateSlug = (name) => {
  let slug = name
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  slug = slug + "-" + Math.floor(Math.random() * 100000 + 10000);

  return slug;
};

module.exports = generateSlug;

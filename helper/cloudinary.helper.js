const getPublicId = (url) => {
  const match = url.match(/upload\/(?:v\d+\/)?([^\.]+)/);

  return match ? match[1] : null;
};

module.exports = getPublicId;

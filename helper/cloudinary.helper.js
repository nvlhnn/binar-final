const getPublicId = (url) => {
  const match = url.match(/upload\/(?:v\d+\/)?([^\.]+)/)[1];

  return match;
};

module.exports = getPublicId;

const buildDatabaseURL = (databaseURL, username, password, dbname) => {
  return databaseURL.replace('<USERNAME>', username).replace('<PASSWORD>', password).replace('<DATABASE_NAME>', dbname);
};

module.exports = buildDatabaseURL;

const fs = require('fs');

const getSavedMapPath = (name) => {
  return `etc/savedMaps/${name}.json`;
} 

module.exports.write = (name, settings, geomType, table) => {

  const basePath = getSavedMapPath(name);
  const stream = fs.createWriteStream(basePath, 'utf8');

  const saved = {
    name,
    settings,
    geomType,
    table,
  }
  stream.write(JSON.stringify(saved));
  
}

module.exports.read = (name) => {

  const basePath = getSavedMapPath(name);

  const data = fs.readFileSync(basePath);
  return data
}

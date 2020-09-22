const Obserser = require('./services/observer');

var obserser = new Obserser();

const file = 'Performance/logs/info.log';

obserser.on('file-updated', log => {
  console.log(log.message);
});

obserser.watchFile(file);
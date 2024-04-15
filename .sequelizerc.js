const path = require('path');

module.exports = {
  'config': path.resolve('db', 'config', 'config.js'), // Путь к файлу конфигурации базы данных
  // 'models-path': path.resolve('news-site', './site/model-news'), // Путь к файлу с моделями
  'migrations-path': path.resolve('db', 'migrations') // Путь к директории с миграциями
};
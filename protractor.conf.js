var config = {};

  config.seleniumAddress = 'http://localhost:4444/wd/hub';
  config.multiCapabilities = [
  {
    'browserName': 'firefox'
  }
];

config.suites = {
  homepage: 'test/e2e/homepage/**/*.spec.js'
};

config.jasmineNodeOpts = {
  isVerbose: true,
  showColors: true,
  defaultTimeOutInterval: 3000
};

config.baseUrl = 'http://localhost:5555';

exports.config = config;

module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$":
      "<rootDir>/test/frontend/__mocks__/fileMock.js",
    "\\.(gif|ttf|eot|svg|png)$":
      "<rootDir>/test/frontend/__mocks__/fileMock.js",

    // added
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(jpg|jpeg|png)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.jpeg$": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    // "^.+\\.jsx?$": "babel-jest",
    // "\\.(png|jpg)$": "jest-transform-stub",
    // "\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "^.+\\.js$": "babel-jest",
    "^.+\\.css$": "jest-transform-stub",
    // "^(?!.*\\.(jsx?|tsx?|json)$)": "<rootDir>/path/to/custom-transformer",
  },
  //   transformIgnorePatterns: [
  //     "^.+\\.jpeg$", // add this line to ignore jpeg files
  //   ],
};

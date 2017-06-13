## Dependencies

+ webpack
+ webpack-dev-server
+ webpack-merge
+ css-loader
+ style-loader
+ babel-loader
+ babel-core
+ babel-preset-es2015
+ babel-preset-react

## Generating Ids

We’ll use a standard known as **RFC41221**. It allows us to generate unique ids. We’ll be using a Node.js implementation known as node-uuid and its **uuid.v4** variant.
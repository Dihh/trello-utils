#!/bin/bash

npm run build
rm docs/*
sed -i "s/\/assets\///" dist/index.html
mv dist/assets/* dist/
rm -R dist/assets/
mv dist/* docs/
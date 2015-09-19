#!/bin/bash

mkdir tmp-dir
cp manifest.json tmp-dir/
cp duo-prioritize.js tmp-dir/
zip tmp-package tmp-dir/*

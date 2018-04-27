#!/bin/sh

echo $MIMACTOOLS_PATH

echo "Build the mimac framework for :"
echo "  - Data analysis"
echo "  - Simulation"
echo "  - Phenomenology"

cp $MIMACTOOLS_PATH/config/framework/CMakeLists.txt .
#cp $MIMACTOOLS_PATH/config/framework/FindFFTW.cmake .
#cp $MIMACTOOLS_PATH/config/framework/FindROOT.cmake .
cp -rf $MIMACTOOLS_PATH/config/framework/include .
cp -rf $MIMACTOOLS_PATH/config/framework/src .


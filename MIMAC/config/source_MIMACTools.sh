SYSTEM=`uname` 


export PATH=$PATH:$MIMACTOOLS_PATH/bin

if [[ $SYSTEM == "Darwin" ]]
then
    export DYLD_LIBRARY_PATH=$MIMACTOOLS_PATH/lib:$DYLD_LIBRARY_PATH
    
else if [[ $SYSTEM == "Linux" ]]
     then
	 export LD_LIBRARY_PATH=$MIMACTOOLS_PATH/lib:$LD_LIBRARY_PATH
	 
     fi
fi

alias buildFramework='$MIMACTOOLS_PATH/config/framework/buildMimacEnv.sh'
alias buildFramework_GeneObs='$MIMACTOOLS_PATH/config/framework/buildMimacEnv_GeneObs.sh'

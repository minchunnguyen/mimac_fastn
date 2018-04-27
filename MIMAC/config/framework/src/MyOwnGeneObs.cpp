#include "MyOwnGeneObs.h"


MyOwnGeneObs::MyOwnGeneObs(TTree* tree, int eventNb, string option)
  : GenerateObs(tree,eventNb,option)
{

  tree->Branch("toto",&toto,"toto/I");


  

}

  
void MyOwnGeneObs::AdditionalVariablesComputation(MimacObjectAnalysis* event){



  

}
 

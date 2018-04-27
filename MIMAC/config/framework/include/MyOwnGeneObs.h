#include <iostream>

#include "GenerateObs.h"

using namespace std;



class MyOwnGeneObs: public GenerateObs{



 public:
  MyOwnGeneObs(TTree* tree, int eventNb, string option = "");

  ~MyOwnGeneObs(){};


  
  virtual void AdditionalVariablesComputation(MimacObjectAnalysis* event);
  
 private:

  int toto;
  
};



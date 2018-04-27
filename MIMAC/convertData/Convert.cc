#include <TFile.h>
#include <TCanvas.h>
#include <TApplication.h>
#include <TF1.h>
#include <TF2.h>
#include <TF2.h>
#include <TH1D.h>
#include <TH2D.h>
#include <TStyle.h>
#include <TLegend.h>
#include <TGraphErrors.h>
#include <TChain.h>
#include <TEntryList.h>
#include <TMultiGraph.h>
#include <TMath.h>

#include <TSQLServer.h>
#include <TSQLResult.h>
#include <TSQLRow.h>

#include <boost/algorithm/string.hpp>
#include <iostream>
#include <vector>
#include <sstream>

#include "ReadMimacEvent.h"

//#include "DataBaseMimac.hh"

#include "MimacDaqDataBaseConnection.hh"

using namespace std;
using namespace boost;


struct MetaContainer{

  int NEvent, TimeStart, TimeEnd, Calib, Selection, Th, FirstEvent, LastEvent, Master;

  u_int16_t Chamber, PostMax, ElectronicsSerial;

  float Drift, Gain, Adapt;

  string TimeStart_str, TimeEnd_str, Comment, Xth, Yth, PreAmpliSerial, DetectorID, ChamberInterface, Firmware, Gas, Location, FileName;

};

bool myfunction (MetaContainer i,MetaContainer j) { return (i.TimeStart<j.TimeStart); }

int main(int argc,char** argv){


  TApplication theApp("App", &argc, argv);

  const int NbCham = 2;

  struct tm xmas;
   //strptime("2013-10-10 08:43:57","%Y-%m-%d %T", &xmas);
  time_t epoch;
  //epoch = mktime(&xmas);



  char* server = (char*)"lpsc-mysql.in2p3.fr";    // put here the hostname of the MySQL server
  char* user = (char*)"mimac_user";            // put here the username of the MySQL account
  char* password = (char*)"msa96186";        // put here the password of the MySQL account
  char* database = (char*)"mimac";        // put here the name of the MySQL database

  string DataPath = (char*)"/Users/riffard/Data/";


  TSQLServer *sqlServer = TSQLServer::Connect("mysql://lpsc-mysql.in2p3.fr/mimac","lamblin", "SLfgd564vcx8gbs87");


  char query [1000];

  string DateInit = "2014-02-30 15:07:00";

  vector<MetaContainer  > MetaData;


  for(int ich = 0; ich < NbCham; ich ++){

    //sprintf(query,"SELECT time, stopTime,dataFileName,isMasterMode  FROM `runChamber%d`  WHERE `time`>= '%s' ORDER BY `runChamber%d`.`time` ASC",ich+1,DateInit.c_str(),ich+1);
    sprintf(query,"SELECT *  FROM `runChamber%d`  WHERE `time`>= '%s' and `time`<'2014-02-30 00:00:00' ORDER BY `runChamber%d`.`time` ASC",ich+1,DateInit.c_str(),ich+1);

    cout<<query<<endl;
    TSQLResult *result;
    result = sqlServer->Query(query);
    const int nrows = result->GetRowCount();

    TSQLRow *row;

    for(int irow = 0; irow< nrows ; irow++){


      //if(irow > 5 ) break;
      //cout<<"ATTENTION BREAK DE TAILLE ICI !!!"<<endl;

      MetaContainer Temp_meta;
      Temp_meta.Chamber = ich+1 ;//Chamber num

      row = result->Next();

      strptime(((string)row->GetField(0)).c_str(),"%Y-%m-%d %T", &xmas);
      epoch = mktime(&xmas);
      epoch = mktime(&xmas);

      Temp_meta.TimeStart = (int)epoch; //epoch start

      Temp_meta.TimeStart_str = (string)row->GetField(0);


      Temp_meta.FileName = (string)row->GetField(1);


      Temp_meta.Th = atoi(row->GetField(3));

      Temp_meta.Drift = atof(row->GetField(5));

      Temp_meta.Gain =atof(row->GetField(6));
      Temp_meta.Adapt = atof(row->GetField(7));


      Temp_meta.Selection =atof(row->GetField(10));

      Temp_meta.Calib =atof(row->GetField(11));


      Temp_meta.Comment =atof(row->GetField(12));



      strptime(((string)row->GetField(13)).c_str(),"%Y-%m-%d %T", &xmas);
      epoch = mktime(&xmas);
      epoch = mktime(&xmas);

      Temp_meta.TimeEnd_str = (string)row->GetField(13);

      Temp_meta.TimeEnd = (int)epoch;



      Temp_meta.Xth = (string)row->GetField(15);

      Temp_meta.Yth = (string)row->GetField(16);

      Temp_meta.PostMax = atoi(row->GetField(17));


      Temp_meta.ElectronicsSerial  = atoi(row->GetField(18));
      Temp_meta.PreAmpliSerial = (string)row->GetField(19);
      Temp_meta.DetectorID = (string)row->GetField(20);
      Temp_meta.ChamberInterface = (string)row->GetField(21);
      Temp_meta.Firmware = (string)row->GetField(22);
      Temp_meta.Gas = (string)row->GetField(23);
      Temp_meta.Location = (string)row->GetField(24);

      Temp_meta.Master = atoi(row->GetField(25));


      int Nevent = atol(row->GetField(4));

      if( Temp_meta.TimeStart_str == (string)"0000-00-00 00:00:00" || Temp_meta.TimeEnd_str == (string)"0000-00-00 00:00:00" || Nevent == 0){

	ReadMimacEvent* evt = new ReadMimacEvent(DataPath+Temp_meta.FileName,256);

	if(Temp_meta.TimeStart_str == (string)"0000-00-00 00:00:00")Temp_meta.TimeStart = evt->GetFirstTimeStamp();
	if(Temp_meta.TimeEnd_str == (string)"0000-00-00 00:00:00")Temp_meta.TimeEnd = evt->GetLastTimeStamp();

	Nevent = 2;
	delete evt;
      }



      //if(Nevent == 0 || Nevent ==1)

	MetaData.push_back(Temp_meta);




    }

  }


  cout<<"done"<<endl;

  cout<<"File to process: "<<endl;
  for(int i=0; i< MetaData.size(); i++){
    cout<<"  - "<<MetaData[i].FileName<<endl;
  }
  cout<<"Press Enter to continue..."<<endl;
  getchar();
  for(int i =0; i < MetaData.size(); i++){


    //cout<<MetaData[i].Chamber<<"\t"<<MetaData[i].TimeStart_str<<"\t"<<MetaData[i].TimeStart <<"\t"<<MetaData[i].TimeEnd_str<<"\t"<<MetaData[i].FileName<<endl;
  }
  cout<<"--------------------------------------------------"<<endl;
  //
  // S o r t i n g  f i l e s   i n  f u n c t i o n   o f   t h e   d a t e
  // o f   t h e   f i l e  s t a r t
  //
  sort ( MetaData.begin(), MetaData.end(), myfunction);

  //
  // C o n n e c t i o n   t o   t h e   d a t a b a s e
  //

  if (!DataBaseMimac::getInstance()->connect("127.0.0.1", 5432, "mimac", "mimac", "mimacPwd", "") )
    return 1;

  DataBaseMimac *dbmimac =DataBaseMimac::getInstance();



  //
  // L o o p   o n   s o r t e d   f i l e   a n d   d a t a b a s e   f i l l i n g
  //
  for(int i =0; i < MetaData.size(); i++){

    //cout<<MetaData[i].Chamber<<" "<<MetaData[i].TimeStart_str<<" "<<MetaData[i].TimeStart <<" "<<MetaData[i].TimeEnd_str<<" "<<MetaData[i].FileName<<"  "<<MetaData[i].Master<<" "<<flush;

    int TimeStartRun = MetaData[i].TimeStart;
    int TimeEndRun = MetaData[i].TimeEnd;

    int NbAssociation = 0;

    for(int j=i+1; j < MetaData.size(); j++){

      //cout<< MetaData[j].TimeStart<<"\t"<<MetaData[i].TimeEnd<<endl;

      if(MetaData[j].TimeStart> MetaData[i].TimeEnd) {

	if(NbAssociation ==0){
	  cout<<endl<< "new Single Runs ... "<<MetaData[i].TimeStart_str<<endl;

	  ReadMimacEvent* Event1 = new ReadMimacEvent(DataPath+MetaData[i].FileName,256);

	  const int short mode = MetaData[i].Calib;

	  string base = "";

	  if(mode == 1) base += "Calib ";
	  if(MetaData[i].Selection == 1) base += Form("Selection_Ch%d ",MetaData[i].Chamber);

	  const string comment = base;

	  const time_t RunTimeStart = TimeStartRun+2*3600;
	  const time_t RunTimeEnd = TimeEndRun+2*3600;


	  u_int32_t runid = dbmimac->insertNewRun(mode,comment,RunTimeStart,RunTimeEnd);

	  vector<u_int8_t> Xth;
	  vector<string> th_str;
	  split(th_str, MetaData[i].Xth, is_any_of( "," ) );
	  for(int is =0; is< th_str.size(); is++)Xth.push_back(atoi(th_str[is].c_str()));

	  vector<u_int8_t> Yth;
	  th_str.clear();
	  split(th_str, MetaData[i].Yth, is_any_of( "," ) );

	  for(int is =0; is< th_str.size(); is++)Yth.push_back(atoi(th_str[is].c_str()));

	  bool sync = false;

	  //dbmimac->insertConfRunSensor(runid,MetaData[i].Chamber,MetaData[i].Drift,MetaData[i].Gain,MetaData[i].Adapt,Xth,Yth,MetaData[i].Th,MetaData[i].PostMax,MetaData[i].ElectronicsSerial, MetaData[i].PreAmpliSerial,MetaData[i].DetectorID,MetaData[i].ChamberInterface,MetaData[i].Firmware,MetaData[i].Gas,MetaData[i].Location,sync);

	  cout<<"apres"<<endl;

	  dbmimac->insertConfRunSensor(runid,MetaData[i].Chamber,MetaData[i].Drift,MetaData[i].Gain,MetaData[i].Adapt,Xth,Yth,MetaData[i].Th,MetaData[i].PostMax,MetaData[i].ElectronicsSerial, MetaData[i].PreAmpliSerial,MetaData[i].DetectorID,MetaData[i].ChamberInterface,MetaData[i].Firmware,MetaData[i].Gas,MetaData[i].Location,sync);

	  cout<<"apres"<<endl;
	  bool Good;
	  while(Event1->Read(Good)){

	    //vector<u_int32_t > VFlash = Event1->GetVectFlash();

	    //u_int64_t num = dbmimac->insertEvent( runid, MetaData[i].Chamber, Event1->GetTimeStamp(),0,VFlash.size(),Event1->GetEnergy(),VFlash);
	    //vector<u_int32_t > VFlash = Event1->GetVectFlash();

	    MimacObjectAnalysis* eventObj = Event1->GetEventObject();

	    u_int64_t num = dbmimac->insertEvent( runid, MetaData[i].Chamber, eventObj->GetTimeStamp(),eventObj->GetStartTimeSlice(),eventObj->GetEndTimeSlice(),eventObj->GetEventNrj(),*eventObj->GetNrjSignal(),eventObj->GetNStrip());


	  }


	break;
	}
      }

      NbAssociation++;

      cout<< MetaData[i].FileName<<"\t"<<MetaData[j].FileName<<endl;

      //
      // F i l e s   i n i t i a l i z a t i o n
      //

      ReadMimacEvent* Event1 = new ReadMimacEvent(DataPath+MetaData[i].FileName,256);
      ReadMimacEvent* Event2 = new ReadMimacEvent(DataPath+MetaData[j].FileName,256);

      bool GoodEvent1;
      bool FileIsReading_1 = Event1->Read(GoodEvent1);

      bool GoodEvent2;
      bool FileIsReading_2 = Event2->Read(GoodEvent2);


      int TimeEndRun;

      if( MetaData[i].Master + MetaData[j].Master == 2 ){
	cout<<"No master Mode --->>>>>"<<endl;


	TimeEndRun = Event2->GetTimeStamp();

	const int short mode = MetaData[i].Calib;

	string base = "";

	if(mode == 1) base += "Calib ";
	if(MetaData[i].Selection == 1) base += Form("Selection_Ch%d ",MetaData[i].Chamber);

	const string comment = base;

	const time_t RunTimeStart = TimeStartRun+2*3600;
	const time_t RunTimeEnd = TimeEndRun+2*3600;


	u_int32_t runid = dbmimac->insertNewRun(mode,comment,RunTimeStart,RunTimeEnd);

	vector<u_int8_t> Xth;
	vector<string> th_str;
	split(th_str, MetaData[i].Xth, is_any_of( "," ) );
	for(int is =0; is< th_str.size(); is++)Xth.push_back(atoi(th_str[is].c_str()));

	vector<u_int8_t> Yth;
	th_str.clear();
	split(th_str, MetaData[i].Yth, is_any_of( "," ) );

	for(int is =0; is< th_str.size(); is++)Yth.push_back(atoi(th_str[is].c_str()));

	bool sync = false;

	//dbmimac->insertConfRunSensor(runid,MetaData[i].Chamber,MetaData[i].Drift,MetaData[i].Gain,Xth,Yth,MetaData[i].Th,MetaData[i].PostMax,MetaData[i].ElectronicsSerial, MetaData[i].PreAmpliSerial,MetaData[i].DetectorID,MetaData[i].ChamberInterface,MetaData[i].Firmware,MetaData[i].Gas,MetaData[i].Location,sync);
	dbmimac->insertConfRunSensor(runid,MetaData[i].Chamber,MetaData[i].Drift,MetaData[i].Gain,MetaData[i].Adapt,Xth,Yth,MetaData[i].Th,MetaData[i].PostMax,MetaData[i].ElectronicsSerial, MetaData[i].PreAmpliSerial,MetaData[i].DetectorID,MetaData[i].ChamberInterface,MetaData[i].Firmware,MetaData[i].Gas,MetaData[i].Location,sync);

	bool Good;
	while(Event1->Read(Good) && Event1->GetTimeStamp() <= Event2->GetTimeStamp()){

	  //vector<u_int32_t > VFlash = Event1->GetVectFlash();

	  MimacObjectAnalysis* eventObj = Event1->GetEventObject();

	  u_int64_t num = dbmimac->insertEvent( runid, MetaData[i].Chamber, eventObj->GetTimeStamp(),eventObj->GetStartTimeSlice(),eventObj->GetEndTimeSlice(),eventObj->GetEventNrj(),*eventObj->GetNrjSignal(),eventObj->GetNStrip());

	  if(Event1->GetNbCoinc() > 0){
	    for(size_t i=0; i<eventObj->GetTrack()->size(); i++)
              dbmimac->insertTimeSliceNrjCluster(num,*eventObj->GetTrack()->at(i)->x() ,*eventObj->GetTrack()->at(i)->y(),eventObj->GetTrack()->at(i)->t());
          }
	}

	TimeStartRun = Event2->GetTimeStamp();
      }


      TimeEndRun = TMath::Min(MetaData[i].TimeEnd,MetaData[j].TimeEnd);


      const int short mode = TMath::Max(MetaData[i].Calib,MetaData[j].Calib);

      string base = "";

      if(mode == 1) base += "Calib ";
      if(MetaData[i].Selection == 1) base += Form("Selection_Ch%d ",MetaData[i].Chamber);
      if(MetaData[j].Selection == 1) base += Form("Selection_Ch%d ",MetaData[j].Chamber);

      const string comment = base;

      const time_t RunTimeStart = TimeStartRun+2*3600;
      const time_t RunTimeEnd = TimeEndRun+2*3600;


      u_int32_t runid = dbmimac->insertNewRun(mode,comment,RunTimeStart,RunTimeEnd);




      cout<<endl<<"New Run from "<<MetaData[i].TimeStart_str<<" to "<<TMath::Min(MetaData[i].TimeEnd,MetaData[j].TimeEnd)<<" "<<abs(MetaData[i].TimeEnd-MetaData[j].TimeEnd) <<endl;
      cout<< MetaData[i].FileName<<"\t"<<MetaData[j].FileName<<endl;

      //
      // S t r i p   t h e r s h o l d  s   R e a d i n g
      //

      vector<u_int8_t> Xth;
      vector<string> th_str;
      split(th_str, MetaData[i].Xth, is_any_of( "," ) );
      for(int is =0; is< th_str.size(); is++)Xth.push_back(atoi(th_str[is].c_str()));

      vector<u_int8_t> Yth;
      th_str.clear();
      split(th_str, MetaData[i].Yth, is_any_of( "," ) );
      for(int is =0; is< th_str.size(); is++)Yth.push_back(atoi(th_str[is].c_str()));

      bool sync = (MetaData[i].Master+MetaData[j].Master ==1);

      //dbmimac->insertConfRunSensor(runid,MetaData[i].Chamber,MetaData[i].Drift,MetaData[i].Gain,Xth,Yth,MetaData[i].Th,MetaData[i].PostMax,MetaData[i].ElectronicsSerial, MetaData[i].PreAmpliSerial,MetaData[i].DetectorID,MetaData[i].ChamberInterface,MetaData[i].Firmware,MetaData[i].Gas,MetaData[i].Location,sync);
      dbmimac->insertConfRunSensor(runid,MetaData[i].Chamber,MetaData[i].Drift,MetaData[i].Gain,MetaData[i].Adapt,Xth,Yth,MetaData[i].Th,MetaData[i].PostMax,MetaData[i].ElectronicsSerial, MetaData[i].PreAmpliSerial,MetaData[i].DetectorID,MetaData[i].ChamberInterface,MetaData[i].Firmware,MetaData[i].Gas,MetaData[i].Location,sync);

      cout<<"paf   runId = "<<runid <<endl;

      Xth.clear();
      th_str.clear();
      split(th_str, MetaData[j].Xth, is_any_of( "," ) );
      for(int is =0; is< th_str.size(); is++)Xth.push_back(atoi(th_str[is].c_str()));

      Yth.clear();
      th_str.clear();
      split(th_str, MetaData[j].Yth, is_any_of( "," ) );
      for(int is =0; is< th_str.size(); is++)Yth.push_back(atoi(th_str[is].c_str()));

      cout<<"Pafon"<<endl;

      //dbmimac->insertConfRunSensor(runid,MetaData[j].Chamber,MetaData[j].Drift,MetaData[j].Gain,Xth,Yth,MetaData[j].Th,MetaData[j].PostMax,MetaData[j].ElectronicsSerial, MetaData[j].PreAmpliSerial,MetaData[j].DetectorID,MetaData[j].ChamberInterface,MetaData[j].Firmware,MetaData[j].Gas,MetaData[j].Location,sync);
      dbmimac->insertConfRunSensor(runid,MetaData[i].Chamber,MetaData[i].Drift,MetaData[i].Gain,MetaData[i].Adapt,Xth,Yth,MetaData[i].Th,MetaData[i].PostMax,MetaData[i].ElectronicsSerial, MetaData[i].PreAmpliSerial,MetaData[i].DetectorID,MetaData[i].ChamberInterface,MetaData[i].Firmware,MetaData[i].Gas,MetaData[i].Location,sync);
      cout<<"Pafon"<<endl;
      //
      // F i l l i n g    e v e n t s   i n   t h e   d a t a b a s e
      //

      //ReadMimacEvent* Event1 = new ReadMimacEvent(DataPath+MetaData[i].FileName);
      //ReadMimacEvent* Event2 = new ReadMimacEvent(DataPath+MetaData[j].FileName);

      int paf=0;

      while(FileIsReading_1 == true && FileIsReading_2 ==true && Event2->GetTimeStamp()<TimeEndRun ){

	cout<<paf<<"\t"<<Event1->GetTimeStamp() <<"\t"<< Event2->GetTimeStamp()<<endl;


	if(Event1->GetTimeStamp() <= Event2->GetTimeStamp()){

	  if(GoodEvent1 != true) {
	    FileIsReading_1 = Event1->Read(GoodEvent1);
	    continue;
	  }

	  //vector<u_int32_t > VFlash = Event1->GetVectFlash();
	  //u_int64_t num = dbmimac->insertEvent( runid, MetaData[i].Chamber, Event1->GetTimeStamp(),0,VFlash.size(),Event1->GetEnergy(),VFlash);

	  //vector<u_int32_t > VFlash = Event1->GetVectFlash();
	  cout<<"tchouc"<<flush;
	  MimacObjectAnalysis* eventObj = Event1->GetEventObject();
	  cout<<"car"<<endl;
	  u_int64_t num = dbmimac->insertEvent( runid, MetaData[i].Chamber, eventObj->GetTimeStamp(),eventObj->GetStartTimeSlice(),eventObj->GetEndTimeSlice(),eventObj->GetEventNrj(),*eventObj->GetNrjSignal(),eventObj->GetNStrip());


	  if(Event1->GetNbCoinc() > 0){

	    //cout<<"track insertion 1 "<<paf<<" / "<<Event1->GetNbEvent()<<"\t"<<Event1->GetEnergy()<<endl;

	    for(size_t i=0; i<eventObj->GetTrack()->size(); i++)//for(int i=0; i<Event1->GetTime().size(); i++)
	      //dbmimac->insertTimeSliceNrjCluster(num,Event1->GetStripX()[i] ,Event1->GetStripY()[i],Event1->GetTime()[i]);
              dbmimac->insertTimeSliceNrjCluster(num,*eventObj->GetTrack()->at(i)->x() ,*eventObj->GetTrack()->at(i)->y(),eventObj->GetTrack()->at(i)->t());

	  }


	  FileIsReading_1 = Event1->Read(GoodEvent1);

	}
	else{

	  if(GoodEvent2 != true){
	    FileIsReading_2 = Event2->Read(GoodEvent2);
	    continue;
	  }

	  //vector<u_int32_t > VFlash = Event2->GetVectFlash();
	  //u_int64_t num =  dbmimac->insertEvent( runid, MetaData[j].Chamber, Event2->GetTimeStamp(),0,VFlash.size(),Event2->GetEnergy(),VFlash);

	  //vector<u_int32_t > VFlash = Event1->GetVectFlash();

	  MimacObjectAnalysis* eventObj = Event2->GetEventObject();

	  u_int64_t num = dbmimac->insertEvent( runid, MetaData[i].Chamber, eventObj->GetTimeStamp(),eventObj->GetStartTimeSlice(),eventObj->GetEndTimeSlice(),eventObj->GetEventNrj(),*eventObj->GetNrjSignal(),eventObj->GetNStrip());


	  if(Event2->GetNbCoinc() > 0){
	    //cout<<"track insertion 2 "<<paf<<" / "<<Event1->GetNbEvent()<<"\t"<<Event2->GetEnergy()<<endl;

	     for(size_t i=0; i<eventObj->GetTrack()->size(); i++)//for(int i=0; i<Event2->GetTime().size(); i++)
	       //dbmimac->insertTimeSliceNrjCluster(num,Event2->GetStripX()[i] ,Event2->GetStripY()[i],Event2->GetTime()[i]);
              dbmimac->insertTimeSliceNrjCluster(num,*eventObj->GetTrack()->at(i)->x() ,*eventObj->GetTrack()->at(i)->y(),eventObj->GetTrack()->at(i)->t());

	  }


	  FileIsReading_2 = Event2->Read(GoodEvent2);

	}

	paf++;
      }

      cout<<"fin"<<endl;

      TimeStartRun = Event2->GetTimeStamp();
      TimeEndRun = MetaData[j].TimeEnd;

      cout<<"fin"<<endl;
      //cout<<"There are "<<Event2->GetReadingEvent()<<" on "<<Event2->GetNbEvent()<<" events"<<endl;

      cout<<"paf"<<endl;
      //getchar();

      if(FileIsReading_2 == true){

	const int short mode2 = MetaData[i].Calib;

	base = "";

	if(mode == 1) base += "Calib ";
	if(MetaData[j].Selection == 1) base += Form("Selection_Ch%d ",MetaData[j].Chamber);

	const string comment2 = base;

	const time_t RunTimeStart2 = TimeStartRun+2*3600;
	const time_t RunTimeEnd2 = TimeEndRun+2*3600;


	runid = dbmimac->insertNewRun(mode2,comment2,RunTimeStart2,RunTimeEnd2);

	Xth.clear();
	th_str.clear();
	split(th_str, MetaData[j].Xth, is_any_of( "," ) );
	for(int is =0; is< th_str.size(); is++)Xth.push_back(atoi(th_str[is].c_str()));

	Yth.clear();
	th_str.clear();
	split(th_str, MetaData[j].Yth, is_any_of( "," ) );
	for(int is =0; is< th_str.size(); is++)Yth.push_back(atoi(th_str[is].c_str()));

	sync = false;

	//dbmimac->insertConfRunSensor(runid,MetaData[j].Chamber,MetaData[j].Drift,MetaData[j].Gain,Xth,Yth,MetaData[j].Th,MetaData[j].PostMax,MetaData[j].ElectronicsSerial, MetaData[j].PreAmpliSerial,MetaData[j].DetectorID,MetaData[j].ChamberInterface,MetaData[j].Firmware,MetaData[j].Gas,MetaData[j].Location,sync);
	dbmimac->insertConfRunSensor(runid,MetaData[i].Chamber,MetaData[i].Drift,MetaData[i].Gain,MetaData[i].Adapt,Xth,Yth,MetaData[i].Th,MetaData[i].PostMax,MetaData[i].ElectronicsSerial, MetaData[i].PreAmpliSerial,MetaData[i].DetectorID,MetaData[i].ChamberInterface,MetaData[i].Firmware,MetaData[i].Gas,MetaData[i].Location,sync);

	bool Good;
	while(Event2->Read(Good)){

	  //vector<u_int32_t > VFlash = Event2->GetVectFlash();

	  //u_int64_t num = dbmimac->insertEvent( runid, MetaData[j].Chamber, Event2->GetTimeStamp(),0,VFlash.size(),Event2->GetEnergy(),VFlash);
	  //vector<u_int32_t > VFlash = Event1->GetVectFlash();

	  MimacObjectAnalysis* eventObj = Event2->GetEventObject();

	  u_int64_t num = dbmimac->insertEvent( runid, MetaData[i].Chamber, eventObj->GetTimeStamp(),eventObj->GetStartTimeSlice(),eventObj->GetEndTimeSlice(),eventObj->GetEventNrj(),*eventObj->GetNrjSignal(),eventObj->GetNStrip());


	  if(Event2->GetNbCoinc() > 0){
	    for(size_t i=0; i<eventObj->GetTrack()->size(); i++)//for(int i=0; i<Event2->GetTime().size(); i++)
	      //dbmimac->insertTimeSliceNrjCluster(num,Event2->GetStripX()[i] ,Event2->GetStripY()[i],Event2->GetTime()[i]);
              dbmimac->insertTimeSliceNrjCluster(num,*eventObj->GetTrack()->at(i)->x() ,*eventObj->GetTrack()->at(i)->y(),eventObj->GetTrack()->at(i)->t());

	  }

	}

      }



      TimeStartRun = TimeEndRun;
      i++;
    }

    //cout<<endl;


  }


  return 0;
  /*

  if (!DataBaseMimac::getInstance()->connect("127.0.0.1", 5432, "mimacDB", "mimac", "mimacPwd", "") )
    return 1;

  DataBaseMimac *dbmimac =DataBaseMimac::getInstance();



  for(int i =0 ; i <MetaData.size()-1; i++){

    if(MetaData[i].Chamber == MetaData[i+1].Chamber){


//	Run Seul !!!


    }else{

      if(MetaData[i].Master != MetaData[i+1].Master && abs(MetaData[i].TimeStart-MetaData[i+1].TimeStart) && MetaData[i].Chamber != MetaData[i+1].Chamber ){


	//Run double complet !!!

	int RunTimeStart = MetaData[i].TimeStart;
	int RunTimeEnd = MetaData[i+1].TimeEnd;




	char query1[1000];
	sprintf(query1,"SELECT *  FROM `runChamber%d`  WHERE `time` = '%s'",MetaData[i].Chamber,MetaData[i].TimeStart_str.c_str());

	char query2[1000];
	sprintf(query2,"SELECT *  FROM `runChamber%d`  WHERE `time` = '%s'",MetaData[i+1].Chamber,MetaData[i+1].TimeStart_str.c_str());
	cout<<MetaData[i].Chamber<<"\t" << MetaData[i+1].Chamber<<endl;

	TSQLResult *result1;
	result1 = sqlServer->Query(query1);
	TSQLResult *result2;
	result2 = sqlServer->Query(query2);

	TSQLRow *row1;
	TSQLRow *row2;

	if(result1->GetRowCount() > 1 || result2->GetRowCount()>1 ){cout<<"problem !!!"<<endl; return 1;}

	row1 = result1->Next();
	row2 = result2->Next();

	string base = "";

	const short mode = TMath::Max(atoi(row1->GetField(11)) , atoi(row2->GetField(11)));
	if(mode == 1) base += "Calib ";

	if(atoi(row1->GetField(10)) ==1 || atoi(row2->GetField(10))==1 )base += "Selection ";

	base+= (string)row1->GetField(12);
	base+= (string)row2->GetField(12);

	const string comment = base;

	//u_int32_t runid = dbmimac->insertNewRun(mode,comment,RunTimeStart,RunTimeEnd);






	cout<<"Run Complet"<<endl;
	cout<<"A coder"<<endl;
	i++;
      }
      else {

	//First Part of the Run
	int RunTimeStart = MetaData[i].TimeStart;
	int RunTimeEnd = MetaData[i+1].FirstEvent-1;


	//  First Run creation


	//Second Part of the Run
	RunTimeStart = MetaData[i+1].FirstEvent;
	RunTimeEnd = TMath::Min(MetaData[i].LastEvent,MetaData[i+1].LastEvent);



	//  Second Run creation


	if(RunTimeEnd == MetaData[i+1].LastEvent){


	  //  Next Ch terminate during curent ch

	  cout<<"A coder"<<endl;
	}
	else{
	  cout<<"A coder"<<endl;

	}


      }






    }


  }

  cout<<"done"<<endl;

  return 0;

*/
}

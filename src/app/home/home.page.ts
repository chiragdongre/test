import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  post :any;
  date: any;
  pincode:any;
  dayslist:any;
  posta:any;
  vaccine:any;
  dayList: any[] = [];
  totalmap = new Map(); 
  constructor(private http:HttpClient,public datepipe: DatePipe) {}
  getData(code,noDays) {
    if(code.length > 0 && noDays != null ){
    this.pincode = code;
    // this.date="04-05-2021";
    // this.dayslist=[1,2]
    let today = new Date()
    const tomorrow = new Date(today)
    for(let u = 1; u <= noDays; u++){
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + u)
    let latest_date =this.datepipe.transform(tomorrow, 'dd-MM-yyyy');
    this.dayList.push(latest_date);

  }
    for (let i = 0; i < this.dayList.length; i++) {
    // if(i ==1){
    //   this.pincode = "421306";
    // }else{
    //   this.pincode = code;

    // }
    this.http.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" + this.pincode + "&date="+this.dayList[i])
    .subscribe((data) => {
      if(data["centers"].length > 0){
      this.post = JSON.stringify(data["centers"][0]["sessions"][0]["slots"]);
      this.posta = JSON.stringify(data["centers"][0]["name"]);
      this.vaccine = JSON.stringify(data["centers"][0]["sessions"][0]["vaccine"]);

      this.totalmap.set(this.dayList[i], [this.posta,this.post,this.vaccine]);    
      }else{

        this.totalmap.set(this.dayList[i], ["Not Available","Not Available","Not Available"]);

      } 

      console.log(this.totalmap);
    });
  }
  }else{

alert("Please enter the Pin code and Number of days");

  }
  }

}

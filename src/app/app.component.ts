import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
// import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

	dataset: any =[];
	avg_dataset: any[] =[];
	lat_labels: any[] =[];
	logs: any[] = [];
	logs_list: string ="";

constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {}

ngOnInit() {
	let headers = new HttpHeaders({
		"Access-Control-Allow-Origin":  '*'
	 });
	 console.log("inside",this.logs);

	//  this.activatedRoute.queryParams.subscribe(params => {
	//   this.logs = params['logs'];
	//   console.log("this.log:",this.logs);
	//   console.log(this.logs);
	//   if (this.logs){
	this.logs_list="";
	//   this.logs.forEach(element => {
	if (logs){
	logs.forEach( element => {
	      this.logs_list=this.logs_list+'logs='+element+'&';
		  this.httpClient.get('http://192.168.0.67:5010/time_log_json?'+this.logs_list).subscribe(dataset => {
			this.dataset = dataset;
			this.avg_dataset=[];
			this.lat_labels=[];
			// console.log("here is:");
			// console.log('http://192.168.0.67:5010/time_log_json?'+this.logs_list);
			this.dataset.forEach(element => {
				if (element['x']%10==0){
					this.avg_dataset.push(element)
				}
			});
			
			this.dataset.forEach(element => {
				if (element['group'].includes('lat')){
					if (!(this.lat_labels.includes(element['group']))) {
					this.lat_labels.push(element['group']);}
				}
			});
			
			this.options = {
				 "title": "FIO_Parser",
				 "axes": {
						"bottom": {
								 "title": "Time",
								 "mapsTo": "x",
								 "scaleType": "linear"
						 },
						 "left": {
								 "title": "IOPS",
								 "mapsTo": "y",
								 "scaleType": "linear"
						 },
						 "right": {
								 "title": "Lat",
								 "mapsTo": "z",
								 "correspondingDatasets": this.lat_labels,
						 }
				 },
				 "curve": "curveNatural",
				 "height": "400px"
			 };
		  });	   
	   });}
	

}

onInputChange(event: any) {
	this.avg_dataset=[]
	this.dataset.forEach(element => {
		if (element['x']%event==0){
			this.avg_dataset.push(element)
		}
	});
	return(this.avg_dataset)
  }

  options = {
	"title": "FIO_Parser",
	"axes": {
			"bottom": {
					"title": "Time",
					"mapsTo": "x",
					"scaleType": "linear"
			},
			"left": {
					"title": "IOPS",
					"mapsTo": "y",
					"scaleType": "linear"
			},
			"right": {
					"title": "Lat",
					"mapsTo": "z",
					"correspondingDatasets": this.lat_labels,
			}
	},
	"curve": "curveNatural",
	"height": "400px"
};

}
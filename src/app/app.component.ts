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
	avg_iops_dataset: any[] =[];
	avg_bw_dataset: any[] =[];	
	lat_labels: any[] =[];
	logs: any[] =[];
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
	if (this.logs){
	this.logs.forEach( element => {
	      this.logs_list=this.logs_list+'logs='+element+'&';
		  this.httpClient.get('http://192.168.0.67:5010/time_log_json?'+this.logs_list).subscribe(dataset => {
			this.dataset = dataset;
			this.avg_iops_dataset=[];
			this.lat_labels=[];
			this.avg_bw_dataset=[]

			this.dataset.forEach(element => {
				if ((element['group'].includes('_iops-')) || (element['group'].includes('_lat-'))){
				if (element['x']%10==0){
					this.avg_iops_dataset.push(element)
				}}
				if ((element['group'].includes('_bw-')) || (element['group'].includes('_lat-'))){
					if (element['x']%10==0){
						this.avg_bw_dataset.push(element)
				}}
			});
			
			this.dataset.forEach(element => {
				if (element['group'].includes('_lat-')){
					if (!(this.lat_labels.includes(element['group']))) {
					this.lat_labels.push(element['group']);}
				}
			});
			
			this.options = {
				 "title": "IOPS",
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
				 "height": "350px"
			 };
			this.options_bw = {
				"title": "BW",
				"axes": {
					   "bottom": {
								"title": "Time",
								"mapsTo": "x",
								"scaleType": "linear"
						},
						"left": {
								"title": "MB/sec",
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
				"height": "350px"
			};

		  });	   
	   });}
	

}

onInputChange(event: any) {
	this.avg_iops_dataset=[];
	this.avg_bw_dataset=[];
	this.dataset.forEach(element => {
		if ((element['group'].includes('_iops-')) | (element['group'].includes('_lat-'))){
			if (element['x']%event==0){
				this.avg_iops_dataset.push(element)
			}}
		if ((element['group'].includes('_bw-')) | (element['group'].includes('_lat-'))){
				if (element['x']%event==0){
					this.avg_bw_dataset.push(element)
			}}
	});
	return(this.avg_iops_dataset)
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
	"height": "350px"
};
options_bw = {
	"title": "BW",
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
	"height": "350px"
};

}
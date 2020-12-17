import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	serverData: JSON;

	versus="test_profile"



	constructor(private httpClient: HttpClient) {
	}
  
	
	
	
	  sayHi() {
		let headers = new HttpHeaders({
			"Access-Control-Allow-Origin":  '*'
		 })
		console.log("requesting");
	  this.httpClient.get('http://192.168.0.67:5000/unit_json?id=5fd5cb82634601dbe2d3b939').subscribe(data => { 
                console.log(data);
		this.serverData = data as JSON;
                
	  })
	  	return(this.serverData)
	}

	data = [
		{
				"group": "Dataset 1",
				"date": "2018-12-31T21:00:00.000Z",
				"value": 0
		},
		{
				"group": "Dataset 1",
				"date": "2019-01-05T21:00:00.000Z",
				"value": -37312
		},
		{
				"group": "Dataset 1",
				"date": "2019-01-07T21:00:00.000Z",
				"value": -22392
		},
		{
				"group": "Dataset 1",
				"date": "2019-01-14T21:00:00.000Z",
				"value": -52576
		},
		{
				"group": "Dataset 1",
				"date": "2019-01-18T21:00:00.000Z",
				"value": 20135
		},
		{
				"group": "Dataset 2",
				"date": "2018-12-31T21:00:00.000Z",
				"value": 47263
		},
		{
				"group": "Dataset 2",
				"date": "2019-01-04T21:00:00.000Z",
				"value": 14178
		},
		{
				"group": "Dataset 2",
				"date": "2019-01-07T21:00:00.000Z",
				"value": 23094
		},
		{
				"group": "Dataset 2",
				"date": "2019-01-12T21:00:00.000Z",
				"value": 45281
		},
		{
				"group": "Dataset 2",
				"date": "2019-01-18T21:00:00.000Z",
				"value": -63954
		},
		{
			"group": "Dataset 3",
			"date": "2018-12-31T21:00:00.000Z",
			"value": 20032
	},
	{
			"group": "Dataset 3",
			"date": "2019-01-05T21:00:00.000Z",
			"value": -47312
	},
	{
			"group": "Dataset 3",
			"date": "2019-01-07T21:00:00.000Z",
			"value": -32392
	},
	{
			"group": "Dataset 3",
			"date": "2019-01-14T21:00:00.000Z",
			"value": -42576
	},
	{
			"group": "Dataset 3",
			"date": "2019-01-18T21:00:00.000Z",
			"value": 10135
	}
];
	options = {
		"title": "Area (time series - natural curve)",
		"axes": {
				"bottom": {
						"title": "2019 Annual Sales Figures",
						"mapsTo": "date",
						"scaleType": "time"
				},
				"left": {
						"mapsTo": "value",
						"scaleType": "linear"
				}
		},
		"curve": "curveNatural",
		"height": "400px"
};
}
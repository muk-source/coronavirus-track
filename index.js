const coviddata=document.getElementById("coviddata");
const headpart=document.getElementById("headpart")
// const myChart=document.getElementById("myChart")
var ctx = document.getElementById('myChart').getContext('2d');

let covidhtml=""
let headhtml=""
let app_data=[]
let cases_list=[]
let recovered_list=[]
let deaths_list=[]
let dates=[]
let active_list=[]


const url="https://api.covid19india.org/data.json"
const url2="https://disease.sh/v3/covid-19/historical/india?lastdays=15"
fetch(url).then((res)=>{
	return res.json()
	})
	.then((data)=>{
		// console.log(data)
		data.statewise.forEach(st=>{
			let covid19=`
			<tr>
				<td>${st.state}</td>
				<td class="table-danger">${st.confirmed}<br><span class="text-danger">${st.deltaconfirmed}<i class="fas fa-arrow-up"></i></span></td>
				<td class="table-primary text-primary ">${st.active}</td>
				<td class="table-success " >${st.recovered}<br><span class="text-success">${st.deltarecovered}<i class="fas fa-arrow-up"></span></td>
				<td class="table-dark ">${st.deaths}<br>${st.deltadeaths}  <i class="fas fa-heart-broken"></i></td>
				
			</tr>
			<br>



		`
		covidhtml+=covid19
		coviddata.innerHTML=covidhtml

		})
		
		let head=`<div class="container">
					<div class="row">
    					<div class="col confirmed">
      						<h4>total confirmed</h4>${data.statewise[0].confirmed}<br><span class="text-danger">${data.statewise[0].deltaconfirmed}<i class="fas fa-arrow-up"></i></span>
    					</div>
    					<div class="col active">
      						<h4>Active Cases</h4>${data.statewise[0].active}
    					</div>
    					<div class="col recovered">
      					<h4>Total recovered</h4>${data.statewise[0].recovered}<br><span class="text-success">${data.statewise[0].deltarecovered}<i class="fas fa-arrow-up"></i></span>
    					</div>
    					<div class="col deaths">
      					<h4>Total deaths</h4>${data.statewise[0].deaths}<br><span>${data.statewise[0].deltadeaths}<i class="fas fa-heart-broken"></i></span>
    					</div>
  					</div>
				</div>


		



		`
		headhtml+=head
		headpart.innerHTML=headhtml

		

		
	})
	function fetchingdata(){
			fetch(url2).then(res=>{
		     	return	res.json()
	})
	.then(data=>{
		
		dates=Object.keys(data.timeline.cases)
		cases_list.push(Object.values(data.timeline.cases))
			console.log(cases_list)
		recovered_list.push(Object.values(data.timeline.recovered))
		console.log(recovered_list)
		deaths_list.push(Object.values(data.timeline.deaths))
		console.log(deaths_list)
		for(let i=0;i<cases_list[0].length;i++){
			active_list.push(cases_list[0][i]-(recovered_list[0][i]+deaths_list[0][i]))
		}
		console.log(active_list)
	})
	.then(()=>{
		axesLinearChart()
		

	})
	}

let myChart	
function axesLinearChart(){
	myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [
        {
            label: 'Confirmed Cases',
            data: cases_list[0],
            fill:false,
            borderColor: '#ffb3b3',
            backgroundColor: 'rgb(255, 99, 132)',
            borderWidth:2,
        },
        {
            label: 'Recovered Cases',
            data: recovered_list[0],
            fill:false,
            borderColor: '#66ff99',
            backgroundColor: '#66ff99',
            borderWidth:2,
        },
        {
            label: 'active',
            data: active_list,
            fill:false,
            borderColor: ' #b3ccff',
            backgroundColor: ' #b3ccff',
            borderWidth:2,
        },
        {
            label: 'deaths',
            data: deaths_list[0],
            fill:false,
            borderColor: '#121212',
            backgroundColor: '#121212',
            borderWidth:2,
        },
       
        ],
        labels: dates
    },

    options: {
        responsive:true,
        maintainAspectRatio:false,
    }
});

}
// chart2
// function axesLinearChart2(){
// 	myChart = new Chart(ctx2, {
//     type: 'line',
//     data: {
//         datasets: [
//         {
//             label: 'Confirmed Cases',
//             data: cases_list[0],
//             fill:false,
//             borderColor: '#ffb3b3',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderWidth:2,
//         },
//         {
//             label: 'Recovered Cases',
//             data: recovered_list[0],
//             fill:false,
//             borderColor: '#66ff99',
//             backgroundColor: '#66ff99',
//             borderWidth:2,
//         },
//         {
//             label: 'deaths',
//             data: deaths_list[0],
//             fill:false,
//             borderColor: '#121212',
//             backgroundColor: '#121212',
//             borderWidth:2,
//         }
//         ],
//         labels: dates
//     },

//     options: {
//         responsive:true,
//         maintainAspectRatio:false,
//     }
// });

// }

fetchingdata();
	
	
	




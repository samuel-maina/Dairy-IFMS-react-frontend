import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
var teamOneChart = null;
export const LineChart= ({data}) => {
     var data=data;

     let amount =[];// ["Hellio","ZinAir","Teligos","Zolando","Xterposx","rhcher","Pacthio","Gerv","h-2ui","elfIo","XioPin","hinder","Xdale","Papetir","Hellio","ZinAir","Teligos","Zolando","Xterposx","rhcher","Pacthio","Gerv","h-2ui","elfIo","XioPin","hinder","Xdale","Papetir"];
let date=[]; // [4,12,20,20,10,5,12,0,17,24,20,12,6,64,4,12,20,20,10,5,12,0,17,24,20,12,6,64];

try {
  data.map((item) => {
    date.push(item.date[2]);
    
  amount.push(item.amount);
  });
} catch (error) {
  console.log(error);
}
    useEffect (() => {
        const t1ChartEl = document.getElementById("teamOneCanvas");
        if (teamOneChart) {
            teamOneChart.destroy();
        }
        teamOneChart = new Chart(t1ChartEl, {
            
            
            data: {
                labels: [...date],
                datasets: [{
                        label: "Bar",
                        type:'bar',
                        data: [...amount],
                        backgroundColor: [
                            'rgba(37, 112, 184, 0.1)','rgba(37, 112, 184, 0.2)','rgba(37, 112, 184, 0.3)','rgba(37, 112, 184, 0.4)','rgba(37, 112, 184, 0.5)','rgba(37, 112, 184, 0.6)','rgba(37, 112, 184, 0.7)','rgba(37, 112, 184, 0.8)','rgba(37, 112, 184, 0.9)','rgba(37, 112, 184, 1)'
                            
                            
                        ],
                        borderColor: [
                            'rgba(37, 112, 184, 1)'
                        ],
                       
                        barPercentage:1,borderWidth: 1
                    },
                  {
                        label: "Line",
                        type:"line",
                        data: [...amount],
                        backgroundColor: [
                           'rgba(37, 112, 132, 0.3)',
                           
                      ],
                        borderColor: [
                           'rgba(37,112,184,1)',
                            
                       ],
                        borderWidth: 6,
                        barPercentage:1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                },
                maintainAspectRatio:false,
                animation:false
            }
        });
teamOneChart.canvas.parentNode.style.height="250px";
teamOneChart.canvas.parentNode.style.width="950px";
    })



    return (
            <div class="">
            
                <canvas id="teamOneCanvas" class="ab"></canvas>
            </div>
            );
}

;

export default LineChart;
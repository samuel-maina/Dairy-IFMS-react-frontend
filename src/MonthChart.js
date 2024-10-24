import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import moment from "moment";
var teamOneChart = null;
export const MonthChart = ({data, labels}) => {
    var data = data;
    var label = labels;
    var data = data;
    let year = []; //[]/["2021","2022","2023","2024","2025","2026","2027"]//,"Xterposx","rhcher","Pacthio","Gerv","h-2ui","elfIo","XioPin","hinder","Xdale","Papetir"];
    let amount = [];// [120000,150000,100000,170000,145000,40000,79000]//45000,22000,34000,21000,32000,21000,43000,34000,21300,20000];
    var m = moment();
    try {
        data.map((item) => {
            
            var me = m.month(item.month-1).format('MMM');
            year.push(me);
            amount.push(item.amount);
        });
    } catch (error) {
        console.log(error);
    }
    useEffect(() => {
        const t1ChartEl = document.getElementById("teamOneCanvas");
        if (teamOneChart) {
            teamOneChart.destroy();
        }
        teamOneChart = new Chart(t1ChartEl, {

            data: {
                labels: [...year],
                datasets: [{
                        label: [labels],
                        type: 'bar',
                        data: [...amount],
                        backgroundColor: [
                            'rgba(37, 112, 184, 0.1)', 'rgba(37, 112, 184, 0.2)', 'rgba(37, 112, 184, 0.3)', 'rgba(37, 112, 184, 0.4)', 'rgba(37, 112, 184, 0.5)', 'rgba(37, 112, 184, 0.6)', 'rgba(37, 112, 184, 0.7)', 'rgba(37, 112, 184, 0.8)', 'rgba(37, 112, 184, 0.9)', 'rgba(37, 112, 184, 1)'


                        ],
                        borderColor: [
                            'rgba(37, 112, 184, 1)'

                        ],

                        barPercentage: 1.0, borderWidth: 1
                    },
                    {
                        label: [label],
                        type: "line",
                        data: [...[]],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.3)',
                        ],
                        borderColor: [
                            'rgba(37, 112, 184, 1)'

                        ],
                        borderWidth: 2,
                        barPercentage: 0
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
                maintainAspectRatio: false
            }
        });
        teamOneChart.canvas.parentNode.style.height = "250px";
        teamOneChart.canvas.parentNode.style.wdidth = "950px";
    })



    return (
            <div class="w-10s0 h-4s0 relative center">
            
                <canvas id="teamOneCanvas" class="ab"></canvas>
            </div>
            );
}

;

export default MonthChart;
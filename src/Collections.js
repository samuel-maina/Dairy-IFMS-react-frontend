import Nav from './Nav';
import React from 'react';
import MonthChart from './MonthChart';
import MonthlyChart from './MonthlyChart';
import AnnualChart from './AnnualChart';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import moment from 'moment';
import axios from 'axios';
const Collections = () => {
    const [year, setYear] = useState(moment().format('YYYY'));
    const [monthChecked, setMonthChecked] = useState("");
    const[yearChecked, setYearChecked] = useState(true);
    const tenant = localStorage.getItem("tenant");
    const tenantname = localStorage.getItem("tenant_name");
    const user = localStorage.getItem("employee");
    const[info, setInfo] = useState("You are viewing annual data records");
    const[sumation, setSumation] = useState("");
    const[dailySumationForMonth, setDailySumationForMonth] = useState("");
    const[annualSumations, setAnnualSumations] = useState([]);
    const[monthlySumations, setMonthlySumations] = useState([]);
    const[current, setCurrent] = useState(0);
    const[annualSumation,setAnnualSumation] = useState(0)

    //var next = 0;
    const [next, setNext] = useState(0);
    const toggleYear = () => {
        setMonthChecked(false);
        if (year === moment().year()) {
            //setCurrent(moment().month());
        }
        setYearChecked(true);
        setInfo("You are viewing the annual data records");

    }
    const toggleMonth = () => {
        setMonthChecked(true);
        //setInfo("You are viewing the monthly data records for " + year);

        setYearChecked(false);


    }
    const viewYear = async (year) => {
        await  setYear(year);
        await setMonthChecked(true);
        await setInfo("You are viewing the monthly data records for " + year);
        await setYearChecked(false);
        await setDailySumationForMonth("");
        // setCurrent(0);
        setNext(0);
        setCurrent(moment().month());
        await  axios.get("/api/v1/records/" + tenant + "/" + year+"/tenant/")
                .then((response) => {
                    setMonthlySumations(response.data);
                    //setInfo("Showing data records for member " + member + " for " + month.format('YYYY-MM'));
                    //setError("");
                }).catch((err) => {

        });
                await  axios.get("/api/v1/records/" + tenant + "/" + year)
                .then((response) => {
                    setAnnualSumation(response.data);
                    //setInfo("Showing data records for member " + member + " for " + month.format('YYYY-MM'));
                    //setError("");
                }).catch((err) => {

        });
        document.getElementById(moment().month()).style.backgroundColor = "#9ACD32";
    }
    const delay = (time) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const viewNextMonth = async (e) => {

        if (current === moment().month() && next === 0) {
            document.getElementById(current).style.backgroundColor = "#9ACD32";
            //next = 1;
            setNext(1);
            var month = moment().month(current).format('MM');
            //delay(-40).then(() => {
            await axios.get("/api/v1/records/" + tenant + "/" + year + "/" + month+"/daily-sums")
                    .then((response) => {
                        setDailySumationForMonth(response.data);
                        
                        //setError("");
                    }).catch((err) => {

            });
            //})

        } else {
            if (next > 0 && current !== 11) {
                //current = current + 1;
                document.getElementById(current + 1).style.backgroundColor = "#F9A63E";
                document.getElementById(current).style.backgroundColor = "#3C3C3C";
                document.getElementById(moment().month()).style.backgroundColor = "#9ACD32";


                var temp = current;
                temp = temp + 1;

                console.log("Value of current is" + current);
                console.log(moment().month(1).format("MM") + "This is the month!!!!");
                var month = moment().month(current + 1).format('MM');
                //delay(-4).then(() => {
                await axios.get("/api/v1/records/" + tenant + "/" + year + "/" + month+"/daily-sums")
                        .then((response) => {
                            setDailySumationForMonth(response.data);
                            
                            //setInfo("Showing data records for member " + member + " for " + month.format('YYYY-MM'));
                            //setError("");
                        }).catch((err) => {

                });
                setCurrent(current + 1);
                // })
            }

        }


    }
    const viewPreviousMonth = async (e) => {
        if (current === moment().month() && next === 0) {
            document.getElementById(current).style.backgroundColor = "#9ACD32";
            //next = 1;
            setNext(1);
            var month = moment().month(current).format('MM');
           
            await axios.get("/api/v1/records/" + tenant + "/" + year + "/" + month+"/daily-sums")
                    .then((response) => {
                        setDailySumationForMonth(response.data);
                        
                        //setInfo("Showing data records for member " + member + " for " + month.format('YYYY-MM'));
                        //setError("");
                        //setNext(1);
                    }).catch((err) => {

            });
        } else {
            if (current > 0) {
                //current = current - 1;

                document.getElementById(current - 1).style.backgroundColor = "#F9A63E";
                document.getElementById(current).style.backgroundColor = "#3C3C3C";
                document.getElementById(moment().month()).style.backgroundColor = "#9ACD32";
                setCurrent(current - 1);
                if (current - 1 > -1) {
                    var month = moment().month(current - 1).format('MM');
                    console.log("HELLO")
                }
                await  axios.get("/api/v1/records/" + tenant + "/" + year + "/" + month+"/daily-sums")
                        .then((response) => {
                            setDailySumationForMonth(response.data);
                            
                            //setInfo("Showing data records for member " + member + " for " + month.format('YYYY-MM'));
                            //setError("");
                        }).catch((err) => {

                });
            }
        }
        if (current === moment().month()) {

        } else {
            //setCurrent(current - 1);

        }


    }
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        await  axios.get("/api/v1/records/" + tenant)
                .then((response) => {
                    setSumation(response.data);
                    //setInfo("Showing data records for member " + member + " for " + month.format('YYYY-MM'));
                    //setError("");
                }).catch((err) => {

        });
        await  axios.get("/api/v1/records/"+tenant+"/annual-sums/")
                .then((response) => {
                    setAnnualSumations(response.data);
                    //setInfo("Showing data records for member " + member + " for " + month.format('YYYY-MM'));
                    //setError("");
                }).catch((err) => {

        });
        
    };
    return(
            <div class="relative">
                <Nav/>
            
            
                <div class="content-box relative">
                    <div class="w-100 text-white font-lg margin-top-sm-2 ">
                    <div class="hidden">  {current + 1} {next}</div>
                        <div class=" border-rad-sm absolute top-right info padding-md z-index-high">
                            <span class="material-symbols-outlined  top-center-center float-right text-white pointer padding-xsm bg-green border-rad-md" >info</span> 
                            <div class="info-child text-white ">
                                <span class="Mulish font-sm">Data shown</span>
                                <div class="flex-vertical font-sm">
                                    <div class="flex-horizontal">
                                        {info}
                                    </div>
                                </div>
                            </div>                          
                        </div></div>
                    {yearChecked ?
                            <>
                            <div class="padding-top-xsm">
                                <span class="text-white  Mulish padding-sm bg-blue">Collections</span>
                                <span class="text-white font-sm">{tenantname} {user}</span>
                                <div class="center">                          
                                    {year ?
                                                <span class="font-sm  mulish font-bold text-white  bg-yellow-variant padding-sm border-rad-sm ">  {sumation} KGs</span> : <></>}</div></div>
                            <div class="flex-horizontal center relative margin-top-">
                                {annualSumations.map(item =>
                                                    <div class="square border-rad-md margin-sm center bg-white flex-vertical" onClick={(e) => viewYear(item.year)}>
                                                        <div class="text-gray text-bold Open-sans text-sm">{item.year}</div>
                                                        <div class="text-white text-bold Open-sans text-sm">{item.amount.toFixed(2)}KGs</div>
                                                    </div>)};
                    
                            </div>
                            <div class="absolute w-100 bottom-0">
                                <div class="padding-md relative bottom-0d h-5d0">
                                    <AnnualChart data={annualSumations} labels={[]}/></div></div>
                            </> :
                            <>
                            <div class="padding-top-xsm">
                                <span class="text-white  Mulish padding-sm bg-blue">Collections</span>
                                <span class="text-white font-sm">{tenantname} {user}</span>
                                <div class="center">                          
                                    {year ?
                                                <span class="font-sm  mulish font-bold text-white  bg-yellow-variant padding-sm border-rad-sm "> {year} {annualSumation} KGs</span> : <></>}</div></div>
                            <div class="flex-horizontal center relative margin-top-">
                                {monthlySumations.map((item, k) =>
                                                    <>
                                        
                                                    <div class="square border-rad-md margin-sm center bg-white flex-vertical overflow-none" id={k}>
                                                        <div class="text-gray text-bold Open-sans text-sm">{moment().month(item.month - 1).format('MMM')}</div>
                                                        <div class="text-white text-bold Open-sans text-sm font-bold">{item.amount}KGs</div>
                                                    </div> </>)}
                    
                                <button class="btn-prev absolute border-rad-md border-none bg-white menu-item-1" onClick={(e) => viewPreviousMonth(e)}>
                                    <span class="material-symbols-outlined ">Chevron_left</span>
                                </button>
                                <button class="btn-next border-rad-md absolute bg-white border-none menu-item-1"onClick={(e) => viewNextMonth(e)}>
                                    <span class="material-symbols-outlined ">Chevron_right</span>
                                </button>
                            </div>
                            {dailySumationForMonth ? <div class="padding-md relative h-50">
                                <MonthlyChart data={dailySumationForMonth} month={current} year={year}/></div> :
                                                <div class="padding-md relative h-50">
                                                    <MonthChart data={monthlySumations} labels={[]}/></div>}
                    
                            </>
                    }
                    <div class=" absolute left-vertical-menu-2  padding-md text-white">
                        <div class="menu-list">
            
                            <div class=" border-rad-sm padding-sm margin-sm bg-white text-gray border-1"><input type="radio" id="1" checked={yearChecked} onChange={toggleYear}/>Annual</div>
                            <div class=" border-rad-sm hidden padding-sm margin-sm bg-white text-gray border-1"><input type="radio" id="1" checked={monthChecked} onChange={toggleMonth}/>Monthly</div>
                        </div>
                    </div>
                </div>
            
            </div>
            );
}
;
export default Collections;
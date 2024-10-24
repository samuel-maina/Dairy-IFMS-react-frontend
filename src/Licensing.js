import Nav from './Nav';
import React from 'react';
import { jsPDF } from "jspdf";
import swal from 'sweetalert';
import {QRCodeSVG} from 'qrcode.react';
import { Link, NavLink } from 'react-router-dom';
import {Watermark} from '@hirohe/react-watermark';

const Licensing = () => {

    const   print = () => {
        var temp = <QRCodeSVG value={localStorage.getItem("tenant")} width="100" color="gray"/>;
        const input = document.getElementById("license");
        const pdf = new jsPDF({unit: "pt", format: "a6", userUnit: "pt", orientation: "l"});
        pdf.html(input, {html2canvas: {scale: 0.33}}).then(() => {
            pdf.save(+"license.pdf");

        });
    };
    return(
            <div class="relative">
                <Nav/>
                <div class="absolutfe hidden center-left bg-teal padding-md pointer border-right-rad-md text-white">
                    <span class="material-symbols-outlined">chevron_right</span> 
                </div>
            
                <div class="content-box relative" id="">
                    <div class="absolute bottom-right"><div class="menu-item border-rad-md padding-md" onClick={() => print()}>
                            <span class="material-symbols-outlined">print</span> 
                        </div></div>
                    <span class="text-white Mulish padding-md bg-blue">Licensing</span>
            
                    <div class=" padding-sm  text-white bg-gray margin-md " id="license">
                        <Watermark text="STAWISHA" textSize="20" textColor="grey">
                            <div class="flex-vertical padding-md w-100">
                                <span class="font-md text-bold">ISSUERER</span>
                                <span class="Mulish font-xsm"> STAWISHA TECHNOLOGIES</span>
                            </div>
                            <div class="flex-vertical padding-md w-100">
                                <span class="font-md text-bold">ISSUEE</span>
                                <span class="Mulish font-xsm"> {localStorage.getItem("tenant_name")}</span>
                            </div>
                            <div class="flex-horizontal fixed-lg padding-md">
                                <div class="flex-vertical">
                                    <span class="font-md text-bold">AMOUNT</span>
                                    <span class="Mulish font-xsm"> KES 36,000</span>
                                </div>
                                <div class="flex-vertical">
                                    <span class="font-md text-bold">DURATION</span>
                                    <span class="Mulish font-xsm"> 12 MONTHS</span>
                                </div>
                                <div class="flex-vertical">
                                    <span class="font-md text-bold">PERIOD</span>
                                    <span class="Mulish font-xsm"> January 1 1024 - December 31 2024</span>
                                </div>
                            </div>
                            <div class="padding-md">
                                <span class="font-bold text-grey Ubuntu">Service Level Agreement - SLA</span>
                                <ol class="text-green">
                                    <li class="">Service 1</li>
                                    <li>Service 1</li>
                                    <li>Service 1</li>
                                    <li>Service 1</li>
                                    <li>Service 1</li>
                                    <li>Service 1</li>
                                </ol>
                            </div>
                            <div class="bottom-right w-80  padding-sm absolute font-xsm">{localStorage.getItem("tenant_name")}-ASXER-900-ER</div>
                            <div class=" padding-sm margin-sm absolute top-right"><QRCodeSVG value={localStorage.getItem("tenant")} width="100" color="blue"/></div>
                        </Watermark></div></div>
            </div>
            );



}
;
export default Licensing;
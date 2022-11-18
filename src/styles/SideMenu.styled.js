import styled from "styled-components";

export const SideMenu = styled.div`
    height: fit-content;
    flex:1 1 20%;
    order: 1;
    overflow-y: hidden;
    padding:5px;
    position:absolute;
    z-index:300;
    bottom:0px;

    .Myhamburguer{
        display: flex;
        justify-content: end;
    }
    .mainContainer{
        padding-bottom: 5px;
    }
    p {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
    
    .wrapper_absolute{
        width: fit-content;
        height: fit-content;
        padding: 10px;
        background-color:rgba(12, 74, 110, 0.5);        ;
        border-color: blue;
        color:#e0f2fe;
        font-size:1rem;
    }
    .spacer_cont{
        height:100%;
    }
    .giveSpace{
        justify-content: space-between;
    }
    .mycontainer{
        display:flex;
        justify-items:center;
        padding-top:0px;
        align-items:center;
        padding-bottom:10px;
    }
    .prompt{
        padding-right:4%;
        width:110px;
    }
    .slider-parent{
        position:relative;
    }

    .sudo_title{
        font-weight: bold;
        font-size: 1.1rem;
    }
    .slider-parent{
        padding-left:20px;
        width: 100%;
    }
    .dropdown{
        width:100%;
    }
    .dropdown-menu {
        height: 200px;
        overflow-y: scroll;
        font-size:1rem;
        width:100%;
    }
    .dropdown-toggle {
        font-size:1rem;
        width:100%; 
    }
    .span_div{
        font-size: 14px;
        color: #666;
        font-weight: 400;
        letter-spacing: .5px;
        padding-left:10px;
        color:#e0f2fe;
    }

    /* Toggle Button */
    .cm-toggle {
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        border: 0;
        outline: 0;
        cursor: pointer;
        margin: 10px;
    }


    /* To create surface of toggle button */
    .cm-toggle:after {
        content: '';
        width: 40px;
        height: 14px;
        display: inline-block;
        background: rgba(196, 195, 195, 0.55);
        border-radius: 18px;
        clear: both;
    }


    /* Contents before checkbox to create toggle handle */
    .cm-toggle:before {
        content: '';
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        left: 0;
        top: 2px;
        border-radius: 50%;
        background: rgb(255, 255, 255);
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
    }


    /* Shift the handle to left on check event */
    .cm-toggle:checked:before {
        left: 20px;
        box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.6);
    }
    /* Background color when toggle button will be active */
    .cm-toggle:checked:after {
        background: #086654;
    }

    /* Transition for smoothness */
    .cm-toggle,
    .cm-toggle:before,
    .cm-toggle:after,
    .cm-toggle:checked:before,
    .cm-toggle:checked:after {
        transition: ease .3s;
        -webkit-transition: ease .3s;
        -moz-transition: ease .3s;
        -o-transition: ease .3s;
    }

    .my-legend .legend-title {
        text-align: left;
    }
    .my-legend .legend-scale ul {
        margin: 0;
        margin-bottom: 10px;
        padding: 0;
        float: left;
        list-style: none;
    }
    .my-legend .legend-scale ul li {
        font-size: 80%;
        list-style: none;
        margin-left: 0;
        line-height: 18px;
        margin-bottom: 10px;
    }
    .my-legend ul.legend-labels li span {
        display: block;
        float: left;
        height: 16px;
        width: 30px;
        margin-right: 5px;
        margin-left: 0;
        border: 1px solid #999;
    }
    .my-legend .legend-source {
        font-size: 70%;
        clear: both;
    }
    .my-legend a {
        color: #ffff;
    }

    .slider-class{
        width:100%;
    }




    input[type=range] {
        margin: 10px 0;
        -webkit-appearance: none;
        width: 100%;
      }
      input[type=range]:focus {
        outline: none;
      }
      input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #086654;
        border-radius: 1px;
        border: 0px solid #000000;
      }
      input[type=range]::-webkit-slider-thumb {
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid #086654;
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: #A1D0FF;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -7px;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        background: #086654;
      }
      input[type=range]::-moz-range-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #086654;
        border-radius: 1px;
        border: 0px solid #000000;
      }
      input[type=range]::-moz-range-thumb {
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid #086654;
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: #A1D0FF;
        cursor: pointer;
      }
      input[type=range]::-ms-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }
      input[type=range]::-ms-fill-lower {
        background: #086654;
        border: 0px solid #000000;
        border-radius: 2px;
        box-shadow: 0px 0px 0px #000000;
      }
      input[type=range]::-ms-fill-upper {
        background: #086654;
        border: 0px solid #000000;
        border-radius: 2px;
        box-shadow: 0px 0px 0px #000000;
      }
      input[type=range]::-ms-thumb {
        margin-top: 1px;
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid #086654;
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: #A1D0FF;
        cursor: pointer;
      }
      input[type=range]:focus::-ms-fill-lower {
        background: #086654;
      }
      input[type=range]:focus::-ms-fill-upper {
        background: #086654;
      }

`;

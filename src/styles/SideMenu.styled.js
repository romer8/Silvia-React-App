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

    .wrapper_absolute{
        width: fit-content;
        height: fit-content;
        padding: 20px;
        background-color:rgba(12, 74, 110, 0.5);        ;
        border-color: blue;
        color:#e0f2fe;
        font-size:1rem;
    }

    .giveSpace{
        justify-content: space-between;
    }
    .mycontainer{
        display:flex;
        justify-items:center;
        padding-top:0px;
        align-items:center;
    }
    .prompt{
        padding-right:4%;
    }
    .slider-parent{
        position:relative;
    }
    .mainContainer{
        padding-top:20px;
    }
    .sudo_title{
        font-weight: bold;
    }
    .slider-parent{
        padding-left:20px;
        width: 100%;
    }
    
    .dropdown-menu {
        height: 100px;
        overflow-y: scroll;
        font-size:1rem;
    }
    .dropdown-toggle {
        font-size:1rem;
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
        width: 30px;
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
        top: 0px;
        border-radius: 50%;
        background: rgb(255, 255, 255);
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
    }


    /* Shift the handle to left on check event */
    .cm-toggle:checked:before {
        left: 15px;
        box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.6);
    }
    /* Background color when toggle button will be active */
    .cm-toggle:checked:after {
        background: #16a085;
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

`;

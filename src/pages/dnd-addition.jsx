import React from "react";
import { useState } from "react";
import "./styles/dnd-addition.css"
import { nanoid } from "@reduxjs/toolkit"
import appleIcon from '../assets/apple.png'
import basketIcon from '../assets/basket.png'
import additionIcon from '../assets/addition.png'

const BoxFullOfItems = (props) => {

    return (
        <>
            <div className="box-full-of-items">
                {
                    Array.from({ length: props.num }, (_, i) => i + 1).map(() => {
                        return (
                            <div key={nanoid()}>
                                <img src={appleIcon} draggable={false} width={props.itemWidth} ></img>
                            </div>
                        )
                    })
                }
            </div>

        </>

    )
}

const BasketSource = (props) => {

    const handleOnDrag = (e, widgetType) => {
        console.log("onDrag triggered")
        e.dataTransfer.setData("widgetType", widgetType)
    }


    return (
        <>

            <div className="basket-source" onClickCapture={(e) => { e.preventDefault() }}>
                {
                    Array.from({ length: props.num }, (_, i) => i + 1).map(() => {
                        return (
                            <div key={nanoid()} draggable onDragStart={(e) => { handleOnDrag(e, "apple") }}>
                                <img src={appleIcon} width={props.itemWidth} ></img>
                            </div>
                        )
                    })

                }

            </div>

        </>
    )

}

const BasketTarget = (props) => {
    const handleDragOver = (e) => {
        console.log("onDragOver triggered")
        e.preventDefault()
    }
    const handleOnDrop = (e) => {
        const widgetType = e.dataTransfer.getData("widgetType")
        console.log("widgetType : ", widgetType)
        if (widgetType === "apple") {
            props.incrementHook()
        }

    }

    return (
        <>
            <div className="basket-target" onDrop={handleOnDrop} onDragOver={handleDragOver} style={{ backgroundImage: `url(${basketIcon})` }}>
                <span> Count: {props.num} </span>
            </div>
        </>

    )
}

const DndAddition = () => {

    const [itemNo1, setItemNo1] = useState(Math.floor(Math.random() * 5) + 1);
    const [itemNo2, setItemNo2] = useState(Math.floor(Math.random() * 5) + 1);
    const [itemsInTargetBasket, setItemsInTargetBasket] = useState(0);
    const [itemsInSourceBasket, setItemsInSourceBasket] = useState(13);


    const resetValues = () => {
        setItemNo1(Math.floor(Math.random() * 5) + 1)
        setItemNo2(Math.floor(Math.random() * 5) + 1)
        setItemsInSourceBasket(13)
        setItemsInTargetBasket(0)
    }

    const incrementItemsInTargetBasket = () => {
        let c = itemsInTargetBasket
        let d = itemsInSourceBasket
        setItemsInTargetBasket(c + 1)
        setItemsInSourceBasket(d - 1)
    }

    const checkCorrectAnswer = () => {
        let a = itemNo1
        let b = itemNo2
        let c = itemsInTargetBasket

        if (a + b === c) {
            alert("Hurray !! Correct Answer");
        } else {
            alert("Better Luck Next Time !! Incorrect Answer")
        }
        resetValues()

    }





    return (
        <>
            <div className="dnd-addition-container prevent-select" >
                <div className="dnd-addition-container-left">

                    <div className="dnd-addition-container-left-top">
                        <div className="button-container">
                            <button onClick={(e) => { checkCorrectAnswer() }}> Submit </button>
                            <button onClick={(e) => { resetValues }}> Reset </button>
                        </div>
                    </div>
                    <div className="dnd-addition-container-left-bottom">
                        <BoxFullOfItems num={itemNo1} itemWidth="100px" />
                        <img src={additionIcon} className="icon-addition"></img>
                        <BoxFullOfItems num={itemNo2} itemWidth="100px" />
                    </div>
                </div>

                <div className="dnd-addition-container-right">
                    <BasketTarget num={itemsInTargetBasket} incrementHook={incrementItemsInTargetBasket} />
                    <BasketSource num={itemsInSourceBasket} itemWidth="80px" />
                </div>
            </div>

        </>

    )

}

export default DndAddition;

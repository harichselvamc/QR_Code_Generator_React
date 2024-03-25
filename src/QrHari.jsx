import React, { useState } from 'react'

const QrHari = () => {
   const[img,SetImg]= useState("")
   const[loading,setLoading]=useState(false)
   const[qrdata,SetQrdata]=useState("https://iamharichselvam.web.app/")
   const[qrsize,SetQrsize]=useState("150")

   async function okok(){
     setLoading(true);
     try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
        SetImg(url)

     }catch(error){
        console.error("error generating on qr code",error)

     }finally{
        setLoading(false)
     }
    }


    function downloadqr(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=> {
            const link=document.createElement("a");
        link.href=URL.createObjectURL(blob)
        link.download="QRCODE_harichselvamc.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)})

    }
  return (
<div className='appcontainer'>
    <h1>QR CODE Generator</h1>
    {img && <img src={img} alt="" className='Qrimage'/>}
    {loading && <p>Please WAIT.... </p>}



    <div>
        <label htmlFor="datainput" className='inputlabel'>Enter Data For QR code: </label>
        <input type="text" id="datainput" placeholder='enter the data for QR code' value={qrdata}   onChange={(userinput)=>SetQrdata(userinput.target.value)} />

        <label htmlFor="imgsize" className='inputlabel'>Enter the Image Size : (eg 150..) </label>
        <input type="text" id="imgsize" placeholder='enter the image size ' value={qrsize}  onChange={(sizeinput)=>SetQrsize(sizeinput.target.value)} />


        <div>
        <button className='generatebutton' onClick={okok} disabled={loading}>Generate QR code</button>
        <button className='downloadbutton' onClick={downloadqr}>Download QR code</button>
   
        </div>

    </div>
    <p className='footer'>Created by <a href="https://iamharichselvam.web.app/">harichselvamc</a></p>

</div>
  )
}

export default QrHari


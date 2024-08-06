import React from 'react'
import {useState } from "react"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AddMenu() {
    const [file, setFile] = useState(null);
    const [pizzaName, setPizzaName] = useState("");
    const [amount, setAmount] = useState(0);
    const [formError, setFormError] = useState("");
    const [uploadStatus, setUploadStatus] = useState('');
    const nav = useNavigate();
    const handlePizza = (e) => {
        const name = e.target.name;
        if (name == "file") {
            setFile(e.target.files[0])
        }
        else if (name == "pizzaName") {
            setPizzaName(e.target.value)
        }
        else if (name == "amount") {
            setAmount(e.target.value)
        }

    }

    const addPizza = (e) => {
        e.preventDefault();

        if (file == null) {
            setFormError("Please fill in all fields")
        }
        else if (pizzaName == "") {
            setFormError("Please fill in all fields")
        }
        else if (amount === 0) {
            setFormError("Please fill in all fields")
        }
        else {
            setFormError("")
            const onePizza = { file: file, pizzaName: pizzaName, amount: amount };
            const fileRef = ref(storage, 'menus/' + crypto.randomUUID() + onePizza.file.name);
            if (!file) return; //if file is selected
            const uploadTask = uploadBytesResumable(fileRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                // let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                // console.log(percent + "% done");
                // setUploadStatus(percent.toFixed(2) + "% done")
                setUploadStatus(`/loading.gif`);
                getDownloadURL(snapshot.ref).then(url =>{addPizzaToDb(url)})
                .catch(error => console.log(error.message))

            }, (error) => {
                console.log(error.message);
                setUploadStatus(error.message)
            },
                () => {
                    setUploadStatus("Upload Complete");
                    setFile(null);
                    setPizzaName("");
                    setAmount(0);


                })
        }


    }
    const addPizzaToDb = async (imgUrl) => {
        const dbColl = collection(db, "Pizzas/");
        try {
            await addDoc(dbColl, {
                pizzaName: pizzaName,
                file: imgUrl,
                amount: amount
            });
            setFile(null);
            setPizzaName("");
            setAmount(0);

        } catch (error) {
            console.log(error.message);
            setUploadStatus("Error, check your internet")
        }
    }

    console.log(file);
    return (
        <div className="authContainer">
            <h1>AddMenu</h1>
            <form onSubmit={addPizza}>
                <label htmlFor="file">Upload Pizza photo</label>
                <input type="file" onChange={handlePizza} name="file" placeholder="..select image to upload" />
                <span>{uploadStatus.includes("loading.gif") ? <img src={uploadStatus} /> : uploadStatus}</span>
                <label htmlFor="pizzaName">Pizza Name</label>
                <input type="text" value={pizzaName} onChange={handlePizza} name="pizzaName" />
                <label htmlFor="amount">Amount</label>
                <input type="number" value={amount} onChange={handlePizza} name="amount" />
                <span style={{ color: "red" }}>{formError}</span>
                <button>Add</button>

            </form>
        </div>
    )
}

export default AddMenu
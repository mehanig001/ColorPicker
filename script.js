const btn = document.querySelector("#ColorPicker");
const colorList = document.querySelector(".AllColors");
const clearAll = document.querySelector(".Clear");

const pickedColors = JSON.parse(localStorage.getItem("PickedColors") || "[]");

const copyColor = ele => {
    // console.log(ele);
    navigator.clipboard.writeText(ele.dataset.color);
    ele.innerText = "Copied";
    setTimeout(() => ele.innerText = ele.dataset.color, 1000);
}

const showColors = () => {
    if(!pickedColors.length){
        return;
    }
    // const listTag = pickedColors.map(
    colorList.innerHTML = pickedColors.map(
        color => `
            <li class="Color">
                <span class="Dabba" style = "background: ${color}; border: 2px solid ${(color == "#ffffff") ? "black" : color}"></span>
                <span class="Value" data-color = "${color}">${color}</span>
            </li>
        `
    ).join("");
    document.querySelector(".PickedColors").classList.remove("hide");
    // console.log(listTag);

    document.querySelectorAll(".Color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));

    });

}

showColors();

const activatePicker = () => {
    document.body.style.display = "none";
    setTimeout(
        async()=> {
        
            try{
                const eye = new EyeDropper();
                const { sRGBHex } = await eye.open();
                navigator.clipboard.writeText(sRGBHex);
        
                if(!pickedColors.includes(sRGBHex)){
        
                    pickedColors.push(sRGBHex);
                    console.log(pickedColors);
                    localStorage.setItem("PickedColors", JSON.stringify(pickedColors));
                    showColors();
                }
        
        
            }
            catch(error){
                console.log("Failed to copy color code try again");
            }
            document.body.style.display = "block";
        
        }, 10);

}

const clearAllColors = () => {
    pickedColors.length = 0;
    localStorage.setItem("PickedColors", JSON.stringify(pickedColors));
    document.querySelector(".PickedColors").classList.add("hide");
};


clearAll.addEventListener("click", clearAllColors);
btn.addEventListener("click", activatePicker);

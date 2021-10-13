let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
    //checking if we have any data stored, then convert to an array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
    //checking local storage before rendering.
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


//Listening for clicks on the tab button 

tabBtn.addEventListener("click", function() {
    //using chromeAPI to get active tab and window.
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Save the url instead of logging it out
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})



//Refactoring code to be usable. Addition of "leads" parameters 
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}


//delete button ->  When clicked, clear localStorage, myLeads, and the whole thing
deleteBtn.addEventListener("dblclick", function() {
    console.log("double-clicked!") // checks if it works lmao, which it does !
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

//input button 
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
        //storing values in local storage, use stringify since arrays can't be stored in l.storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
        //verifying it works 
    console.log(localStorage.getItem("myLeads"))
})
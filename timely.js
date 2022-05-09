let projectColumn=[];
let startColumn=[];
let stopColumn=[];
let durationColumn=[];
let editColumn=[];
let removeColumn=[];

let projectCell = [];
let startCell = [];
let stopCell = [];
let durationCell = [];
let editCell = [];
let removeCell = [];

let startDuration;
let stopDuration;

let rowCount=0;

function createDefaultRow()
{
    startDuration = new Date().getTime();
    startColumn[rowCount] = getStartDate();
    start =  startColumn[rowCount];

    let addRow = document.getElementById("Table");
    let newRow = addRow.insertRow(rowCount+1);

    projectCell[rowCount] = newRow.insertCell(0);
    startCell[rowCount] = newRow.insertCell(1);
    stopCell[rowCount] = newRow.insertCell(2);
    durationCell[rowCount] = newRow.insertCell(3);
    editCell[rowCount] = newRow.insertCell(4);
    removeCell[rowCount] = newRow.insertCell(5);

    projectCell[rowCount].innerHTML = "...";
    startCell[rowCount].innerHTML = startColumn[rowCount];
    stopCell[rowCount].innerHTML = "...";
    durationCell[rowCount].innerHTML = "...";
    editCell[rowCount].innerHTML = "...";
    removeCell[rowCount].innerHTML = "...";

    rowCount++;
}

function createCompletedRow()
{
    projectColumn[rowCount-1] = document.getElementById("project_name").value;

    stopDuration = new Date().getTime();
    stopDuration = stopDuration - startDuration;
    let seconds = Math.floor((stopDuration % (1000 * 60)) / 1000);
    let minutes = Math.floor((stopDuration % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    
    stopColumn[rowCount-1] = getStartDate();
    durationColumn[rowCount-1] = minutes + ":" + seconds;
    editColumn[rowCount-1] = '<button id="EditButton" onclick="editProjectName(this);">Edit</button>';
    removeColumn[rowCount-1] = '<button id="RemoveButton" onclick="removeRow(this);">Remove</button>';

    projectCell[rowCount-1].innerHTML = projectColumn[rowCount-1];
    startCell[rowCount-1].innerHTML = startColumn[rowCount-1];
    stopCell[rowCount-1].innerHTML = stopColumn[rowCount-1];
    durationCell[rowCount-1].innerHTML = durationColumn[rowCount-1];
    editCell[rowCount-1].innerHTML = editColumn[rowCount-1];
    removeCell[rowCount-1].innerHTML = removeColumn[rowCount-1];

}

function getStartDate()
{
    let today = new Date();
    let date = today.getDate() + "." +(today.getMonth()+1) + "." + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes();
    return date;
}

//close the stop timer button popup
function closePopup()
{
    document.getElementById("popup-1").classList.toggle("active");
}

//close/open the edit button popup
function closeEdit()
{
    document.getElementById("popup-2").classList.toggle("active");
}

function tableVisibilityAfterFirstStartButton()
{
    document.getElementById("Table").style.display = "block";
    document.getElementById("StartButton").style.display = "none";

    if (document.getElementById("StartButton").style.display = "none") 
    {
        document.getElementById("Start_Stop_Button").style.display = "block";
        document.getElementById("Start_Stop_Button").innerHTML = "Stop";
    }
}

function clickOnFirstStartButton()
{
    tableVisibilityAfterFirstStartButton();
    createDefaultRow();
}

function clickOnStart_Stop_Button()
{
    if (document.getElementById("Start_Stop_Button").innerHTML === "Stop") 
    {
        closePopup();
    }
    else if (document.getElementById("Start_Stop_Button").innerHTML === "Start") 
    {
        createDefaultRow();
            
        document.getElementById("Start_Stop_Button").innerHTML = "Stop";
    }
}

function stopTimer()
{
    createCompletedRow();

    closePopup();
    document.getElementById("Start_Stop_Button").innerHTML = "Start";
}

function editProjectName(i)
{
    closeEdit();

    document.getElementById("Save").onclick = function()
    {
        let tableindex = i.parentElement.parentElement.rowIndex-1;
        projectCell[tableindex].innerHTML = document.getElementById("project_rename").value;
        closeEdit();
    }
}

function removeRow(r)
{
    let index = r.parentElement.parentElement.rowIndex;
    document.getElementById("Table").deleteRow(index);
    fixTableElementsAfterDeletion(index - 1);
}

function fixTableElementsAfterDeletion(deletedIndex)
{
    if(deletedIndex < rowCount - 1)
    {
        for(let i = deletedIndex + 1; i < rowCount;i++)
        {
            projectColumn[i - 1] = projectColumn[i];
            startColumn[i - 1] = startColumn[i];
            stopColumn[i - 1] = stopColumn[i];
            durationColumn[i - 1] = durationColumn[i];
            editColumn[i - 1] = editColumn[i];
            removeColumn[i - 1] = removeColumn[i];

            projectCell[i - 1] = projectCell[i];
            startCell[i - 1] = startCell[i];
            stopCell[i - 1] = stopCell[i];
            durationCell[i - 1] = durationCell[i];
            editCell[i - 1] = editCell[i];
            removeCell[i - 1] = removeCell[i];
        }

        //putting the last element on null
        if(rowCount > 1)
        {
            projectColumn[rowCount - 1] = null;
            startColumn[rowCount - 1]= null;
            stopColumn[rowCount - 1] = null;
            durationColumn[rowCount - 1] = null;
            editColumn[rowCount - 1] = null;
            removeColumn[rowCount - 1] = null;
    
            projectCell[rowCount - 1] = null;
            startCell[rowCount - 1] = null;
            stopCell[rowCount - 1] = null;
            durationCell[rowCount - 1] = null;
            editCell[rowCount - 1] = null;
            removeCell[rowCount - 1] = null;
        }
        //deleting the whole list
        else
        {
            projectColumn=[];
            startColumn=[];
            stopColumn=[];
            durationColumn=[];
            editColumn=[];
            removeColumn=[];
            
            projectCell = [];
            startCell = [];
            stopCell = [];
            durationCell = [];
            editCell = [];
            removeCell = [];
        }
    }
    rowCount--;
}
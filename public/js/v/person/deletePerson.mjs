/**
 * @fileOverview  Contains various view functions for the use case deletePerson
 * @authors Gerd Wagner & Juan-Francisco Reyes (modified by Mina Lee)
 */
/***************************************************************
 Import classes, datatypes and utility procedures
 ***************************************************************/
import Person from "../../m/Person.mjs";
import { fillSelectWithOptions } from "../../../lib/util.mjs";

/***************************************************************
 Load data
 ***************************************************************/
const personRecords = await Person.retrieveAll();

/***************************************************************
 Declare variables for accessing UI elements
 ***************************************************************/
const formEl = document.forms["Person"],
    deleteButton = formEl["commit"],
    selectPersonEl = formEl["selectPerson"];

/***************************************************************
 Set up (choice) widgets
 ***************************************************************/
// set up the person selection list
fillSelectWithOptions( selectPersonEl, personRecords,
    {valueProp:"personId", displayProp:"name"});

/******************************************************************
 Add further event listeners, especially for the save/delete button
 ******************************************************************/
// Set an event handler for the delete button
deleteButton.addEventListener("click", async function () {
    const personId = selectPersonEl.value;
    if (!personId) return;
    if (confirm("Do you really want to delete this person record?")) {
        Person.destroy(personId);
        // remove deleted person from select options
        selectPersonEl.remove(selectPersonEl.selectedIndex);
    }
});